// Acceso tipado a los datos del portafolio.
// Importa `portfolio` desde aquí en cualquier componente para obtener
// autocompletado y seguridad de tipos sobre el JSON.
import raw from './portfolio.json';
import type { PortfolioData } from '../types/portfolio';

export const portfolio = raw as unknown as PortfolioData;
