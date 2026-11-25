import { BookOpen, Compass, GraduationCap, Lightbulb } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolio';
import { Reveal, SectionHeading } from './SectionUI';

export function AboutSection() {
  const highlights = [
    {
      icon: GraduationCap,
      title: 'Education Base',
      value: PERSONAL_INFO.college,
      detail: 'B.Tech in Computer Science Engineering (Second Year) & Diploma in Computer Engineering.',
    },
    {
      icon: Compass,
      title: 'Career Interests',
      value: PERSONAL_INFO.careerInterests.join(' · '),
      detail: 'Focused on growing as a Software Developer while exploring Cloud & Cybersecurity.',
    },
    {
      icon: Lightbulb,
      title: 'Technical Curiosity',
      value: 'Real-World Problem Solving',
      detail: 'Enjoy turning practical everyday challenges into structured, usable software applications.',
    },
    {
      icon: BookOpen,
      title: 'Learning Mindset',
      value: 'Continuous Improvement',
      detail: 'Committed to building strong engineering fundamentals through hands-on practice.',
    },
  ];

  return (
    <section
      id="about"
      className="py-16 sm:py-24 bg-white dark:bg-[#10182B] border-y border-slate-200/70 dark:border-white/10"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            kicker="About Me"
            title="Aspiring Software Developer"
            subtitle="Grounded in core computer engineering principles and focused on practical software creation."
          />
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Narrative Introduction */}
          <Reveal className="lg:col-span-7">
            <div className="rounded-2xl bg-slate-50 dark:bg-[#121D32] border border-slate-200 dark:border-white/10 p-6 sm:p-8 space-y-4">
              {PERSONAL_INFO.aboutParagraphs.map((paragraph, idx) => (
                <p
                  key={idx}
                  className="text-base leading-relaxed text-slate-700 dark:text-[#CBD5E1]"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </Reveal>

          {/* Structured Highlights */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
            {highlights.map((item, idx) => {
              const Icon = item.icon;
              return (
                <Reveal key={item.title} delay={idx * 0.05}>
                  <div className="rounded-2xl bg-slate-50 dark:bg-[#121D32] border border-slate-200 dark:border-white/10 p-5 hover:border-[#7C3AED]/45 dark:hover:border-[#22D3EE]/40 transition-colors duration-200">
                    <div className="flex items-start gap-3.5">
                      <div className="w-10 h-10 rounded-xl bg-[#8B5CF6]/10 dark:bg-[#8B5CF6]/15 text-[#7C3AED] dark:text-[#22D3EE] flex items-center justify-center shrink-0">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-medium text-slate-500 dark:text-[#A6B0C3]">
                          {item.title}
                        </p>
                        <h3 className="text-base font-semibold text-slate-900 dark:text-[#F8FAFC] mt-0.5">
                          {item.value}
                        </h3>
                        <p className="text-sm text-slate-600 dark:text-[#A6B0C3] mt-1 leading-relaxed">
                          {item.detail}
                        </p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
