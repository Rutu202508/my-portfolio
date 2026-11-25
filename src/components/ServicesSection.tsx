import { ArrowUpRight } from 'lucide-react';
import { SERVICES_LIST } from '../data/portfolio';
import { Reveal, SectionHeading } from './SectionUI';

export function ServicesSection() {
  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="services"
      className="py-16 sm:py-24 bg-white dark:bg-[#10182B] border-y border-slate-200/70 dark:border-white/10"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            kicker="What I Can Work On"
            title="Interests & areas of practical development"
            subtitle="Areas where I enjoy building, learning, and collaborating on academic, internship, and foundational software projects."
          />
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES_LIST.map((service, idx) => (
            <Reveal key={service.title} delay={idx * 0.05}>
              <article className="group h-full flex flex-col justify-between rounded-2xl bg-slate-50 dark:bg-[#121D32] border border-slate-200 dark:border-white/10 p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#7C3AED]/50 dark:hover:border-[#22D3EE]/45">
                <div>
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <span className="font-mono-code text-sm font-medium text-[#7C3AED] dark:text-[#22D3EE]">
                      {service.number}
                    </span>
                    <span className="text-xs text-slate-500 dark:text-[#A6B0C3]">
                      Area of Interest
                    </span>
                  </div>

                  <h3 className="text-lg font-semibold text-slate-900 dark:text-[#F8FAFC] leading-snug">
                    {service.title}
                  </h3>

                  <p className="mt-2.5 text-sm leading-relaxed text-slate-600 dark:text-[#A6B0C3]">
                    {service.description}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-200/80 dark:border-white/10 flex items-center justify-between gap-2">
                  <div className="text-xs text-slate-500 dark:text-[#A6B0C3] truncate">
                    {service.focusAreas.join(' · ')}
                  </div>
                  <button
                    type="button"
                    onClick={scrollToContact}
                    aria-label={`Discuss ${service.title}`}
                    className="inline-flex items-center justify-center w-8 h-8 rounded-lg text-slate-500 dark:text-[#A6B0C3] hover:text-[#7C3AED] dark:hover:text-[#22D3EE] hover:bg-slate-200/60 dark:hover:bg-white/5 transition-colors shrink-0 cursor-pointer"
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
