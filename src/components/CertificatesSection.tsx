import { useEffect, useState } from 'react';
import { Award, Eye, X } from 'lucide-react';
import {
  CertificateWithUrl,
  loadCertificatesWithImages,
} from '../utils/certificateStorage';
import { SectionHeading } from './SectionUI';

export function CertificatesSection() {
  const [certificates, setCertificates] = useState<CertificateWithUrl[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [previewCert, setPreviewCert] = useState<CertificateWithUrl | null>(null);

  useEffect(() => {
    let isMounted = true;
    loadCertificatesWithImages()
      .then((loaded) => {
        if (!isMounted) return;
        setCertificates(loaded);
      })
      .catch(() => {
        // Keep current state if storage cannot be read
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (!previewCert) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setPreviewCert(null);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [previewCert]);

  const getCategoryOrIssuer = (cert: CertificateWithUrl) =>
    cert.issuer || cert.issuingOrganization || cert.category || '';
  const getDate = (cert: CertificateWithUrl) =>
    cert.date || cert.completionDate || '';

  return (
    <section
      id="certificates"
      className="py-16 sm:py-24 bg-white dark:bg-[#10182B] border-y border-slate-200/70 dark:border-white/10"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          kicker="Certifications"
          title="Certificates & learning credentials"
          subtitle="Verified learning credentials and course completions supporting my software engineering journey."
        />

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[0, 1].map((skeleton) => (
              <div
                key={skeleton}
                className="h-72 rounded-2xl bg-slate-100 dark:bg-[#121D32] border border-slate-200 dark:border-white/10 animate-pulse"
              />
            ))}
          </div>
        ) : certificates.length === 0 ? (
          <div className="rounded-2xl bg-slate-50 dark:bg-[#121D32] border border-slate-200 dark:border-white/10 p-10 sm:p-12 text-center">
            <div className="w-14 h-14 rounded-2xl bg-[#8B5CF6]/10 dark:bg-[#22D3EE]/10 text-[#7C3AED] dark:text-[#22D3EE] flex items-center justify-center mx-auto mb-4">
              <Award className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 dark:text-[#F8FAFC]">
              Certifications
            </h3>
            <p className="mt-2 text-sm text-slate-600 dark:text-[#A6B0C3] max-w-md mx-auto leading-relaxed">
              Verified certificates and training credentials will appear here.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {certificates.map((cert) => {
              const metaLabel = getCategoryOrIssuer(cert);
              const date = getDate(cert);

              return (
                <article
                  key={cert.id}
                  className="group h-full flex flex-col rounded-2xl bg-slate-50 dark:bg-[#121D32] border border-slate-200 dark:border-white/10 overflow-hidden transition-all duration-200 hover:-translate-y-0.5 hover:border-[#7C3AED]/50 dark:hover:border-[#22D3EE]/45 hover:shadow-xl hover:shadow-[#8B5CF6]/10"
                >
                  {/* Clickable Certificate Image Thumbnail */}
                  <button
                    type="button"
                    onClick={() => setPreviewCert(cert)}
                    aria-label={`View ${cert.title} certificate`}
                    className="relative aspect-[16/10] w-full bg-slate-100 dark:bg-[#080D1A] border-b border-slate-200 dark:border-white/10 overflow-hidden cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#8B5CF6]"
                  >
                    {cert.imageUrl ? (
                      <img
                        src={cert.imageUrl}
                        alt={`${cert.title} certificate`}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center text-slate-500 dark:text-[#A6B0C3]">
                        <Award className="w-8 h-8 text-[#7C3AED] dark:text-[#22D3EE] mb-2" />
                        <span className="text-xs font-medium">{cert.title}</span>
                      </div>
                    )}
                  </button>

                  {/* Read-Only Card Details */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      {(metaLabel || date) && (
                        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-[#A6B0C3] mb-2">
                          {metaLabel && <span>{metaLabel}</span>}
                          {metaLabel && date && <span aria-hidden="true">·</span>}
                          {date && <span>{date}</span>}
                        </div>
                      )}

                      <h3 className="text-lg font-semibold text-slate-900 dark:text-[#F8FAFC] leading-snug">
                        {cert.title}
                      </h3>

                      {cert.description && (
                        <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-[#A6B0C3]">
                          {cert.description}
                        </p>
                      )}
                    </div>

                    <div className="mt-6 pt-4 border-t border-slate-200/80 dark:border-white/10 flex items-center justify-start">
                      <button
                        type="button"
                        onClick={() => setPreviewCert(cert)}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium bg-white dark:bg-[#080D1A] border border-slate-300 dark:border-white/15 text-slate-800 dark:text-[#F8FAFC] hover:border-[#7C3AED]/60 dark:hover:border-[#22D3EE]/50 transition-colors cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6]"
                      >
                        <Eye className="w-4 h-4 text-[#7C3AED] dark:text-[#22D3EE]" />
                        <span>View Certificate</span>
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>

      {/* Read-Only Lightbox Preview Modal */}
      {previewCert && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="certificate-lightbox-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm"
          onClick={() => setPreviewCert(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-3xl max-h-[92vh] overflow-y-auto rounded-2xl bg-white dark:bg-[#121D32] border border-slate-200 dark:border-white/15 shadow-2xl overflow-hidden text-slate-900 dark:text-[#F8FAFC]"
          >
            <div className="flex items-center justify-between gap-4 px-6 py-4 border-b border-slate-200 dark:border-white/10">
              <div className="min-w-0">
                <p className="text-xs text-[#7C3AED] dark:text-[#22D3EE] font-medium uppercase tracking-wider">
                  Certificate
                </p>
                <h3
                  id="certificate-lightbox-title"
                  className="text-lg sm:text-xl font-bold font-display truncate"
                >
                  {previewCert.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setPreviewCert(null)}
                aria-label="Close certificate preview"
                className="w-10 h-10 rounded-xl border border-slate-200 dark:border-white/15 flex items-center justify-center text-slate-500 dark:text-[#A6B0C3] hover:text-slate-900 dark:hover:text-white shrink-0 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-5">
              <div className="w-full max-h-[62vh] rounded-xl overflow-hidden border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-[#080D1A] flex items-center justify-center">
                {previewCert.imageUrl ? (
                  <img
                    src={previewCert.imageUrl}
                    alt={`${previewCert.title} full preview`}
                    referrerPolicy="no-referrer"
                    className="max-h-[60vh] w-full object-contain"
                  />
                ) : (
                  <div className="p-10 text-center text-slate-500 dark:text-[#A6B0C3]">
                    <Award className="w-12 h-12 mx-auto text-[#7C3AED] dark:text-[#22D3EE] mb-2" />
                    <p className="text-sm">{previewCert.title}</p>
                  </div>
                )}
              </div>

              {(getCategoryOrIssuer(previewCert) || getDate(previewCert)) && (
                <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-[#A6B0C3]">
                  {getCategoryOrIssuer(previewCert) && (
                    <span>{getCategoryOrIssuer(previewCert)}</span>
                  )}
                  {getCategoryOrIssuer(previewCert) && getDate(previewCert) && (
                    <span aria-hidden="true">·</span>
                  )}
                  {getDate(previewCert) && <span>{getDate(previewCert)}</span>}
                </div>
              )}

              {previewCert.description && (
                <p className="text-sm leading-relaxed text-slate-600 dark:text-[#CBD5E1]">
                  {previewCert.description}
                </p>
              )}

              <div className="pt-2 border-t border-slate-200 dark:border-white/10 flex justify-end">
                <button
                  type="button"
                  onClick={() => setPreviewCert(null)}
                  className="px-4 py-2 rounded-xl text-sm font-medium bg-slate-100 dark:bg-[#080D1A] hover:bg-slate-200 dark:hover:bg-white/10 cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
