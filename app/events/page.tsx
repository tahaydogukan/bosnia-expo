'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, MapPin, ArrowRight, Globe, Users } from 'lucide-react';
import Header from '@/components/landing/Header';
import Footer from '@/components/landing/Footer';
import { Button } from '@/components/ui/button';

const EVENTS = [
  {
    id: 1,
    name: 'GoCare Expo Erbil',
    subtitle: 'Healthcare & Medical Tourism Exhibition',
    date: 'March 15-17, 2026',
    location: 'Erbil International Fair Center',
    city: 'Erbil, Iraq',
    logo: '/images/logo.png',
    status: 'upcoming',
  },
  {
    id: 2,
    name: 'GoCare Expo Paris',
    subtitle: 'International Health Tourism Summit',
    date: 'June 20-22, 2026',
    location: 'Paris Expo Porte de Versailles',
    city: 'Paris, France',
    logo: '/images/logo.png',
    status: 'upcoming',
  },
  {
    id: 3,
    name: '4th Bosnia Healthcare Expo',
    subtitle: 'Medical Tourism Exhibition',
    date: 'October 15-17, 2025',
    location: 'Hotel Hills Congress & Termal Spa Resort',
    city: 'Sarajevo, Bosnia and Herzegovina',
    logo: '/images/logo.png',
    status: 'flagship',
  },
];

export default function EventsPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Header forceSolid />

      {/* Hero Section */}
      <section className="pt-28 pb-16 bg-white border-b border-gray-300">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-4 py-2 mb-6">
              <Globe className="w-4 h-4 text-primary" />
              <span className="text-primary text-sm font-medium">Global Events</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Our Healthcare Events
            </h1>
            <p className="text-lg text-muted-foreground">
              Discover our international healthcare and medical tourism exhibitions.
              Join industry leaders, healthcare providers, and innovators from around the world.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Events List */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-foreground mb-8">2026 Fuar Takvimimiz</h2>
          <div className="space-y-4">
            {EVENTS.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <div className="bg-white rounded-lg border border-gray-300 hover:border-gray-400 transition-all duration-200 p-5 md:p-6">
                  <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">

                    {/* Logo */}
                    <div className="w-48 h-32 flex items-center justify-center flex-shrink-0">
                      <Image
                        src={event.logo}
                        alt={event.name}
                        width={400}
                        height={50}
                        className="object-contain max-w-full max-h-full"
                      />
                    </div>

                    {/* Title */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-foreground">{event.name}</h3>
                      <p className="text-sm text-muted-foreground">{event.subtitle}</p>
                    </div>

                    {/* Date & Location */}
                    <div className="flex items-center gap-6 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <span>{event.city}</span>
                      </div>
                    </div>

                    {/* Button */}
                    <Button variant="outline" className="flex-shrink-0">
                      Details
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white border-t border-gray-300">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mx-auto text-center"
          >
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Users className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Ready to Exhibit?
            </h2>
            <p className="text-muted-foreground mb-8">
              Showcase your brand at our international healthcare exhibitions and connect with thousands of potential clients.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  Register Now
                </Button>
              </Link>
              <Link href="/#footer">
                <Button size="lg" variant="outline">
                  Contact Us
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
