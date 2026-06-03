// Utilidades de internacionalización.
// - `getLangFromUrl` deduce el idioma de la ruta (/ = es, /en/ = en).
// - `useTranslations` devuelve un `t(key)` para los textos de interfaz.
// - `loc` resuelve un campo `{ es, en }` de los datos al idioma activo.
// - `localizePath` genera el enlace equivalente en el otro idioma.
import { ui } from './ui';
import type { Lang, Localized } from '../types/portfolio';

export const defaultLang: Lang = 'es';
export const locales: Lang[] = ['es', 'en'];

/** Deduce el idioma a partir de la URL actual. */
export function getLangFromUrl(url: URL): Lang {
  const [, segment] = url.pathname.split('/');
  if (segment === 'en') return 'en';
  return defaultLang;
}

/** Devuelve una función `t` para traducir claves de la interfaz. */
export function useTranslations(lang: Lang) {
  return function t(key: keyof (typeof ui)['es']): string {
    return ui[lang][key] ?? ui[defaultLang][key];
  };
}

/** Resuelve un campo localizado de los datos al idioma activo. */
export function loc(field: Localized | string, lang: Lang): string {
  if (typeof field === 'string') return field;
  return field[lang] ?? field[defaultLang];
}

/**
 * Construye la ruta equivalente en `target` preservando el resto del path.
 * `/` (es) <-> `/en/` (en), `/#proyectos` <-> `/en/#proyectos`, etc.
 */
export function localizePath(pathname: string, target: Lang): string {
  // Quita el prefijo de idioma existente.
  let clean = pathname.replace(/^\/en(?=\/|$)/, '');
  if (clean === '') clean = '/';
  if (target === 'en') {
    return clean === '/' ? '/en/' : `/en${clean}`;
  }
  return clean;
}
