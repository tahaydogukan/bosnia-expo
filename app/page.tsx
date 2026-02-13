'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/landing/Header';
import Hero from '@/components/landing/Hero';
import PastParticipants from '@/components/landing/PastParticipants';
import WhyUs from '@/components/landing/WhyUs';
import AboutUs from '@/components/landing/AboutUs';
import BlogTeaser from '@/components/landing/BlogTeaser';
import Footer from '@/components/landing/Footer';
import RegistrationModal from '@/components/forms/RegistrationModal';
import { BlogPost } from '@/types';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'visitor' | 'exhibitor'>('visitor');
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    // Fetch latest blog posts
    async function fetchPosts() {
      try {
        const response = await fetch('/api/blog?limit=3');
        if (response.ok) {
          const data = await response.json();
          setBlogPosts(data.posts || []);
        }
      } catch (error) {
        console.error('Failed to fetch blog posts:', error);
      }
    }
    fetchPosts();
  }, []);

  const handleOpenModal = (type: 'visitor' | 'exhibitor') => {
    setModalType(type);
    setIsModalOpen(true);
  };

  return (
    <main className="min-h-screen">
      <Header />
      <Hero onOpenModal={handleOpenModal} />
      <PastParticipants />
      <WhyUs />
      <AboutUs />
      <BlogTeaser posts={blogPosts} />
      <Footer />

      <RegistrationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialTab={modalType}
      />
    </main>
  );
}
