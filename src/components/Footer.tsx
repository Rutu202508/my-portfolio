import { useEffect, useState } from 'react';
import { ArrowUp, Github, Linkedin, Mail } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolio';

export function Footer() {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setShowBackToTop(window.scrollY > 420);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <footer className="bg-slate-50 dark:bg-[#080D1A] border-t border-slate-200/80 dark:border-white/10 py-10 no-print">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-center sm:text-left">
            <p className="font-display text-base font-bold text-slate-900 dark:text-[#F8FAFC]">
              Rutuja<span className="text-[#7C3AED] dark:text-[#22D3EE]">.dev</span>
            </p>
            <p className="mt-1 text-xs text-slate-500 dark:text-[#A6B0C3]">
              © {new Date().getFullYear()} {PERSONAL_INFO.fullName}. Built with React & TypeScript.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              aria-label="Send email"
              className="w-10 h-10 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#121D32] flex items-center justify-center text-slate-600 dark:text-[#A6B0C3] hover:text-[#7C3AED] dark:hover:text-[#22D3EE] transition-colors"
            >
              <Mail className="w-4 h-4" />
            </a>
            <a
              href={PERSONAL_INFO.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile"
              className="w-10 h-10 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#121D32] flex items-center justify-center text-slate-600 dark:text-[#A6B0C3] hover:text-[#7C3AED] dark:hover:text-[#22D3EE] transition-colors"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href={PERSONAL_INFO.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile"
              className="w-10 h-10 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#121D32] flex items-center justify-center text-slate-600 dark:text-[#A6B0C3] hover:text-[#7C3AED] dark:hover:text-[#22D3EE] transition-colors"
            >
              <Linkedin className="w-4 h-4" />
            </a>
          </div>
        </div>
      </footer>

      {showBackToTop && (
        <button
          type="button"
          onClick={scrollToTop}
          aria-label="Back to top"
          title="Back to top"
          className="fixed bottom-6 right-6 z-40 w-11 h-11 rounded-xl bg-[#7C3AED] dark:bg-[#8B5CF6] text-white shadow-lg shadow-[#8B5CF6]/25 hover:brightness-110 flex items-center justify-center transition-all duration-200 cursor-pointer no-print focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22D3EE]"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
    </>
  );
}
