import { LampContainer } from '@/components/ui/lamp';

type Props = {
  /** Nombre a mostrar como titular principal. */
  name: string;
  /** Rol profesional ya localizado (calculado en Astro). */
  role: string;
  /** Frase de propuesta de valor ya localizada. */
  tagline: string;
  /** Etiqueta de la llamada a la acción primaria. */
  ctaProjects: string;
  /** Etiqueta de la llamada a la acción secundaria. */
  ctaContact: string;
};

/**
 * Hero: nombre + rol + propuesta de valor + dos llamadas a la acción, bajo la
 * luz de la lámpara. Es la ÚNICA entrada orquestada de la página — el resto
 * del contenido simplemente está ahí cuando llegas.
 *
 * Dos decisiones:
 *
 * - El titular va en tinta sólida. El relleno con degradado (`bg-clip-text`)
 *   sobre el nombre era el tell más reconocible del sitio.
 * - La entrada es CSS (`.hero-rise`), no framer-motion. Este bloque contiene
 *   el elemento LCP; animarlo desde React dejaba el HTML servido con
 *   `opacity:0` hasta que hidrataba la isla. El respeto a
 *   `prefers-reduced-motion` lo aporta el bloque global de `global.css`.
 */
export default function LampHero({ name, role, tagline, ctaProjects, ctaContact }: Props) {
  return (
    <LampContainer>
      <h1
        className="hero-rise font-display text-5xl font-bold tracking-tight text-fg md:text-7xl"
        style={{ '--rise-delay': '80ms' } as React.CSSProperties}
      >
        {name}
      </h1>

      <p
        className="hero-rise mt-4 font-display text-xl font-medium text-accent-text sm:text-2xl"
        style={{ '--rise-delay': '180ms' } as React.CSSProperties}
      >
        {role}
      </p>

      <p
        className="hero-rise mt-5 max-w-xl text-base text-muted sm:text-lg"
        style={{ '--rise-delay': '280ms' } as React.CSSProperties}
      >
        {tagline}
      </p>

      <div
        className="hero-rise mt-9 flex flex-wrap items-center justify-center gap-3"
        style={{ '--rise-delay': '380ms' } as React.CSSProperties}
      >
        <a
          href="#projects"
          className="btn-glow inline-flex items-center whitespace-nowrap rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-fg transition-transform hover:-translate-y-0.5"
        >
          {ctaProjects}
        </a>
        <a
          href="#contact"
          className="inline-flex items-center whitespace-nowrap rounded-full border border-edge px-6 py-3 text-sm font-semibold text-fg transition-colors hover:bg-surface-strong"
        >
          {ctaContact}
        </a>
      </div>
    </LampContainer>
  );
}
