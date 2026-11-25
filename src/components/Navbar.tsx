import { useEffect, useState } from 'react';
import { Menu, Moon, Sun, X } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolio';

export interface NavItem {
  id: string;
  label: string;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'services', label: 'Services' },
  { id: 'projects', label: 'Projects' },
  { id: 'certificates', label: 'Certificates' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
];

interface NavbarProps {
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
}

export function Navbar({ theme, onToggleTheme }: NavbarProps) {
  const [activeSection, setActiveSection] = useState<string>('home');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? Math.min(100, Math.max(0, (scrollTop / docHeight) * 100)) : 0;
      setScrollProgress(progress);

      const offset = 140;
      let current = 'home';
      for (const item of NAV_ITEMS) {
        const el = document.getElementById(item.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= offset) {
            current = item.id;
          }
        }
      }
      setActiveSection(current);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (id: string) => {
    setMobileOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/85 dark:bg-[#080D1A]/85 border-b border-slate-200/80 dark:border-white/10 transition-colors duration-200 no-print">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-6">
        {/* Zone 1: Brand wordmark */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('home');
          }}
          className="font-display text-lg sm:text-xl font-bold tracking-tight text-slate-900 dark:text-[#F8FAFC] whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6] rounded-md px-1"
        >
          <span>Rutuja</span>
          <span className="text-[#7C3AED] dark:text-[#22D3EE]">.dev</span>
        </a>

        {/* Zone 2: Desktop Navigation */}
        <nav aria-label="Primary Navigation" className="hidden lg:flex items-center gap-5">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.id);
                }}
                className={`relative py-1.5 text-sm font-medium whitespace-nowrap shrink-0 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6] rounded-sm ${
                  isActive
                    ? 'text-slate-900 dark:text-[#F8FAFC]'
                    : 'text-slate-600 dark:text-[#A6B0C3] hover:text-slate-900 dark:hover:text-[#F8FAFC]'
                }`}
              >
                {item.label}
                <span
                  aria-hidden="true"
                  className={`absolute left-0 right-0 -bottom-0.5 h-0.5 rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#22D3EE] transition-transform duration-200 origin-left ${
                    isActive ? 'scale-x-100' : 'scale-x-0'
                  }`}
                />
              </a>
            );
          })}
        </nav>

        {/* Zone 3: Theme Toggle & Mobile Menu Button */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={onToggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            className="inline-flex items-center justify-center w-10 h-10 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-100/70 dark:bg-[#121D32]/80 text-slate-700 dark:text-[#F8FAFC] hover:border-[#8B5CF6]/60 hover:text-[#7C3AED] dark:hover:text-[#22D3EE] transition-colors duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6]"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
            className="lg:hidden inline-flex items-center justify-center w-11 h-11 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-100/70 dark:bg-[#121D32]/80 text-slate-800 dark:text-[#F8FAFC] hover:border-[#8B5CF6]/60 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6]"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Scroll Progress Indicator */}
      <div className="w-full h-[2px] bg-transparent" aria-hidden="true">
        <div
          className="h-full bg-gradient-to-r from-[#8B5CF6] to-[#22D3EE] transition-[width] duration-75"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileOpen && (
        <nav
          aria-label="Mobile Navigation"
          className="lg:hidden border-t border-slate-200/80 dark:border-white/10 bg-white/95 dark:bg-[#080D1A]/95 backdrop-blur-lg px-4 py-4"
        >
          <div className="grid grid-cols-2 gap-2">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.id);
                  }}
                  className={`px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-[#8B5CF6]/15 text-[#7C3AED] dark:text-[#22D3EE] border border-[#8B5CF6]/30'
                      : 'text-slate-700 dark:text-[#A6B0C3] hover:bg-slate-100 dark:hover:bg-[#121D32]'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </div>
          <div className="mt-3 pt-3 border-t border-slate-200 dark:border-white/10 flex items-center justify-between text-xs text-slate-500 dark:text-[#A6B0C3]">
            <span>{PERSONAL_INFO.fullName}</span>
            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="text-[#7C3AED] dark:text-[#22D3EE] font-medium hover:underline"
            >
              Email Me
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
