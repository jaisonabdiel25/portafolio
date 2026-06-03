// Tipos de la capa de datos del portafolio.
// La fuente de verdad es `src/data/portfolio.json`. Estos tipos garantizan
// que la UI consuma los datos de forma segura y facilitan una migración
// futura a Content Collections o un CMS sin tocar las secciones.

/** Texto traducible: una cadena por idioma soportado. */
export type Localized = {
  es: string;
  en: string;
};

export type Lang = 'es' | 'en';

export type Social = {
  /** Identificador de la red: github | linkedin | twitter | instagram | email | website ... */
  platform: string;
  url: string;
  label?: string;
};

export type Highlight = {
  value: string;
  label: Localized;
};

export type Skill = {
  name: string;
  /** Nivel de dominio 0–100. Determina el tamaño del icono en la nube
   *  (mayor nivel → icono más grande). */
  level?: number;
  /** Slug de simple-icons (p. ej. "react", "nodedotjs"). Si está presente,
   *  la habilidad se muestra con su logo de marca en la nube de tecnologías. */
  slug?: string;
};

export type SkillCategory = {
  category: Localized;
  /** Nombre de icono opcional (Lucide). */
  icon?: string;
  items: Skill[];
};

export type ExperienceItem = {
  role: Localized;
  company: string;
  /** Año o fecha de inicio (texto libre, p. ej. "2022"). Opcional: las
   *  entradas de formación pueden tener solo año de finalización. */
  start?: string;
  /** Año o fecha de fin, o "actual"/"present". */
  end: string;
  type: 'work' | 'education';
  description: Localized;
  /** Tecnologías o etiquetas asociadas. */
  tags?: string[];
};

export type Project = {
  /** Identificador estable, usado como key y ancla del modal. */
  id: string;
  title: string;
  description: Localized;
  /** Descripción larga opcional para el modal de detalle. */
  longDescription?: Localized;
  /** Categoría para el filtro: web | app | api | ui | other. */
  category: string;
  tags: string[];
  /** Ruta de la imagen (en /public) o vacío para usar un placeholder. */
  image?: string;
  repo?: string;
  demo?: string;
  featured?: boolean;
};

export type Profile = {
  name: string;
  role: Localized;
  tagline: Localized;
  location: string;
  email: string;
  /** Ruta del avatar en /public/images. */
  avatar?: string;
  /** CV por idioma (rutas en /public). */
  resume?: Localized;
  socials: Social[];
};

export type About = {
  paragraphs: Localized[];
  highlights: Highlight[];
};

export type Contact = {
  heading: Localized;
  text: Localized;
};

export type PortfolioData = {
  profile: Profile;
  about: About;
  skills: SkillCategory[];
  experience: ExperienceItem[];
  projects: Project[];
  contact: Contact;
};
