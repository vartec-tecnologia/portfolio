import type { Metadata } from 'next';

import ContactForm from '@/components/ContactForm';
import Hero from '@/components/Hero';
import RecentPosts from '@/components/RecentPosts';
import SegmentsGrid from '@/components/SegmentsGrid';
import ServicesGrid from '@/components/ServicesGrid';
import { buildMetadata } from '@/lib/seo';

export function generateMetadata(): Metadata {
  return buildMetadata({
    title: 'VarTec — Desenvolvimento, automação e SaaS sob medida',
    description:
      'Parceiro técnico completo para PMEs: desenvolvimento sob medida, integrações, automações, dashboards, aplicativos e APIs.',
    path: '/',
  });
}

export default function Home() {
  return (
    <main>
      <Hero />
      <ServicesGrid />
      <SegmentsGrid />
      <RecentPosts />
      <ContactForm />
    </main>
  );
}
