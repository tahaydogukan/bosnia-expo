// ============================================
// BOSNIA EXPO - TYPE DEFINITIONS
// ============================================

export type InvitationType = 'visitor' | 'exhibitor';

export interface Invitation {
  id: string;
  type: InvitationType;
  full_name: string | null;
  company_name: string | null;
  contact_name: string | null;
  email: string;
  phone: string;
  country: string;
  city: string;
  interest_area: string | null;
  service_area: string | null;
  website: string | null;
  participation_intent: string | null;
  ticket_no: string;
  qr_payload: string;
  created_at: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image_url: string | null;
  published: boolean;
  created_at: string;
  updated_at: string;
}

export type CommentStatus = 'pending' | 'approved' | 'rejected';

export interface Comment {
  id: string;
  post_id: string;
  name: string;
  email: string;
  content: string;
  status: CommentStatus;
  admin_reply: string | null;
  created_at: string;
  // Joined fields
  blog_posts?: {
    title: string;
    slug: string;
  };
}

export interface VisitorFormData {
  full_name: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  interest_area: string;
  terms_accepted: boolean;
}

export interface ExhibitorFormData {
  company_name: string;
  contact_name: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  website?: string;
  service_area: string;
  participation_intent: string;
  terms_accepted: boolean;
}

// Dashboard stats
export interface DashboardStats {
  totalVisitors: number;
  totalExhibitors: number;
  totalBlogPosts: number;
  pendingComments: number;
  recentInvitations: Invitation[];
}

// Interest areas for visitors
export const INTEREST_AREAS = [
  'Aesthetic Surgery',
  'Dental Care',
  'Health Check-up',
  'Orthopedics',
  'Eye Care',
  'Hair Transplant',
  'Thermal & Spa',
  'IVF & Fertility',
  'Cardiology',
  'Oncology',
  'Other',
] as const;

// Service areas for exhibitors
export const SERVICE_AREAS = [
  'Hospital / Clinic',
  'Dental Clinic',
  'Aesthetic Center',
  'Medical Tourism Agency',
  'Insurance Company',
  'Medical Equipment',
  'Pharmaceutical',
  'Accommodation / Hotel',
  'Transportation',
  'Technology / Software',
  'Other',
] as const;

// Participation intents
export const PARTICIPATION_INTENTS = [
  'Standard Booth',
  'Premium Booth',
  'Sponsorship',
  'Speaker / Panel',
  'Media Partner',
  'Just Exploring',
] as const;

// Countries list (common ones)
export const COUNTRIES = [
  'Turkey',
  'Bosnia and Herzegovina',
  'Germany',
  'Austria',
  'Switzerland',
  'Netherlands',
  'Belgium',
  'France',
  'United Kingdom',
  'United States',
  'Canada',
  'Saudi Arabia',
  'UAE',
  'Kuwait',
  'Qatar',
  'Iraq',
  'Libya',
  'Algeria',
  'Morocco',
  'Other',
] as const;
