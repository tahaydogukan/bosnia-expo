'use client';

import { motion } from 'framer-motion';
import { PAST_PARTICIPANTS } from '@/lib/constants';

export default function PastParticipants() {
  // Duplicate the array for seamless infinite scroll
  const duplicatedParticipants = [...PAST_PARTICIPANTS, ...PAST_PARTICIPANTS];

  return (
    <section className="py-20 bg-muted/50 overflow-hidden">
      <div className="container mx-auto px-4 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Past Participants
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Join the leading healthcare providers and medical tourism agencies
            who have been part of our previous editions.
          </p>
        </motion.div>
      </div>

      {/* Marquee Container */}
      <div className="relative">
        {/* Gradient Masks */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-muted/50 to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-muted/50 to-transparent z-10" />

        {/* Scrolling Logos */}
        <div className="flex animate-marquee">
          {duplicatedParticipants.map((participant, index) => (
            <div
              key={`${participant.name}-${index}`}
              className="flex-shrink-0 mx-8 w-40 h-20 bg-white rounded-lg shadow-sm flex items-center justify-center p-4 hover:shadow-md transition-shadow"
            >
              {/* Placeholder logo - replace with actual logos */}
              <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 rounded flex items-center justify-center">
                <span className="text-xs text-gray-500 text-center font-medium">
                  {participant.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="container mx-auto px-4 mt-12">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-muted-foreground"
        >
          <span className="font-semibold text-foreground">100+</span> healthcare
          providers trust us for their business growth
        </motion.p>
      </div>
    </section>
  );
}
