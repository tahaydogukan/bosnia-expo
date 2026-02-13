'use client';

import Link from 'next/link';
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
} from 'lucide-react';
import { EVENT_INFO, SOCIAL_LINKS, NAV_ITEMS } from '@/lib/constants';

export default function Footer() {
  return (
    <footer id="footer" className="bg-slate-900 text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center font-bold">
                BHE
              </div>
              <div>
                <div className="font-bold leading-tight">Bosnia</div>
                <div className="text-sm text-white/70">Healthcare Expo</div>
              </div>
            </div>
            <p className="text-white/70 text-sm leading-relaxed mb-6">
              The premier healthcare and medical tourism exhibition in the
              Balkans. Connecting providers with patients worldwide.
            </p>
            {/* Social Links */}
            <div className="flex gap-4">
              <a
                href={SOCIAL_LINKS.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href={SOCIAL_LINKS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href={SOCIAL_LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href={SOCIAL_LINKS.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-white/70 hover:text-primary transition-colors text-sm"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Event Info */}
          <div>
            <h3 className="font-semibold text-lg mb-6">Event Details</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-white/90 font-medium">
                    {EVENT_INFO.venue}
                  </div>
                  <div className="text-white/60">{EVENT_INFO.address}</div>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                <a
                  href={`mailto:${EVENT_INFO.email}`}
                  className="text-white/70 hover:text-primary transition-colors"
                >
                  {EVENT_INFO.email}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                <a
                  href={`tel:${EVENT_INFO.phone}`}
                  className="text-white/70 hover:text-primary transition-colors"
                >
                  {EVENT_INFO.phone}
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter / CTA */}
          <div>
            <h3 className="font-semibold text-lg mb-6">Stay Updated</h3>
            <p className="text-white/70 text-sm mb-4">
              Subscribe to our newsletter for the latest updates and early bird
              offers.
            </p>
            <form className="space-y-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-primary text-sm"
              />
              <button
                type="submit"
                className="w-full px-4 py-3 rounded-lg bg-primary hover:bg-primary/90 font-medium transition-colors text-sm"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/60">
            <div>
              &copy; {new Date().getFullYear()} {EVENT_INFO.organizer}. All
              rights reserved.
            </div>
            <div className="flex gap-6">
              <Link href="/privacy" className="hover:text-primary transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-primary transition-colors">
                Terms of Service
              </Link>
              <Link href="/kvkk" className="hover:text-primary transition-colors">
                KVKK
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
