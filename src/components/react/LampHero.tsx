import { motion, useReducedMotion } from 'framer-motion';
import { LampContainer } from '@/components/ui/lamp';

type Props = {
  /** Nombre a mostrar como titular principal. */
  name: string;
  /** Rol profesional ya localizado (calculado en Astro). */
  role: string;
};

/**
 * Hero minimalista con efecto "lamp": un titular animado (nombre + rol) que
 * emerge bajo la luz de la lámpara. Es una isla React autocontenida porque la
 * animación `motion.h1` debe ejecutarse en el cliente.
 */
export default function LampHero({ name, role }: Props) {
  const reduce = useReducedMotion();

  return (
    <LampContainer>
      <motion.h1
        initial={reduce ? false : { opacity: 0.5, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8, ease: 'easeInOut' }}
        className="mt-8 bg-gradient-to-br from-[var(--c-fg)] to-[var(--c-accent)] bg-clip-text py-4 text-center font-display text-4xl font-bold tracking-tight text-transparent md:text-7xl"
      >
        {name}
      </motion.h1>
      <motion.p
        initial={reduce ? false : { opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8, ease: 'easeInOut' }}
        className="max-w-2xl text-center font-display text-lg font-medium text-muted sm:text-2xl"
      >
        {role}
      </motion.p>
    </LampContainer>
  );
}
