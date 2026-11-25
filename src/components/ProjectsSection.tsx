import { useEffect, useState } from 'react';
import { CheckCircle2, Code2, Eye, FolderOpen, Layers, X } from 'lucide-react';
import {
  PROJECT_FILTERS,
  PROJECTS_LIST,
  ProjectCategory,
  ProjectItem,
} from '../data/portfolio';
import { Reveal } from './SectionUI';

export function ProjectsSection() {
  const [selectedFilter, setSelectedFilter] = useState<'All Projects' | ProjectCategory>(
    'All Projects'
  );
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);
  const [brokenImages, setBrokenImages] = useState<Record<string, boolean>>({});

  const filteredProjects =
    selectedFilter === 'All Projects'
      ? PROJECTS_LIST
      : PROJECTS_LIST.filter((project) => project.category === selectedFilter);

  useEffect(() => {
    if (!activeProject) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveProject(null);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [activeProject]);

  return (
    <section id="projects" className="py-16 sm:py-24 bg-slate-50 dark:bg-[#080D1A]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10 md:mb-12">
          <Reveal>
            <div className="max-w-2xl">
              <p className="text-xs font-medium tracking-wider uppercase text-[#7C3AED] dark:text-[#22D3EE] mb-2">
                Featured Projects
              </p>
              <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900 dark:text-[#F8FAFC] text-balance">
                Practical software & web applications
              </h2>
              <p className="mt-3 text-base leading-relaxed text-slate-600 dark:text-[#A6B0C3]">
                Real academic builds addressing everyday challenges across mobile marketplaces,
                local service discovery, and student learning portals.
              </p>
            </div>
          </Reveal>

          {/* Interactive Filter Controls */}
          <div
            role="tablist"
            aria-label="Filter projects by category"
            className="inline-flex flex-wrap items-center gap-1.5 p-1.5 rounded-xl bg-white dark:bg-[#121D32] border border-slate-200 dark:border-white/10 self-start lg:self-auto"
          >
            {PROJECT_FILTERS.map((filter) => {
              const isActive = selectedFilter === filter;
              return (
                <button
                  key={filter}
                  role="tab"
                  type="button"
                  aria-selected={isActive}
                  onClick={() => setSelectedFilter(filter)}
                  className={`px-3.5 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors duration-200 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6] ${
                    isActive
                      ? 'bg-[#7C3AED] text-white shadow-sm'
                      : 'text-slate-600 dark:text-[#A6B0C3] hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {filter}
                </button>
              );
            })}
          </div>
        </div>

        {/* Project Grid or Empty Filter State */}
        {filteredProjects.length === 0 ? (
          <div className="rounded-2xl bg-white dark:bg-[#121D32] border border-dashed border-slate-300 dark:border-white/15 p-10 text-center">
            <div className="w-12 h-12 rounded-2xl bg-[#8B5CF6]/10 dark:bg-[#22D3EE]/10 text-[#7C3AED] dark:text-[#22D3EE] flex items-center justify-center mx-auto mb-4">
              <FolderOpen className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-[#F8FAFC]">
              {selectedFilter} Coming Soon
            </h3>
            <p className="mt-2 text-sm text-slate-600 dark:text-[#A6B0C3] max-w-md mx-auto">
              I am currently exploring Cloud Computing fundamentals and will add new projects here
              as they are built and documented.
            </p>
            <button
              type="button"
              onClick={() => setSelectedFilter('All Projects')}
              className="mt-5 px-4 py-2 rounded-xl text-sm font-medium bg-[#7C3AED] text-white hover:bg-[#6D28D9] transition-colors cursor-pointer"
            >
              Show All Projects
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-7">
            {filteredProjects.map((project, idx) => (
              <Reveal key={project.id} delay={idx * 0.06}>
                <article className="group h-full flex flex-col rounded-2xl bg-white dark:bg-[#121D32] border border-slate-200 dark:border-white/10 overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:border-[#7C3AED]/50 dark:hover:border-[#22D3EE]/45 hover:shadow-xl hover:shadow-[#8B5CF6]/10">
                  {/* Project Screenshot */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100 dark:bg-[#080D1A]">
                    {!brokenImages[project.id] ? (
                      <img
                        src={project.screenshot}
                        alt={`${project.name} application interface preview`}
                        referrerPolicy="no-referrer"
                        loading="lazy"
                        onError={() =>
                          setBrokenImages((prev) => ({ ...prev, [project.id]: true }))
                        }
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-[#10182B] to-[#121D32] text-[#F8FAFC]">
                        <Layers className="w-8 h-8 text-[#22D3EE] mb-2" />
                        <span className="font-display font-semibold">{project.name}</span>
                      </div>
                    )}
                  </div>

                  {/* Content Body */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-[#A6B0C3] mb-2">
                        <span>{project.category}</span>
                        <span aria-hidden="true">·</span>
                        <span className="font-medium text-emerald-700 dark:text-emerald-400">
                          {project.status}
                        </span>
                      </div>

                      <h3 className="text-xl font-semibold text-slate-900 dark:text-[#F8FAFC]">
                        {project.name}
                      </h3>

                      <p className="mt-2.5 text-sm leading-relaxed text-slate-600 dark:text-[#A6B0C3]">
                        {project.shortDescription}
                      </p>

                      {/* Technologies Used */}
                      <div className="mt-4 pt-4 border-t border-slate-200/80 dark:border-white/10">
                        <p className="text-xs font-semibold text-slate-800 dark:text-[#E2E8F0] mb-1.5">
                          Technologies Used
                        </p>
                        <p className="text-xs text-slate-600 dark:text-[#A6B0C3] leading-relaxed">
                          {project.technologies.map((t) => t.label).join(' · ')}
                        </p>
                      </div>
                    </div>

                    {/* Clean Card Action */}
                    <div className="mt-6 pt-4 border-t border-slate-200/80 dark:border-white/10 flex items-center justify-between gap-3">
                      <button
                        type="button"
                        onClick={() => setActiveProject(project)}
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#7C3AED] dark:text-[#22D3EE] hover:underline cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6] rounded"
                      >
                        <Eye className="w-4 h-4" />
                        <span>View Project Details</span>
                      </button>

                      <span className="text-xs text-slate-500 dark:text-[#A6B0C3]">
                        {project.status}
                      </span>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        )}
      </div>

      {/* Full Project Details Modal */}
      {activeProject && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm"
          onClick={() => setActiveProject(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white dark:bg-[#121D32] border border-slate-200 dark:border-white/15 shadow-2xl overflow-hidden text-slate-900 dark:text-[#F8FAFC]"
          >
            <div className="relative aspect-[16/9] w-full bg-slate-100 dark:bg-[#080D1A]">
              {!brokenImages[activeProject.id] ? (
                <img
                  src={activeProject.screenshot}
                  alt={`${activeProject.name} detailed preview`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Code2 className="w-10 h-10 text-[#22D3EE]" />
                </div>
              )}
              <button
                type="button"
                onClick={() => setActiveProject(null)}
                aria-label="Close project details"
                className="absolute top-4 right-4 w-10 h-10 rounded-xl bg-slate-950/70 text-white hover:bg-slate-950 flex items-center justify-center backdrop-blur-sm cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 sm:p-8 space-y-6">
              <div>
                <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-[#A6B0C3]">
                  <span>{activeProject.category}</span>
                  <span aria-hidden="true">·</span>
                  <span className="font-medium text-emerald-700 dark:text-emerald-400">
                    {activeProject.status}
                  </span>
                </div>
                <h3
                  id="project-modal-title"
                  className="text-2xl sm:text-3xl font-bold font-display mt-1"
                >
                  {activeProject.name}
                </h3>
                <p className="mt-3 text-sm sm:text-base leading-relaxed text-slate-600 dark:text-[#CBD5E1]">
                  {activeProject.shortDescription}
                </p>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-slate-900 dark:text-[#F8FAFC] mb-1.5">
                  Problem Statement
                </h4>
                <p className="text-sm leading-relaxed text-slate-600 dark:text-[#A6B0C3]">
                  {activeProject.problemStatement}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-semibold text-slate-900 dark:text-[#F8FAFC] mb-2.5">
                    Key Features
                  </h4>
                  <ul className="space-y-2">
                    {activeProject.keyFeatures.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-2 text-sm text-slate-600 dark:text-[#A6B0C3]"
                      >
                        <CheckCircle2 className="w-4 h-4 text-[#7C3AED] dark:text-[#22D3EE] shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-slate-900 dark:text-[#F8FAFC] mb-2.5">
                    Technologies Used
                  </h4>
                  <ul className="space-y-2">
                    {activeProject.technologies.map((tech) => (
                      <li
                        key={tech.label}
                        className="flex items-center justify-between px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#080D1A]/75 border border-slate-200/80 dark:border-white/10 text-sm"
                      >
                        <span className="font-medium text-slate-800 dark:text-[#F8FAFC]">
                          {tech.label}
                        </span>
                        {tech.role && (
                          <span className="text-xs text-slate-500 dark:text-[#A6B0C3]">
                            {tech.role}
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200 dark:border-white/10 flex justify-end">
                <button
                  type="button"
                  onClick={() => setActiveProject(null)}
                  className="px-5 py-2.5 rounded-xl text-sm font-medium bg-slate-100 dark:bg-[#080D1A] text-slate-700 dark:text-[#F8FAFC] hover:bg-slate-200 dark:hover:bg-white/10 transition-colors cursor-pointer"
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
