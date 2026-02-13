// ============================================
// FORM VALIDATION SCHEMAS
// ============================================

import { z } from 'zod';

export const visitorFormSchema = z.object({
  full_name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name is too long'),
  email: z.string().email('Please enter a valid email address'),
  phone: z
    .string()
    .min(7, 'Phone number is too short')
    .max(20, 'Phone number is too long')
    .regex(/^[+]?[\d\s-()]+$/, 'Please enter a valid phone number'),
  country: z.string().min(1, 'Please select a country'),
  city: z.string().min(2, 'City must be at least 2 characters'),
  interest_area: z.string().min(1, 'Please select an interest area'),
  terms_accepted: z
    .boolean()
    .refine((val) => val === true, {
      message: 'You must accept the terms and conditions',
    }),
  // Honeypot field (should be empty)
  website_url: z.string().max(0).optional(),
});

export const exhibitorFormSchema = z.object({
  company_name: z
    .string()
    .min(2, 'Company name must be at least 2 characters')
    .max(200, 'Company name is too long'),
  contact_name: z
    .string()
    .min(2, 'Contact name must be at least 2 characters')
    .max(100, 'Contact name is too long'),
  email: z.string().email('Please enter a valid email address'),
  phone: z
    .string()
    .min(7, 'Phone number is too short')
    .max(20, 'Phone number is too long')
    .regex(/^[+]?[\d\s-()]+$/, 'Please enter a valid phone number'),
  country: z.string().min(1, 'Please select a country'),
  city: z.string().min(2, 'City must be at least 2 characters'),
  website: z
    .string()
    .url('Please enter a valid URL')
    .optional()
    .or(z.literal('')),
  service_area: z.string().min(1, 'Please select a service area'),
  participation_intent: z.string().min(1, 'Please select participation type'),
  terms_accepted: z
    .boolean()
    .refine((val) => val === true, {
      message: 'You must accept the terms and conditions',
    }),
  // Honeypot field
  website_url: z.string().max(0).optional(),
});

export const commentFormSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name is too long'),
  email: z.string().email('Please enter a valid email address'),
  content: z
    .string()
    .min(10, 'Comment must be at least 10 characters')
    .max(2000, 'Comment is too long'),
});

export const blogPostSchema = z.object({
  title: z
    .string()
    .min(5, 'Title must be at least 5 characters')
    .max(200, 'Title is too long'),
  slug: z
    .string()
    .min(3, 'Slug must be at least 3 characters')
    .max(200, 'Slug is too long')
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      'Slug must be lowercase with hyphens only'
    ),
  excerpt: z
    .string()
    .min(20, 'Excerpt must be at least 20 characters')
    .max(500, 'Excerpt is too long'),
  content: z.string().min(50, 'Content must be at least 50 characters'),
  cover_image_url: z.string().url().optional().or(z.literal('')),
  published: z.boolean(),
});

export type VisitorFormValues = z.infer<typeof visitorFormSchema>;
export type ExhibitorFormValues = z.infer<typeof exhibitorFormSchema>;
export type CommentFormValues = z.infer<typeof commentFormSchema>;
export type BlogPostFormValues = z.infer<typeof blogPostSchema>;
