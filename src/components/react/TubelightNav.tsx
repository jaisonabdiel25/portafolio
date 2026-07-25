import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

type NavLink = {
  id: string;
  label: string;
};

type Props = {
  links: NavLink[];
};

/**
 * Enlaces de navegación de escritorio con el efecto "tubelight": una lámpara
 * animada que se desliza bajo el enlace activo (framer-motion `layoutId`).
 *
 * El enlace activo se determina por la posición de scroll mediante un
 * IntersectionObserver propio, igual que hacía el header en Astro, para que
 * el resaltado siga a la sección visible y no solo al último clic.
 */
export default function TubelightNav({ links }: Props) {
  const [active, setActive] = useState(links[0]?.id ?? '');

  useEffect(() => {
    const sections = links
      .map((link) => document.getElementById(link.id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [links]);

  return (
    <ul className="hidden items-center gap-1 md:flex">
      {links.map((link) => {
        const isActive = active === link.id;

        return (
          <li key={link.id}>
            <a
              href={`#${link.id}`}
              onClick={() => setActive(link.id)}
              aria-current={isActive ? 'true' : undefined}
              className={`relative block whitespace-nowrap rounded-full px-3 py-2 text-sm font-medium transition-colors ${
                isActive ? 'text-fg' : 'text-muted hover:text-fg'
              }`}
            >
              {link.label}
              {isActive && (
                <motion.span
                  layoutId="lamp"
                  className="absolute inset-0 -z-10 rounded-full bg-surface-strong"
                  initial={false}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                >
                  {/* Tubo de luz sobre el enlace activo. */}
                  <span className="absolute -top-px left-1/2 h-1 w-8 -translate-x-1/2 rounded-t-full bg-accent">
                    <span className="absolute -left-2 -top-2 h-6 w-12 rounded-full bg-accent/30 blur-md" />
                    <span className="absolute -top-1 h-6 w-8 rounded-full bg-accent/25 blur-md" />
                    <span className="absolute left-2 top-0 h-4 w-4 rounded-full bg-accent/25 blur-sm" />
                  </span>
                </motion.span>
              )}
            </a>
          </li>
        );
      })}
    </ul>
  );
}
