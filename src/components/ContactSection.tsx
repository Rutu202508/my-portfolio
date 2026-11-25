import { useState } from 'react';
import { Check, Copy, Github, Linkedin, Mail } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolio';
import { Reveal, SectionHeading } from './SectionUI';

export function ContactSection() {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PERSONAL_INFO.email);
      setCopiedEmail(true);
      window.setTimeout(() => setCopiedEmail(false), 2000);
    } catch {
      // Clipboard blocked in restricted context; mailto remains active
    }
  };

  return (
    <section
      id="contact"
      className="py-16 sm:py-24 bg-white dark:bg-[#10182B] border-t border-slate-200/70 dark:border-white/10"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            kicker="Contact Me"
            title="Let's Connect and Build Something Amazing!"
            subtitle="Open to internships, software engineering learning opportunities, academic collaborations, and technical discussions."
          />
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          {/* Direct Contact Channels */}
          <Reveal className="lg:col-span-6 flex">
            <div className="w-full rounded-2xl bg-slate-50 dark:bg-[#121D32] border border-slate-200 dark:border-white/10 p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-[#F8FAFC] mb-5">
                  Direct Channels
                </h3>

                <div className="space-y-4">
                  {/* Email */}
                  <div className="flex items-start justify-between gap-3 p-4 rounded-xl bg-white dark:bg-[#080D1A]/75 border border-slate-200/80 dark:border-white/10">
                    <div className="flex items-start gap-3.5 min-w-0">
                      <div className="w-10 h-10 rounded-xl bg-[#8B5CF6]/10 dark:bg-[#8B5CF6]/15 text-[#7C3AED] dark:text-[#22D3EE] flex items-center justify-center shrink-0">
                        <Mail className="w-5 h-5" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs text-slate-500 dark:text-[#A6B0C3]">Email</p>
                        <a
                          href={`mailto:${PERSONAL_INFO.email}`}
                          className="text-sm font-medium text-slate-900 dark:text-[#F8FAFC] hover:text-[#7C3AED] dark:hover:text-[#22D3EE] break-all transition-colors"
                        >
                          {PERSONAL_INFO.email}
                        </a>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={handleCopyEmail}
                      aria-label="Copy email address"
                      title="Copy email address"
                      className="w-9 h-9 rounded-lg border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-500 dark:text-[#A6B0C3] hover:text-slate-900 dark:hover:text-white shrink-0 cursor-pointer"
                    >
                      {copiedEmail ? (
                        <Check className="w-4 h-4 text-emerald-500" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>

                  {/* GitHub */}
                  <a
                    href={PERSONAL_INFO.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3.5 p-4 rounded-xl bg-white dark:bg-[#080D1A]/75 border border-slate-200/80 dark:border-white/10 hover:border-[#7C3AED]/50 dark:hover:border-[#22D3EE]/45 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#8B5CF6]/10 dark:bg-[#8B5CF6]/15 text-[#7C3AED] dark:text-[#22D3EE] flex items-center justify-center shrink-0">
                      <Github className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs text-slate-500 dark:text-[#A6B0C3]">GitHub</p>
                      <p className="text-sm font-medium text-slate-900 dark:text-[#F8FAFC] truncate">
                        github.com/{PERSONAL_INFO.githubHandle}
                      </p>
                    </div>
                  </a>

                  {/* LinkedIn */}
                  <a
                    href={PERSONAL_INFO.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3.5 p-4 rounded-xl bg-white dark:bg-[#080D1A]/75 border border-slate-200/80 dark:border-white/10 hover:border-[#7C3AED]/50 dark:hover:border-[#22D3EE]/45 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#8B5CF6]/10 dark:bg-[#8B5CF6]/15 text-[#7C3AED] dark:text-[#22D3EE] flex items-center justify-center shrink-0">
                      <Linkedin className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs text-slate-500 dark:text-[#A6B0C3]">LinkedIn</p>
                      <p className="text-sm font-medium text-slate-900 dark:text-[#F8FAFC] truncate">
                        linkedin.com/in/{PERSONAL_INFO.linkedinLabel}
                      </p>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Clean Direct Email Card */}
          <Reveal delay={0.06} className="lg:col-span-6 flex">
            <div className="w-full rounded-2xl bg-slate-50 dark:bg-[#121D32] border border-slate-200 dark:border-white/10 p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-[#F8FAFC]">
                  Get in Touch
                </h3>
                <p className="mt-3 text-sm sm:text-base leading-relaxed text-slate-600 dark:text-[#A6B0C3]">
                  Whether you are reaching out regarding software development internships, student
                  technical collaborations, or new learning opportunities, feel free to send an
                  email directly or connect on LinkedIn.
                </p>

                <div className="mt-6 p-4 rounded-xl bg-white dark:bg-[#080D1A]/75 border border-slate-200/80 dark:border-white/10">
                  <p className="text-xs text-slate-500 dark:text-[#A6B0C3]">
                    Primary Email Address
                  </p>
                  <p className="mt-1 text-sm sm:text-base font-semibold text-slate-900 dark:text-[#F8FAFC] break-all">
                    {PERSONAL_INFO.email}
                  </p>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-[#7C3AED] to-[#6D28D9] dark:from-[#8B5CF6] dark:to-[#7C3AED] hover:brightness-110 shadow-lg shadow-[#8B5CF6]/20 transition-all duration-200 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22D3EE]"
                >
                  <Mail className="w-4 h-4" />
                  <span>Email Me</span>
                </a>

                <a
                  href={PERSONAL_INFO.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-medium border border-slate-300 dark:border-white/15 bg-white dark:bg-[#080D1A]/75 text-slate-800 dark:text-[#F8FAFC] hover:border-[#7C3AED]/60 dark:hover:border-[#22D3EE]/50 transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6]"
                >
                  <Linkedin className="w-4 h-4 text-[#0A66C2] dark:text-[#22D3EE]" />
                  <span>Connect on LinkedIn</span>
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
