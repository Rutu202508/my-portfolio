import { GraduationCap } from 'lucide-react';
import { EDUCATION_TIMELINE } from '../data/portfolio';
import { Reveal, SectionHeading } from './SectionUI';

export function EducationSection() {
  return (
    <section id="education" className="py-16 sm:py-24 bg-slate-50 dark:bg-[#080D1A]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            kicker="Education"
            title="Academic foundation in Computer Engineering"
            subtitle="Structured academic progression supporting my transition into software development, cloud technologies, and cybersecurity."
          />
        </Reveal>

        <div className="relative max-w-4xl">
          {/* Hairline vertical timeline track */}
          <div
            aria-hidden="true"
            className="absolute left-5 top-2 bottom-2 w-px bg-slate-300 dark:bg-white/15"
          />

          <div className="space-y-8">
            {EDUCATION_TIMELINE.map((edu, idx) => (
              <Reveal key={edu.id} delay={idx * 0.08}>
                <div className="relative pl-14">
                  {/* Timeline Step Marker */}
                  <div
                    aria-hidden="true"
                    className="absolute left-0 top-1 w-10 h-10 rounded-xl bg-white dark:bg-[#121D32] border border-slate-200 dark:border-white/15 flex items-center justify-center text-[#7C3AED] dark:text-[#22D3EE] shadow-sm"
                  >
                    <GraduationCap className="w-5 h-5" />
                  </div>

                  <div className="rounded-2xl bg-white dark:bg-[#121D32] border border-slate-200 dark:border-white/10 p-6 sm:p-7">
                    <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500 dark:text-[#A6B0C3] mb-2">
                      <span className="font-medium text-[#7C3AED] dark:text-[#22D3EE]">
                        {edu.status}
                      </span>
                      <span className="font-mono-code">{edu.periodOrYear}</span>
                    </div>

                    <h3 className="text-xl font-semibold text-slate-900 dark:text-[#F8FAFC]">
                      {edu.degree}
                    </h3>

                    <p className="mt-1 text-sm font-medium text-slate-700 dark:text-[#CBD5E1]">
                      {edu.institution}
                    </p>

                    <ul className="mt-4 space-y-2 text-sm text-slate-600 dark:text-[#A6B0C3]">
                      {edu.highlights.map((item) => (
                        <li key={item} className="leading-relaxed">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
