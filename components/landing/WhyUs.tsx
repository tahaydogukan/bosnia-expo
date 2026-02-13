'use client';

import { motion } from 'framer-motion';
import {
  Handshake,
  Globe,
  Users,
  Eye,
  Presentation,
  MapPin,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { WHY_US_ITEMS } from '@/lib/constants';

const iconMap: Record<string, React.ElementType> = {
  Handshake,
  Globe,
  Users,
  Eye,
  Presentation,
  MapPin,
};

export default function WhyUs() {
  return (
    <section id="why-us" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">
            Benefits
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">
            Why Attend Bosnia Healthcare Expo?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover the unique advantages of participating in the largest
            healthcare exhibition in the Balkans.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {WHY_US_ITEMS.map((item, index) => {
            const IconComponent = iconMap[item.icon] || Handshake;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow border-0 shadow-md">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <IconComponent className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
