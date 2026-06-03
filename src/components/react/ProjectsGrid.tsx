import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react';

export type ProjectCard = {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  category: string;
  tags: string[];
  image?: string;
  repo?: string;
  demo?: string;
  featured?: boolean;
};

export type ProjectLabels = {
  all: string;
  featured: string;
  viewRepo: string;
  viewDemo: string;
  details: string;
  close: string;
  empty: string;
};

type Props = {
  projects: ProjectCard[];
  labels: ProjectLabels;
};

const ExternalIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M15 3h6v6" /><path d="M10 14 21 3" /><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
  </svg>
);
const CodeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="m16 18 6-6-6-6" /><path d="m8 6-6 6 6 6" />
  </svg>
);
const CloseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M18 6 6 18" /><path d="m6 6 12 12" />
  </svg>
);

/** Imagen con degradado de respaldo si el archivo no existe. */
function ProjectImage({ project, className }: { project: ProjectCard; className?: string }) {
  const [failed, setFailed] = useState(!project.image);
  return (
    <div className={`relative overflow-hidden bg-surface-strong ${className ?? ''}`}>
      <div
        className="absolute inset-0 grid place-items-center"
        style={{
          background:
            'linear-gradient(135deg, color-mix(in srgb, var(--c-accent) 35%, transparent), color-mix(in srgb, #a855f7 30%, transparent))',
        }}
        aria-hidden="true"
      >
        <span className="font-display text-4xl font-bold text-fg/70">{project.title.charAt(0)}</span>
      </div>
      {!failed && project.image && (
        <img
          src={project.image}
          alt={project.title}
          loading="lazy"
          onError={() => setFailed(true)}
          className="relative size-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      )}
    </div>
  );
}

export default function ProjectsGrid({ projects, labels }: Props) {
  const [active, setActive] = useState('all');
  const [selected, setSelected] = useState<ProjectCard | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  // Categorías únicas, en orden de aparición.
  const categories = useMemo(() => {
    const seen: string[] = [];
    for (const p of projects) if (!seen.includes(p.category)) seen.push(p.category);
    return seen;
  }, [projects]);

  const filtered = useMemo(
    () => (active === 'all' ? projects : projects.filter((p) => p.category === active)),
    [active, projects]
  );

  // Cierre del modal: bloqueo de scroll, foco y tecla Escape.
  useEffect(() => {
    if (!selected) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelected(null);
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener('keydown', onKey);
    };
  }, [selected]);

  const catLabel = (id: string) => id.charAt(0).toUpperCase() + id.slice(1);

  return (
    <div>
      {/* Filtros */}
      <div className="reveal mb-8 flex flex-wrap gap-2">
        <FilterButton active={active === 'all'} onClick={() => setActive('all')}>
          {labels.all}
        </FilterButton>
        {categories.map((cat) => (
          <FilterButton key={cat} active={active === cat} onClick={() => setActive(cat)}>
            {catLabel(cat)}
          </FilterButton>
        ))}
      </div>

      {/* Grilla */}
      {filtered.length === 0 ? (
        <p className="py-12 text-center text-muted">{labels.empty}</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((project, i) => (
            <article
              key={project.id}
              className="card-in group glass flex flex-col overflow-hidden rounded-2xl transition-transform duration-300 hover:-translate-y-1"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <button
                type="button"
                onClick={() => setSelected(project)}
                aria-label={`${labels.details}: ${project.title}`}
                className="block cursor-pointer text-left"
              >
                <ProjectImage project={project} className="aspect-16/10" />
              </button>

              <div className="flex flex-1 flex-col p-5">
                <div className="mb-2 flex items-center justify-between gap-2">
                  <h3 className="font-display text-lg font-semibold text-fg">{project.title}</h3>
                  {project.featured && (
                    <span className="shrink-0 rounded-full bg-accent/15 px-2 py-0.5 font-mono text-[0.65rem] uppercase tracking-wide text-accent-text">
                      {labels.featured}
                    </span>
                  )}
                </div>

                <p className="mb-4 line-clamp-3 flex-1 text-sm text-muted">{project.description}</p>

                <ul className="mb-4 flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-full bg-surface-strong px-2 py-0.5 font-mono text-[0.7rem] text-muted"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto flex items-center gap-3 text-sm">
                  <button
                    type="button"
                    onClick={() => setSelected(project)}
                    className="inline-flex cursor-pointer items-center gap-1.5 font-medium text-accent-text hover:underline"
                  >
                    {labels.details}
                  </button>
                  {project.repo && (
                    <a
                      href={project.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-auto inline-flex items-center gap-1.5 text-muted transition-colors hover:text-fg"
                    >
                      <CodeIcon /> {labels.viewRepo}
                    </a>
                  )}
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-muted transition-colors hover:text-fg"
                    >
                      <ExternalIcon /> {labels.viewDemo}
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* Modal de detalle */}
      {selected && (
        <div
          className="overlay-in fixed inset-0 z-100 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-modal-title"
          onClick={() => setSelected(null)}
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" aria-hidden="true" />
          <div
            className="dialog-in modal-panel relative z-10 max-h-[90dvh] w-full max-w-2xl overflow-y-auto rounded-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <ProjectImage project={selected} className="h-44 rounded-t-2xl sm:h-56" />
            <button
              ref={closeRef}
              type="button"
              onClick={() => setSelected(null)}
              aria-label={labels.close}
              className="absolute right-3 top-3 grid size-10 cursor-pointer place-items-center rounded-full bg-black/40 text-white transition-colors hover:bg-black/60"
            >
              <CloseIcon />
            </button>

            <div className="p-6">
              <h3
                id="project-modal-title"
                className="font-display text-2xl font-bold text-fg"
              >
                {selected.title}
              </h3>
              <p className="mt-3 leading-relaxed text-muted">
                {selected.longDescription ?? selected.description}
              </p>

              <ul className="mt-5 flex flex-wrap gap-2">
                {selected.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-full bg-surface-strong px-2.5 py-1 font-mono text-xs text-muted"
                  >
                    {tag}
                  </li>
                ))}
              </ul>

              {(selected.repo || selected.demo) && (
                <div className="mt-6 flex flex-wrap gap-3">
                  {selected.repo && (
                    <a
                      href={selected.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="glass inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold text-fg transition-colors hover:bg-surface-strong"
                    >
                      <CodeIcon /> {labels.viewRepo}
                    </a>
                  )}
                  {selected.demo && (
                    <a
                      href={selected.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-glow inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2.5 text-sm font-semibold text-accent-fg transition-transform hover:-translate-y-0.5"
                    >
                      <ExternalIcon /> {labels.viewDemo}
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function FilterButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`cursor-pointer rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
        active
          ? 'border-transparent bg-accent text-accent-fg'
          : 'border-edge text-muted hover:bg-surface-strong hover:text-fg'
      }`}
    >
      {children}
    </button>
  );
}
