// Esquema zod compartido de los datos del portafolio.
// Fuente única de la validación: lo reutilizan el loader
// (`src/data/portfolio.ts`, que lee de MongoDB) y el script de semilla
// (`scripts/seed-portfolio.mjs`). Mantener este esquema alineado con
// `src/types/portfolio.ts`.
import { z } from 'zod';

const localized = z.object({ es: z.string(), en: z.string() });

const social = z.object({
  platform: z.string(),
  url: z.string(),
  label: z.string().optional(),
});

const skill = z.object({
  name: z.string(),
  level: z.number().optional(),
  slug: z.string().optional(),
});

export const portfolioSchema = z.object({
  profile: z.object({
    name: z.string(),
    role: localized,
    tagline: localized,
    location: z.string(),
    email: z.string(),
    avatar: z.string().optional(),
    resume: localized.optional(),
    socials: z.array(social),
  }),
  about: z.object({
    paragraphs: z.array(localized),
    highlights: z.array(z.object({ value: z.string(), label: localized })),
  }),
  skills: z.array(
    z.object({
      category: localized,
      icon: z.string().optional(),
      items: z.array(skill),
    })
  ),
  experience: z.array(
    z.object({
      role: localized,
      company: z.string(),
      start: z.string().optional(),
      end: z.string(),
      type: z.enum(['work', 'education']),
      description: localized,
      tags: z.array(z.string()).optional(),
    })
  ),
  projects: z.array(
    z.object({
      id: z.string(),
      title: z.string(),
      description: localized,
      longDescription: localized.optional(),
      category: z.string(),
      tags: z.array(z.string()),
      image: z.string().optional(),
      repo: z.string().optional(),
      demo: z.string().optional(),
      featured: z.boolean().optional(),
    })
  ),
  contact: z.object({ heading: localized, text: localized }),
});
