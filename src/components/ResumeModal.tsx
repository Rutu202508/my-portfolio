import { useEffect } from 'react';
import { ExternalLink, FileText, Printer, X } from 'lucide-react';
import {
  EDUCATION_TIMELINE,
  PERSONAL_INFO,
  PROJECTS_LIST,
  SKILL_CATEGORIES,
} from '../data/portfolio';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const confirmedSkills = SKILL_CATEGORIES.filter((cat) => cat.items.length > 0);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="resume-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white dark:bg-[#121D32] border border-slate-200 dark:border-white/15 shadow-2xl p-6 sm:p-8 text-slate-900 dark:text-[#F8FAFC]"
      >
        <div className="flex items-start justify-between gap-4 pb-5 border-b border-slate-200 dark:border-white/10">
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-[#7C3AED] dark:text-[#22D3EE]">
              Resume Summary
            </p>
            <h3 id="resume-modal-title" className="text-2xl font-bold font-display mt-1">
              {PERSONAL_INFO.fullName}
            </h3>
            <p className="text-sm text-slate-600 dark:text-[#A6B0C3] mt-0.5">
              {PERSONAL_INFO.identity} · {PERSONAL_INFO.college}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close resume preview"
            className="w-10 h-10 rounded-xl border border-slate-200 dark:border-white/15 flex items-center justify-center text-slate-500 dark:text-[#A6B0C3] hover:text-slate-900 dark:hover:text-white cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-6 space-y-6 text-sm">
          <div>
            <h4 className="font-semibold text-slate-900 dark:text-[#F8FAFC] mb-2">
              Contact & Links
            </h4>
            <p className="text-slate-600 dark:text-[#A6B0C3]">
              Email: {PERSONAL_INFO.email} · GitHub: {PERSONAL_INFO.githubHandle} · LinkedIn:{' '}
              {PERSONAL_INFO.linkedinLabel}
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-slate-900 dark:text-[#F8FAFC] mb-2">Education</h4>
            <ul className="space-y-2 text-slate-600 dark:text-[#A6B0C3]">
              {EDUCATION_TIMELINE.map((edu) => (
                <li key={edu.id}>
                  <span className="font-medium text-slate-800 dark:text-[#F8FAFC]">
                    {edu.degree}
                  </span>{' '}
                  — {edu.institution} ({edu.periodOrYear})
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-slate-900 dark:text-[#F8FAFC] mb-2">
              Technical Skills
            </h4>
            <ul className="space-y-1.5 text-slate-600 dark:text-[#A6B0C3]">
              {confirmedSkills.map((cat) => (
                <li key={cat.id}>
                  <span className="font-medium text-slate-800 dark:text-[#F8FAFC]">
                    {cat.title}:
                  </span>{' '}
                  {cat.items.join(', ')}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-slate-900 dark:text-[#F8FAFC] mb-2">
              Academic Projects
            </h4>
            <ul className="space-y-2 text-slate-600 dark:text-[#A6B0C3]">
              {PROJECTS_LIST.map((proj) => (
                <li key={proj.id}>
                  <span className="font-medium text-slate-800 dark:text-[#F8FAFC]">
                    {proj.name}
                  </span>{' '}
                  ({proj.technologies.map((t) => t.label).join(', ')}) — {proj.shortDescription}
                </li>
              ))}
            </ul>
          </div>

        </div>

        <div className="mt-6 pt-5 border-t border-slate-200 dark:border-white/10 flex flex-wrap items-center justify-end gap-3 no-print">
          {PERSONAL_INFO.resumeUrl ? (
            <a
              href={PERSONAL_INFO.resumeUrl}
              download
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white bg-[#7C3AED] hover:bg-[#6D28D9] transition-colors"
            >
              <FileText className="w-4 h-4" />
              <span>Download PDF</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          ) : (
            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white bg-[#7C3AED] hover:bg-[#6D28D9] transition-colors cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Save as PDF</span>
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl text-sm font-medium border border-slate-300 dark:border-white/15 text-slate-700 dark:text-[#A6B0C3] hover:text-slate-900 dark:hover:text-white cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
