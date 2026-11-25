/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';
import { MotionConfig } from 'motion/react';
import { AboutSection } from './components/AboutSection';
import { CertificatesSection } from './components/CertificatesSection';
import { ContactSection } from './components/ContactSection';
import { EducationSection } from './components/EducationSection';
import { Footer } from './components/Footer';
import { HeroSection } from './components/HeroSection';
import { Navbar } from './components/Navbar';
import { ProjectsSection } from './components/ProjectsSection';
import { ResumeModal } from './components/ResumeModal';
import { ServicesSection } from './components/ServicesSection';
import { SkillsSection } from './components/SkillsSection';

export default function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    try {
      const saved = localStorage.getItem('rutuja-portfolio-theme');
      return saved === 'light' ? 'light' : 'dark';
    } catch {
      return 'dark';
    }
  });

  const [resumeOpen, setResumeOpen] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    try {
      localStorage.setItem('rutuja-portfolio-theme', theme);
    } catch {
      // Ignore storage access restriction
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 dark:bg-[#080D1A] dark:text-[#F8FAFC] transition-colors duration-200">
        {/* Keyboard Navigation Skip Link */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-2 focus:rounded-xl focus:bg-[#7C3AED] focus:text-white focus:text-sm focus:font-medium"
        >
          Skip to main content
        </a>

        <Navbar theme={theme} onToggleTheme={toggleTheme} />

        <main id="main-content" className="flex-1">
          <HeroSection onOpenResume={() => setResumeOpen(true)} />
          <AboutSection />
          <SkillsSection />
          <ServicesSection />
          <ProjectsSection />
          <CertificatesSection />
          <EducationSection />
          <ContactSection />
        </main>

        <Footer />

        <ResumeModal isOpen={resumeOpen} onClose={() => setResumeOpen(false)} />
      </div>
    </MotionConfig>
  );
}
