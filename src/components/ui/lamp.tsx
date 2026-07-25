import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';

/**
 * Contenedor con efecto "lamp" (lámpara), adaptado a este portafolio.
 *
 * Tres decisiones a tener en cuenta si se toca este archivo:
 *
 * 1. El contenedor lleva la clase `.stage`: es un escenario SIEMPRE oscuro,
 *    no sigue el toggle claro/oscuro. Un haz de luz solo lee como luz sobre
 *    fondo oscuro; sobre papel claro era una mancha índigo difusa.
 * 2. La lámpara es una capa decorativa absoluta (`aria-hidden`) anclada al
 *    borde superior. El contenido fluye por debajo con su propio padding, en
 *    lugar de compensarse con un `-translate-y-80` que dependía del alto de
 *    la ventana.
 * 3. Toda la animación respeta `prefers-reduced-motion` y usa
 *    `viewport={{ once: true }}`: framer-motion anima estilos en línea por JS,
 *    así que el override CSS de `prefers-reduced-motion` no le afecta y hay
 *    que consultarlo explícitamente.
 */
export const LampContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const reduce = useReducedMotion();

  /** Anima de `from` a `to`, o salta directamente a `to` si el usuario pidió
   *  menos movimiento. */
  const beam = (from: string, to: string) =>
    reduce
      ? { initial: { opacity: 1, width: to } }
      : {
          initial: { opacity: 0.5, width: from },
          whileInView: { opacity: 1, width: to },
          viewport: { once: true } as const,
          transition: { delay: 0.3, duration: 0.8, ease: 'easeInOut' } as const,
        };

  return (
    <div
      className={cn(
        'stage relative isolate flex min-h-[88dvh] w-full flex-col overflow-hidden bg-[var(--c-bg-to)]',
        className
      )}
    >
      {/* Capa decorativa: la lámpara. Anclada arriba, nunca captura eventos. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 flex h-[26rem] items-center justify-center overflow-hidden sm:h-[34rem]"
      >
        <div className="relative flex h-full w-full scale-x-[0.6] scale-y-125 items-center justify-center sm:scale-x-100">
          <motion.div
            {...beam('15rem', '30rem')}
            style={{
              backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
            }}
            className="absolute inset-auto right-1/2 h-56 w-[30rem] overflow-visible bg-gradient-conic from-[var(--c-accent)] via-transparent to-transparent [--conic-position:from_70deg_at_center_top]"
          >
            <div className="absolute bottom-0 left-0 z-20 h-40 w-[100%] bg-[var(--c-bg-to)] [mask-image:linear-gradient(to_top,white,transparent)]" />
            <div className="absolute bottom-0 left-0 z-20 h-[100%] w-40 bg-[var(--c-bg-to)] [mask-image:linear-gradient(to_right,white,transparent)]" />
          </motion.div>

          <motion.div
            {...beam('15rem', '30rem')}
            style={{
              backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
            }}
            className="absolute inset-auto left-1/2 h-56 w-[30rem] bg-gradient-conic from-transparent via-transparent to-[var(--c-accent)] [--conic-position:from_290deg_at_center_top]"
          >
            <div className="absolute bottom-0 right-0 z-20 h-[100%] w-40 bg-[var(--c-bg-to)] [mask-image:linear-gradient(to_left,white,transparent)]" />
            <div className="absolute bottom-0 right-0 z-20 h-40 w-[100%] bg-[var(--c-bg-to)] [mask-image:linear-gradient(to_top,white,transparent)]" />
          </motion.div>

          {/* Corte inferior del haz y halo difuso bajo el tubo. */}
          <div className="absolute top-1/2 h-48 w-full translate-y-12 scale-x-150 bg-[var(--c-bg-to)] blur-2xl" />
          <div className="absolute inset-auto z-20 h-36 w-[28rem] -translate-y-1/2 rounded-full bg-[var(--c-accent)] opacity-50 blur-3xl" />

          <motion.div
            {...(reduce
              ? { initial: { width: '16rem' } }
              : {
                  initial: { width: '8rem' },
                  whileInView: { width: '16rem' },
                  viewport: { once: true } as const,
                  transition: { delay: 0.3, duration: 0.8, ease: 'easeInOut' } as const,
                })}
            className="absolute inset-auto z-20 h-36 w-64 -translate-y-[6rem] rounded-full bg-[var(--c-accent)] blur-2xl"
          />

          {/* El tubo: la línea nítida de la que sale toda la luz. */}
          <motion.div
            {...(reduce
              ? { initial: { width: '30rem' } }
              : {
                  initial: { width: '15rem' },
                  whileInView: { width: '30rem' },
                  viewport: { once: true } as const,
                  transition: { delay: 0.3, duration: 0.8, ease: 'easeInOut' } as const,
                })}
            className="absolute inset-auto z-20 h-0.5 w-[30rem] -translate-y-[7rem] bg-[var(--c-accent)]"
          />

          {/* Tapa superior: oculta lo que quede por encima del tubo. */}
          <div className="absolute inset-auto z-20 h-44 w-full -translate-y-[12.5rem] bg-[var(--c-bg-to)]" />
        </div>
      </div>

      {/* Contenido: flujo normal bajo la lámpara, sin compensaciones mágicas. */}
      <div className="relative z-30 mx-auto flex w-full max-w-3xl flex-col items-center px-5 pt-[9rem] pb-32 text-center sm:pt-[13rem]">
        {children}
      </div>
    </div>
  );
};
