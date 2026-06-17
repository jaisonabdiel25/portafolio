// Acceso tipado y VALIDADO a los datos del portafolio.
// El JSON (`portfolio.json`) es la fuente de verdad; aquí se valida con zod en
// tiempo de build/carga para detectar errores de datos (campos faltantes,
// `type` o categoría inválidos…) en vez de fallar silenciosamente en runtime.
import { z } from 'zod';
import raw from './portfolio.json';
import type { PortfolioData } from '../types/portfolio';

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

const portfolioSchema = z.object({
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

const parsed = portfolioSchema.safeParse(raw);
if (!parsed.success) {
  throw new Error(
    `portfolio.json no cumple el esquema esperado:\n${z.prettifyError(parsed.error)}`
  );
}

// El esquema refleja `PortfolioData`; el cast es seguro tras validar.
export const portfolio = parsed.data as PortfolioData;
