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

/** Imagen con degradado de respaldo si el archivo no existe. Los colores del
 *  respaldo salen de los tokens (`--c-fallback-*`), no de hex sueltos. */
function ProjectImage({ project, className }: { project: ProjectCard; className?: string }) {
  const [failed, setFailed] = useState(!project.image);
  return (
    <div className={`relative overflow-hidden bg-panel-hover ${className ?? ''}`}>
      <div
        className="absolute inset-0 grid place-items-center"
        style={{
          background:
            'linear-gradient(135deg, var(--c-fallback-from), var(--c-fallback-to))',
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
  const dialogRef = useRef<HTMLDivElement>(null);
  /** Elemento que abrió el modal: al cerrar hay que devolverle el foco, o el
   *  usuario de teclado queda tirado al inicio del documento. */
  const openerRef = useRef<HTMLElement | null>(null);

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

  function openProject(project: ProjectCard) {
    openerRef.current = document.activeElement as HTMLElement | null;
    setSelected(project);
  }

  // Modal: bloqueo de scroll, foco atrapado, Escape y restauración del foco.
  useEffect(() => {
    if (!selected) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelected(null);
        return;
      }
      // Atrapa el foco dentro del diálogo (Tab/Shift+Tab hacen ciclo).
      if (e.key === 'Tab') {
        const focusables = dialogRef.current?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        if (!focusables || focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener('keydown', onKey);

    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener('keydown', onKey);
      openerRef.current?.focus();
    };
  }, [selected]);

  const catLabel = (id: string) => id.charAt(0).toUpperCase() + id.slice(1);

  return (
    <div>
      {/* Filtros */}
      <div className="mb-10 flex flex-wrap gap-2">
        <FilterButton active={active === 'all'} onClick={() => setActive('all')}>
          {labels.all}
        </FilterButton>
        {categories.map((cat) => (
          <FilterButton key={cat} active={active === cat} onClick={() => setActive(cat)}>
            {catLabel(cat)}
          </FilterButton>
        ))}
      </div>

      {/* Rejilla. Los proyectos destacados ocupan DOS columnas con imagen
          apaisada: el flag `featured` cambia el peso en la página, no solo
          pinta una etiqueta minúscula. */}
      {filtered.length === 0 ? (
        <p className="py-12 text-center text-muted">{labels.empty}</p>
      ) : (
        <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((project, i) => {
            const isFeatured = Boolean(project.featured);
            return (
              <article
                key={project.id}
                className={`card-in group panel flex flex-col overflow-hidden transition-transform duration-300 hover:-translate-y-1 ${
                  isFeatured ? 'sm:col-span-2' : ''
                }`}
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <button
                  type="button"
                  onClick={() => openProject(project)}
                  aria-label={`${labels.details}: ${project.title}`}
                  className="block cursor-pointer text-left"
                >
                  <ProjectImage
                    project={project}
                    className={isFeatured ? 'aspect-16/7' : 'aspect-16/10'}
                  />
                </button>

                <div className="flex flex-1 flex-col p-5">
                  <div className="mb-2 flex items-center justify-between gap-2">
                    <h3
                      className={`font-display font-semibold text-fg ${
                        isFeatured ? 'text-xl sm:text-2xl' : 'text-lg'
                      }`}
                    >
                      {project.title}
                    </h3>
                    {isFeatured && (
                      <span className="shrink-0 rounded-full border border-edge px-2 py-0.5 font-mono text-[0.65rem] uppercase tracking-wide text-accent-text">
                        {labels.featured}
                      </span>
                    )}
                  </div>

                  <p
                    className={`mb-4 flex-1 text-sm text-muted ${
                      isFeatured ? 'max-w-2xl line-clamp-4' : 'line-clamp-3'
                    }`}
                  >
                    {project.description}
                  </p>

                  <ul className="mb-4 flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <li
                        key={tag}
                        className="rounded-full border border-edge px-2 py-0.5 font-mono text-[0.7rem] text-muted"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto flex items-center gap-3 text-sm">
                    <button
                      type="button"
                      onClick={() => openProject(project)}
                      className="inline-flex cursor-pointer items-center gap-1.5 whitespace-nowrap font-medium text-accent-text hover:underline"
                    >
                      {labels.details}
                    </button>
                    {project.repo && (
                      <a
                        href={project.repo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-auto inline-flex items-center gap-1.5 whitespace-nowrap text-muted transition-colors hover:text-fg"
                      >
                        <CodeIcon /> {labels.viewRepo}
                      </a>
                    )}
                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 whitespace-nowrap text-muted transition-colors hover:text-fg"
                      >
                        <ExternalIcon /> {labels.viewDemo}
                      </a>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}

      {/* Modal de detalle */}
      {selected && (
        <div className="overlay-in fixed inset-0 z-(--z-modal) flex items-center justify-center p-4">
          {/* El velo es el elemento que cierra al pulsar fuera; el diálogo ya
              no necesita frenar la propagación del clic. */}
          <button
            type="button"
            tabIndex={-1}
            aria-hidden="true"
            onClick={() => setSelected(null)}
            className="absolute inset-0 cursor-default bg-scrim backdrop-blur-sm"
          />
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
            className="dialog-in modal-panel relative z-(--z-raised) max-h-[90dvh] w-full max-w-2xl overflow-y-auto rounded-2xl"
          >
            <ProjectImage project={selected} className="h-44 rounded-t-2xl sm:h-56" />
            <button
              ref={closeRef}
              type="button"
              onClick={() => setSelected(null)}
              aria-label={labels.close}
              className="absolute right-3 top-3 grid size-10 cursor-pointer place-items-center rounded-full bg-scrim text-white transition-colors hover:bg-fg/40"
            >
              <CloseIcon />
            </button>

            <div className="p-6">
              <h3 id="project-modal-title" className="font-display text-2xl font-bold text-fg">
                {selected.title}
              </h3>
              <p className="mt-3 leading-relaxed text-muted">
                {selected.longDescription ?? selected.description}
              </p>

              <ul className="mt-5 flex flex-wrap gap-2">
                {selected.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-full border border-edge px-2.5 py-1 font-mono text-xs text-muted"
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
                      className="inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-edge px-4 py-2.5 text-sm font-semibold text-fg transition-colors hover:bg-panel-hover"
                    >
                      <CodeIcon /> {labels.viewRepo}
                    </a>
                  )}
                  {selected.demo && (
                    <a
                      href={selected.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-glow inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-accent px-4 py-2.5 text-sm font-semibold text-accent-fg transition-transform hover:-translate-y-0.5"
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
      className={`cursor-pointer whitespace-nowrap rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
        active
          ? 'border-transparent bg-accent text-accent-fg'
          : 'border-edge text-muted hover:bg-panel-hover hover:text-fg'
      }`}
    >
      {children}
    </button>
  );
}
