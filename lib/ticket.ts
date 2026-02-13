// ============================================
// TICKET NUMBER GENERATION
// ============================================

import { customAlphabet } from 'nanoid';

// Create a custom nanoid with uppercase alphanumeric characters
const generateId = customAlphabet('0123456789ABCDEFGHJKLMNPQRSTUVWXYZ', 6);

/**
 * Generate a unique ticket number
 * Format: BHE-YYYY-XXXXXX
 * Example: BHE-2025-A3B7K9
 */
export function generateTicketNumber(): string {
  const year = new Date().getFullYear();
  const uniqueId = generateId();
  return `BHE-${year}-${uniqueId}`;
}

/**
 * Generate QR payload for ticket
 */
export function generateQRPayload(ticketNo: string, email: string): string {
  // Create a simple hash-like string for verification
  const emailHash = Buffer.from(email).toString('base64').slice(0, 8);
  return JSON.stringify({
    ticket: ticketNo,
    verify: emailHash,
    event: 'Bosnia Healthcare Expo 2025',
  });
}

/**
 * Format date for display
 */
export function formatEventDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}
