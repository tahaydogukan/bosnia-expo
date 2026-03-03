'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, MapPin, ArrowRight, Globe } from 'lucide-react';
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
    logo: '/images/events/erbil.png',
    description: 'Join the premier healthcare exhibition in the Kurdistan Region. Connect with leading healthcare providers and explore medical tourism opportunities in the Middle East.',
    color: 'from-amber-500 to-orange-600',
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-200',
    status: 'upcoming',
  },
  {
    id: 2,
    name: 'GoCare Expo Paris',
    subtitle: 'International Health Tourism Summit',
    date: 'June 20-22, 2026',
    location: 'Paris Expo Porte de Versailles',
    city: 'Paris, France',
    logo: '/images/events/erbil.png',
    description: 'Experience the largest health tourism event in Europe. Network with global healthcare leaders and discover innovative medical solutions.',
    color: 'from-blue-500 to-indigo-600',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
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
    description: 'The premier healthcare and medical tourism exhibition in the Balkans. Connect with leading providers and explore medical tourism opportunities.',
    color: 'from-primary to-sky-600',
    bgColor: 'bg-sky-50',
    borderColor: 'border-sky-200',
    status: 'flagship',
  },
];

export default function EventsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
        <div className="absolute top-20 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-4 py-2 mb-6">
              <Globe className="w-4 h-4 text-primary" />
              <span className="text-primary text-sm font-medium">Global Events</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Upcoming <span className="text-primary">Healthcare</span> Events
            </h1>
            <p className="text-lg text-muted-foreground">
              Discover our international healthcare and medical tourism exhibitions.
              Join industry leaders, healthcare providers, and innovators from around the world.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Events Timeline */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-accent to-primary/30 hidden md:block" />

            {/* Events */}
            <div className="space-y-12">
              {EVENTS.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`relative flex flex-col md:flex-row items-center gap-8 ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-8 md:left-1/2 w-4 h-4 -ml-2 bg-white border-4 border-primary rounded-full z-10 hidden md:block" />

                  {/* Event Card */}
                  <div className={`w-full md:w-[calc(50%-3rem)] ${index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'}`}>
                    <div className={`${event.bgColor} ${event.borderColor} border-2 rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-300 group`}>
                      <div className="flex flex-col sm:flex-row gap-6">
                        {/* Logo */}
                        <div className="flex-shrink-0">
                          <div className="w-24 h-24 md:w-32 md:h-32 relative bg-white rounded-xl shadow-md overflow-hidden p-2 flex items-center justify-center">
                            <Image
                              src={event.logo}
                              alt={event.name}
                              width={120}
                              height={120}
                              className="object-contain w-full h-full"
                            />
                          </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1">
                          {/* Status Badge */}
                          {event.status === 'flagship' && (
                            <span className="inline-block bg-gradient-to-r from-primary to-accent text-white text-xs font-semibold px-3 py-1 rounded-full mb-3">
                              Flagship Event
                            </span>
                          )}
                          {event.status === 'upcoming' && (
                            <span className="inline-block bg-gradient-to-r from-green-500 to-emerald-600 text-white text-xs font-semibold px-3 py-1 rounded-full mb-3">
                              Upcoming
                            </span>
                          )}

                          <h3 className={`text-2xl md:text-3xl font-bold mb-2 bg-gradient-to-r ${event.color} bg-clip-text text-transparent`}>
                            {event.name}
                          </h3>
                          <p className="text-muted-foreground font-medium mb-4">{event.subtitle}</p>

                          {/* Event Details */}
                          <div className="space-y-2 mb-4">
                            <div className="flex items-center gap-3 text-foreground">
                              <Calendar className="w-5 h-5 text-primary flex-shrink-0" />
                              <span className="font-semibold">{event.date}</span>
                            </div>
                            <div className="flex items-start gap-3 text-muted-foreground">
                              <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                              <div>
                                <p className="font-medium">{event.location}</p>
                                <p className="text-sm">{event.city}</p>
                              </div>
                            </div>
                          </div>

                          <p className="text-muted-foreground text-sm mb-6 line-clamp-2">
                            {event.description}
                          </p>

                          {/* CTA */}
                          <Button
                            className={`bg-gradient-to-r ${event.color} hover:opacity-90 text-white group-hover:translate-x-1 transition-transform`}
                          >
                            Learn More
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Spacer for timeline alignment */}
                  <div className="hidden md:block w-[calc(50%-3rem)]" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Calendar Overview */}
      <section className="py-16 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              2025-2026 Event Calendar
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Plan ahead and mark your calendar for our upcoming healthcare exhibitions worldwide.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {EVENTS.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6 border border-gray-100"
              >
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${event.color} flex items-center justify-center mb-4`}>
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-lg text-foreground mb-2">{event.name}</h3>
                <p className="text-primary font-semibold text-sm mb-2">{event.date}</p>
                <p className="text-muted-foreground text-sm">{event.city}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-primary/80">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Exhibit?
            </h2>
            <p className="text-white/90 mb-8 max-w-2xl mx-auto">
              Showcase your brand at our international healthcare exhibitions and connect with thousands of potential clients.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/">
                <Button size="lg" variant="secondary" className="text-primary font-semibold">
                  Register Now
                </Button>
              </Link>
              <Link href="/#footer">
                <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
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
