import { ReactNode } from 'react';
import { motion } from 'motion/react';

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function Reveal({ children, className = '', delay = 0 }: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.45, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface SectionHeadingProps {
  kicker: string;
  title: string;
  subtitle?: string;
}

export function SectionHeading({ kicker, title, subtitle }: SectionHeadingProps) {
  return (
    <div className="max-w-2xl mb-10 md:mb-12">
      <p className="text-xs font-medium tracking-wider uppercase text-[#7C3AED] dark:text-[#22D3EE] mb-2">
        {kicker}
      </p>
      <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900 dark:text-[#F8FAFC] text-balance">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-base leading-relaxed text-slate-600 dark:text-[#A6B0C3]">
          {subtitle}
        </p>
      )}
    </div>
  );
}
