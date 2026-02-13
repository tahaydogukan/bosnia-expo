import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { commentFormSchema } from '@/lib/validations';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { post_id, ...formData } = body;

    // Validate
    const result = commentFormSchema.safeParse(formData);
    if (!result.success) {
      return NextResponse.json(
        { error: result.error.issues[0].message },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    // Verify post exists
    const { data: post, error: postError } = await supabase
      .from('blog_posts')
      .select('id')
      .eq('id', post_id)
      .eq('published', true)
      .single();

    if (postError || !post) {
      return NextResponse.json(
        { error: 'Blog post not found' },
        { status: 404 }
      );
    }

    // Insert comment (status: pending by default)
    const { data, error } = await supabase
      .from('comments')
      .insert({
        post_id,
        name: result.data.name,
        email: result.data.email,
        content: result.data.content,
        status: 'pending',
      })
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Failed to submit comment' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data,
    });
  } catch (error) {
    console.error('Comment error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
