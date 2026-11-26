import {
  Cloud,
  Code2,
  Compass,
  Database,
  Globe,
  Shield,
  Smartphone,
  Wrench,
} from 'lucide-react';
import {
  CURRENTLY_EXPLORING,
  SKILL_CATEGORIES,
  SkillCategory,
} from '../data/portfolio';
import { Reveal, SectionHeading } from './SectionUI';

const ICON_MAP: Record<SkillCategory['iconName'], typeof Code2> = {
  code: Code2,
  globe: Globe,
  cloud: Cloud,
  smartphone: Smartphone,
  database: Database,
  wrench: Wrench,
  shield: Shield,
};

export function SkillsSection() {
  const confirmedCategories = SKILL_CATEGORIES.filter((c) => c.items.length > 0);

  return (
    <section id="skills" className="py-16 sm:py-24 bg-slate-50 dark:bg-[#080D1A]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            kicker="Technical Skills"
            title="Core technologies and learning foundations"
            subtitle="Skills listed reflect verified academic and hands-on foundations, alongside dedicated areas where I am actively growing."
          />
        </Reveal>

        {/* Confirmed Skill Categories */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {confirmedCategories.map((category, idx) => {
            const Icon = ICON_MAP[category.iconName];
            return (
              <Reveal key={category.id} delay={idx * 0.05}>
                <div className="group h-full rounded-2xl bg-white dark:bg-[#121D32] border border-slate-200 dark:border-white/10 p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#7C3AED]/50 dark:hover:border-[#22D3EE]/45 hover:shadow-lg hover:shadow-[#8B5CF6]/10">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 rounded-xl bg-[#8B5CF6]/10 dark:bg-[#8B5CF6]/15 text-[#7C3AED] dark:text-[#22D3EE] flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-105">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-[#F8FAFC]">
                      {category.title}
                    </h3>
                  </div>

                  <ul className="space-y-2.5">
                    {category.items.map((skill) => (
                      <li
                        key={skill}
                        className="flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#080D1A]/75 border border-slate-200/80 dark:border-white/10 text-sm font-medium text-slate-800 dark:text-[#F8FAFC]"
                      >
                        <span>{skill}</span>
                        <span className="text-xs text-[#7C3AED] dark:text-[#22D3EE] font-normal">
                          Core
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* Currently Exploring Section */}
        <Reveal delay={0.1} className="mt-10">
          <div className="rounded-2xl bg-white dark:bg-[#121D32] border border-slate-200 dark:border-white/10 p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-200 dark:border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#22D3EE]/12 text-[#0891B2] dark:text-[#22D3EE] flex items-center justify-center shrink-0">
                  <Compass className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-[#F8FAFC]">
                    Currently Exploring
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-[#A6B0C3]">
                    Active focus areas I am learning as I progress
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
              {CURRENTLY_EXPLORING.map((item) => (
                <div
                  key={item.title}
                  className="p-4 rounded-xl bg-slate-50 dark:bg-[#080D1A]/65 border border-slate-200/80 dark:border-white/10"
                >
                  <h4 className="text-sm font-semibold text-slate-900 dark:text-[#F8FAFC]">
                    {item.title}
                  </h4>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-600 dark:text-[#A6B0C3]">
                    {item.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
