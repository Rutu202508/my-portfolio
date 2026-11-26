import { useEffect, useState } from 'react';
import {
  ArrowDown,
  Cloud,
  Code2,
  Download,
  FolderGit2,
  Linkedin,
  ShieldCheck,
  Terminal,
} from 'lucide-react';
import { motion } from 'motion/react';
import { PERSONAL_INFO } from '../data/portfolio';

interface HeroSectionProps {
  onOpenResume: () => void;
}

export function HeroSection({ onOpenResume }: HeroSectionProps) {
  const roles = PERSONAL_INFO.typingRoles;
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState(roles[0]);
  const [isDeleting, setIsDeleting] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Profile image fallback state: 0 = primary, 1 = backup local path, 2 = monogram placeholder
  const [imgStage, setImgStage] = useState<0 | 1 | 2>(0);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mq.matches);
    const listener = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener('change', listener);
    return () => mq.removeEventListener('change', listener);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) {
      setDisplayedText(roles[0]);
      return;
    }

    const currentFull = roles[roleIndex];
    let timeoutId: number;

    if (!isDeleting && displayedText === currentFull) {
      timeoutId = window.setTimeout(() => setIsDeleting(true), 2100);
    } else if (isDeleting && displayedText === '') {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
    } else {
      const speed = isDeleting ? 38 : 72;
      timeoutId = window.setTimeout(() => {
        const nextLength = isDeleting ? displayedText.length - 1 : displayedText.length + 1;
        setDisplayedText(currentFull.slice(0, nextLength));
      }, speed);
    }

    return () => window.clearTimeout(timeoutId);
  }, [displayedText, isDeleting, roleIndex, roles, prefersReducedMotion]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const currentProfileSrc =
    imgStage === 0 ? PERSONAL_INFO.profileImage : PERSONAL_INFO.profileFallbackImage;

  return (
    <section
      id="home"
      className="relative overflow-hidden pt-12 pb-16 sm:pt-16 sm:pb-24 lg:pt-20 lg:pb-28 bg-slate-50 dark:bg-[#080D1A]"
    >
      {/* Subtle Midnight Tech Ambient Gradient Backdrop */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="animate-gradient-drift absolute -top-32 -left-24 w-[420px] h-[420px] rounded-full bg-[#8B5CF6]/12 dark:bg-[#8B5CF6]/18 blur-[110px]" />
        <div className="animate-gradient-drift absolute top-20 -right-24 w-[380px] h-[380px] rounded-full bg-[#22D3EE]/10 dark:bg-[#22D3EE]/14 blur-[110px]" />
        <div
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.04]"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)',
            backgroundSize: '32px 32px',
          }}
        />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          {/* Left Column: Typographic Hierarchy & CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 text-center lg:text-left"
          >
            <p className="text-xs sm:text-sm font-medium tracking-[0.18em] uppercase text-[#7C3AED] dark:text-[#22D3EE] mb-3">
              {PERSONAL_INFO.shortGreeting}
            </p>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-[3.35rem] font-bold tracking-tight leading-[1.1] text-slate-900 dark:text-[#F8FAFC] text-balance">
              Kendre Rutuja Navnath
            </h1>

            <div className="mt-4 min-h-[2rem] flex items-center justify-center lg:justify-start gap-2 text-lg sm:text-xl font-medium text-slate-700 dark:text-[#E2E8F0]">
              <span className="font-display bg-gradient-to-r from-[#7C3AED] to-[#0891B2] dark:from-[#A78BFA] dark:to-[#22D3EE] bg-clip-text text-transparent">
                {displayedText}
              </span>
              {!prefersReducedMotion && (
                <span
                  aria-hidden="true"
                  className="inline-block w-0.5 h-5 bg-[#7C3AED] dark:bg-[#22D3EE] animate-caret"
                />
              )}
            </div>

            {/* Unboxed Metadata Line */}
            <div className="mt-5 flex flex-wrap items-center justify-center lg:justify-start gap-x-3 gap-y-1 text-xs sm:text-sm text-slate-500 dark:text-[#A6B0C3]">
              <span>{PERSONAL_INFO.college}</span>
              <span aria-hidden="true">·</span>
              <span>B.Tech CSE (Second Year)</span>
              <span aria-hidden="true">·</span>
              <span>Diploma in Computer Engineering</span>
            </div>

            {/* Primary & Secondary Actions */}
            <div className="mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-3">
              <button
                type="button"
                onClick={() => scrollToSection('projects')}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-[#7C3AED] to-[#6D28D9] dark:from-[#8B5CF6] dark:to-[#7C3AED] hover:brightness-110 shadow-lg shadow-[#8B5CF6]/20 transition-all duration-200 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22D3EE]"
              >
                <FolderGit2 className="w-4 h-4" />
                <span>Explore My Projects</span>
              </button>

              <button
                type="button"
                onClick={onOpenResume}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-medium border border-slate-300 dark:border-white/15 bg-white dark:bg-[#121D32]/90 text-slate-800 dark:text-[#F8FAFC] hover:border-[#7C3AED]/60 dark:hover:border-[#22D3EE]/50 transition-colors duration-200 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6]"
              >
                <Download className="w-4 h-4 text-[#7C3AED] dark:text-[#22D3EE]" />
                <span>Download Resume</span>
              </button>

              <a
                href={PERSONAL_INFO.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Connect on LinkedIn"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-medium border border-slate-300 dark:border-white/15 bg-white dark:bg-[#121D32]/90 text-slate-800 dark:text-[#F8FAFC] hover:border-[#7C3AED]/60 dark:hover:border-[#22D3EE]/50 transition-colors duration-200 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6]"
              >
                <Linkedin className="w-4 h-4 text-[#0A66C2] dark:text-[#22D3EE]" />
                <span>Connect on LinkedIn</span>
              </a>
            </div>
          </motion.div>

          {/* Right Column: Circular Profile Frame & Floating Tech Icons */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.55, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex justify-center"
          >
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 flex items-center justify-center">
              {/* Soft Glow Ring */}
              <div
                aria-hidden="true"
                className="absolute inset-2 rounded-full bg-gradient-to-tr from-[#8B5CF6]/30 via-[#22D3EE]/20 to-[#8B5CF6]/30 blur-2xl"
              />

              {/* Circular Frame */}
              <div className="relative w-56 h-56 sm:w-72 sm:h-72 rounded-full p-1 bg-gradient-to-br from-[#8B5CF6] via-[#22D3EE]/70 to-[#8B5CF6] shadow-2xl shadow-[#8B5CF6]/15">
                <div className="w-full h-full rounded-full overflow-hidden bg-slate-100 dark:bg-[#10182B] border-4 border-white dark:border-[#080D1A] flex items-center justify-center">
                  {imgStage < 2 ? (
                    <img
                      src={currentProfileSrc}
                      alt={`${PERSONAL_INFO.fullName} — ${PERSONAL_INFO.identity}`}
                      referrerPolicy="no-referrer"
                      onError={() => setImgStage((prev) => (prev === 0 ? 1 : 2))}
                      className="w-full h-full object-cover object-top"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#10182B] to-[#121D32] text-[#F8FAFC] p-6 text-center">
                      <span className="font-display text-4xl font-bold tracking-tight bg-gradient-to-r from-[#A78BFA] to-[#22D3EE] bg-clip-text text-transparent">
                        KRN
                      </span>
                      <span className="mt-2 text-xs text-[#A6B0C3]">
                        Profile Photo Ready
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Floating Tech Icons */}
              <div
                aria-hidden="true"
                className="animate-float-slow absolute -top-1 right-4 sm:right-6 w-11 h-11 rounded-2xl backdrop-blur-md bg-white/90 dark:bg-[#121D32]/90 border border-slate-200 dark:border-white/15 shadow-lg flex items-center justify-center text-[#7C3AED] dark:text-[#A78BFA]"
                title="Software Development"
              >
                <Code2 className="w-5 h-5" />
              </div>

              <div
                aria-hidden="true"
                className="animate-float-slow-alt absolute bottom-4 -left-1 sm:left-1 w-11 h-11 rounded-2xl backdrop-blur-md bg-white/90 dark:bg-[#121D32]/90 border border-slate-200 dark:border-white/15 shadow-lg flex items-center justify-center text-[#0891B2] dark:text-[#22D3EE]"
                title="Cloud Computing"
              >
                <Cloud className="w-5 h-5" />
              </div>

              <div
                aria-hidden="true"
                className="animate-float-slow absolute bottom-2 right-2 sm:right-4 w-11 h-11 rounded-2xl backdrop-blur-md bg-white/90 dark:bg-[#121D32]/90 border border-slate-200 dark:border-white/15 shadow-lg flex items-center justify-center text-[#7C3AED] dark:text-[#22D3EE]"
                title="Cybersecurity"
              >
                <ShieldCheck className="w-5 h-5" />
              </div>

              <div
                aria-hidden="true"
                className="animate-float-slow-alt absolute top-8 -left-2 sm:left-0 w-10 h-10 rounded-xl backdrop-blur-md bg-white/90 dark:bg-[#121D32]/90 border border-slate-200 dark:border-white/15 shadow-lg flex items-center justify-center text-slate-700 dark:text-[#A6B0C3]"
                title="Problem Solving"
              >
                <Terminal className="w-4 h-4" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <div className="mt-12 lg:mt-16 flex justify-center">
          <button
            type="button"
            onClick={() => scrollToSection('about')}
            aria-label="Scroll to About Me section"
            className="inline-flex flex-col items-center gap-1.5 text-xs font-medium text-slate-500 dark:text-[#A6B0C3] hover:text-[#7C3AED] dark:hover:text-[#22D3EE] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6] rounded-lg px-3 py-1"
          >
            <span>Scroll to explore</span>
            <ArrowDown className="w-4 h-4 animate-bounce" />
          </button>
        </div>
      </div>
    </section>
  );
}
