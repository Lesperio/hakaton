'use client';

import { useState } from 'react';
import { Hero } from '@/widgets/hero';
import { AboutSection } from '@/widgets/about-section';
import { BenefitsSection } from '@/widgets/benefits-section';
import { SiteFooter } from '@/widgets/site-footer';
import { RegistrationForm, SuccessModal } from '@/features/team-registration';
import type { TeamRegistrationFormData } from '@/features/team-registration';

export function HomePage() {
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleFormSubmit = async (data: TeamRegistrationFormData) => {
    const response = await fetch('/api/registration', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    const payload = (await response.json()) as { success?: boolean; message?: string };

    if (!response.ok || !payload.success) {
      throw new Error(payload.message ?? 'Не удалось отправить заявку');
    }

    setShowSuccessModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <Hero />
      <AboutSection />
      <BenefitsSection />
      <RegistrationForm onSubmit={handleFormSubmit} />
      <SiteFooter />
      <SuccessModal isOpen={showSuccessModal} onClose={() => setShowSuccessModal(false)} />
    </div>
  );
}
