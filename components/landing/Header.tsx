'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Calendar, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { NAV_ITEMS, EVENT_INFO } from '@/lib/constants';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/images/logo.png"
              alt="Bosnia Healthcare Expo"
              width={150}
              height={50}
              className="h-12 w-auto"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  isScrolled ? 'text-foreground' : 'text-white'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Event Info Pills */}
          <div className="hidden md:flex items-center gap-4">
            <div
              className={`flex items-center gap-2 text-xs ${
                isScrolled ? 'text-muted-foreground' : 'text-white/80'
              }`}
            >
              <Calendar size={14} />
              <span>{EVENT_INFO.date}</span>
            </div>
            <div
              className={`flex items-center gap-2 text-xs ${
                isScrolled ? 'text-muted-foreground' : 'text-white/80'
              }`}
            >
              <MapPin size={14} />
              <span>Sarajevo</span>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className={`lg:hidden ${
              isScrolled ? 'text-foreground' : 'text-white'
            }`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t"
          >
            <nav className="container mx-auto px-4 py-4 flex flex-col gap-4">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-foreground font-medium py-2 hover:text-primary transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <div className="pt-4 border-t flex flex-col gap-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Calendar size={14} />
                  <span>{EVENT_INFO.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={14} />
                  <span>{EVENT_INFO.location}</span>
                </div>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
