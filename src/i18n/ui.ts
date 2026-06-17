// Textos de la interfaz (no de datos personales). Editar aquí las etiquetas
// de navegación, títulos de sección, botones y aria-labels en cada idioma.
import type { Lang } from '../types/portfolio';

export const languages: Record<Lang, string> = {
  es: 'Español',
  en: 'English',
};

export const ui = {
  es: {
    'nav.home': 'Inicio',
    'nav.about': 'Sobre mí',
    'nav.skills': 'Habilidades',
    'nav.experience': 'Experiencia',
    'nav.projects': 'Proyectos',
    'nav.contact': 'Contacto',

    'hero.cta.projects': 'Ver proyectos',
    'hero.cta.contact': 'Contáctame',
    'cta.resume': 'Descargar CV',
    'hero.scroll': 'Desplázate',

    'section.about': 'Sobre mí',
    'section.skills': 'Habilidades',
    'section.experience': 'Experiencia',
    'section.projects': 'Proyectos',
    'section.contact': 'Contacto',

    'skills.subtitle': 'Tecnologías y herramientas con las que trabajo',
    'skills.tab.icons': 'Iconos',
    'skills.tab.list': 'Lista',

    'experience.now': 'Actual',
    'experience.type.work': 'Trabajo',
    'experience.type.education': 'Formación',

    'projects.subtitle': 'Una selección de cosas que he construido',
    'projects.filter.all': 'Todos',
    'projects.featured': 'Destacado',
    'projects.viewRepo': 'Código',
    'projects.viewDemo': 'Demo',
    'projects.details': 'Ver detalles',
    'projects.close': 'Cerrar',
    'projects.empty': 'No hay proyectos en esta categoría.',

    'contact.copy': 'Copiar email',
    'contact.copied': '¡Copiado!',
    'contact.write': 'Escríbeme',

    'theme.toggle': 'Cambiar tema',
    'lang.switch': 'Cambiar idioma',
    'footer.rights': 'Todos los derechos reservados.',
    'footer.builtWith': 'Construido con Astro, React y Tailwind.',
  },
  en: {
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.skills': 'Skills',
    'nav.experience': 'Experience',
    'nav.projects': 'Projects',
    'nav.contact': 'Contact',

    'hero.cta.projects': 'View projects',
    'hero.cta.contact': 'Get in touch',
    'cta.resume': 'Download CV',
    'hero.scroll': 'Scroll',

    'section.about': 'About me',
    'section.skills': 'Skills',
    'section.experience': 'Experience',
    'section.projects': 'Projects',
    'section.contact': 'Contact',

    'skills.subtitle': 'Technologies and tools I work with',
    'skills.tab.icons': 'Icons',
    'skills.tab.list': 'List',

    'experience.now': 'Present',
    'experience.type.work': 'Work',
    'experience.type.education': 'Education',

    'projects.subtitle': 'A selection of things I have built',
    'projects.filter.all': 'All',
    'projects.featured': 'Featured',
    'projects.viewRepo': 'Code',
    'projects.viewDemo': 'Demo',
    'projects.details': 'View details',
    'projects.close': 'Close',
    'projects.empty': 'No projects in this category.',

    'contact.copy': 'Copy email',
    'contact.copied': 'Copied!',
    'contact.write': 'Write me',

    'theme.toggle': 'Toggle theme',
    'lang.switch': 'Switch language',
    'footer.rights': 'All rights reserved.',
    'footer.builtWith': 'Built with Astro, React and Tailwind.',
  },
} as const;

export type UIKey = keyof (typeof ui)['es'];
