import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { generateTicketNumber, generateQRPayload } from '@/lib/ticket';
import { visitorFormSchema, exhibitorFormSchema } from '@/lib/validations';

// Rate limiting (simple in-memory - use Redis in production)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 5; // requests per window
const RATE_WINDOW = 60 * 1000; // 1 minute

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_WINDOW });
    return true;
  }

  if (record.count >= RATE_LIMIT) {
    return false;
  }

  record.count++;
  return true;
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const ip = request.headers.get('x-forwarded-for') || 'unknown';
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { type, ...formData } = body;

    // Honeypot check
    if (formData.website_url && formData.website_url.length > 0) {
      // Bot detected, return fake success
      return NextResponse.json({
        success: true,
        data: {
          ticket_no: 'BHE-2025-XXXXXX',
          type,
        },
      });
    }

    // Generate ticket number
    const ticketNo = generateTicketNumber();

    // Prepare data for insertion based on type
    let insertData: Record<string, unknown>;

    if (type === 'visitor') {
      const result = visitorFormSchema.safeParse(formData);
      if (!result.success) {
        return NextResponse.json(
          { error: result.error.issues[0].message },
          { status: 400 }
        );
      }
      const data = result.data;
      const qrPayload = generateQRPayload(ticketNo, data.email);

      insertData = {
        type,
        ticket_no: ticketNo,
        qr_payload: qrPayload,
        email: data.email,
        phone: data.phone,
        country: data.country,
        city: data.city,
        full_name: data.full_name,
        interest_area: data.interest_area,
      };
    } else if (type === 'exhibitor') {
      const result = exhibitorFormSchema.safeParse(formData);
      if (!result.success) {
        return NextResponse.json(
          { error: result.error.issues[0].message },
          { status: 400 }
        );
      }
      const data = result.data;
      const qrPayload = generateQRPayload(ticketNo, data.email);

      insertData = {
        type,
        ticket_no: ticketNo,
        qr_payload: qrPayload,
        email: data.email,
        phone: data.phone,
        country: data.country,
        city: data.city,
        company_name: data.company_name,
        contact_name: data.contact_name,
        website: data.website || null,
        service_area: data.service_area,
        participation_intent: data.participation_intent,
      };
    } else {
      return NextResponse.json(
        { error: 'Invalid registration type' },
        { status: 400 }
      );
    }

    // Insert into database
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('invitations')
      .insert(insertData)
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);

      // Check for duplicate email
      if (error.code === '23505') {
        return NextResponse.json(
          { error: 'This email is already registered' },
          { status: 400 }
        );
      }

      return NextResponse.json(
        { error: 'Failed to create registration' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data,
    });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
