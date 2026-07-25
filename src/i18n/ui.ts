// Textos de la interfaz (no de datos personales). Editar aquí las etiquetas
// de navegación, títulos de sección, botones y aria-labels en cada idioma.
import type { Lang } from '../types/portfolio';

export const languages: Record<Lang, string> = {
  es: 'Español',
  en: 'English',
};

export const ui = {
  es: {
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

    // Los subtítulos son funcionales: dicen qué hacer, no repiten el título.
    'skills.subtitle': 'Cambia a la vista de lista para ver el detalle por categoría.',
    'skills.tab.icons': 'Iconos',
    'skills.tab.list': 'Lista',
    'skills.level': 'Nivel de dominio',

    'experience.now': 'Actual',

    'projects.subtitle': 'Filtra por categoría o abre cualquiera para ver el detalle.',
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

    'lang.switch': 'Cambiar idioma',
    'a11y.skip': 'Saltar al contenido',
    'footer.rights': 'Todos los derechos reservados.',
  },
  en: {
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

    'skills.subtitle': 'Switch to the list view for the breakdown by category.',
    'skills.tab.icons': 'Icons',
    'skills.tab.list': 'List',
    'skills.level': 'Proficiency',

    'experience.now': 'Present',

    'projects.subtitle': 'Filter by category, or open any one for the detail.',
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

    'lang.switch': 'Switch language',
    'a11y.skip': 'Skip to content',
    'footer.rights': 'All rights reserved.',
  },
} as const;

export type UIKey = keyof (typeof ui)['es'];
