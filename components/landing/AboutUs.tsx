'use client';

import { motion } from 'framer-motion';
import { Target, Lightbulb, Heart } from 'lucide-react';
import Image from 'next/image';
import { ABOUT_US } from '@/lib/constants';

const valueIcons = [Target, Lightbulb, Heart];

export default function AboutUs() {
  return (
    <section id="about" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Story */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">
              About Us
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-6">
              Who We Are
            </h2>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              {ABOUT_US.story}
            </p>

            {/* Mission & Vision */}
            <div className="space-y-6">
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                  <Target className="w-5 h-5 text-primary" />
                  Our Mission
                </h3>
                <p className="text-muted-foreground">{ABOUT_US.mission}</p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-primary" />
                  Our Vision
                </h3>
                <p className="text-muted-foreground">{ABOUT_US.vision}</p>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Values & Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            {/* About Image */}
            <div className="relative mb-8">
              <div className="aspect-video rounded-2xl overflow-hidden">
                <Image
                  src="/images/about.jpg"
                  alt="Bosnia Healthcare Expo"
                  fill
                  className="object-cover"
                />
              </div>
              {/* Decorative element */}
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-primary/10 rounded-2xl -z-10" />
            </div>

            {/* Values */}
            <h3 className="font-semibold text-xl mb-4">Our Values</h3>
            <div className="grid gap-4">
              {ABOUT_US.values.map((value, index) => {
                const Icon = valueIcons[index];
                return (
                  <motion.div
                    key={value.title}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm"
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">{value.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        {value.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
