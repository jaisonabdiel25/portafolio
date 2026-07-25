// Acceso tipado y VALIDADO a los datos del portafolio.
// La fuente de verdad es MongoDB: el documento `{ key: 'portfolio' }` de la
// colección `content`. Se lee UNA vez en tiempo de build (top-level await;
// ESM cachea el módulo, así que varias secciones que lo importen comparten la
// misma lectura) y se valida con zod para detectar errores de datos (campos
// faltantes, `type` o categoría inválidos…) en vez de fallar en runtime.
import { MongoClient } from 'mongodb';
import { z } from 'zod';
import { MONGODB_URI, MONGODB_DB } from 'astro:env/server';
import { portfolioSchema } from './portfolio.schema';
import type { PortfolioData } from '../types/portfolio';

async function loadPortfolio(): Promise<PortfolioData> {
  const client = new MongoClient(MONGODB_URI);
  let doc: Record<string, unknown> | null;
  try {
    await client.connect();
    doc = await client
      .db(MONGODB_DB)
      .collection('content')
      .findOne({ key: 'portfolio' });
  } finally {
    await client.close();
  }

  if (!doc) {
    throw new Error(
      "No se encontró el documento { key: 'portfolio' } en la colección 'content'. " +
        'Ejecuta `npm run seed` para poblar MongoDB.'
    );
  }

  // Descartar los campos propios de Mongo antes de validar el contenido.
  const { _id, key, ...raw } = doc;

  const parsed = portfolioSchema.safeParse(raw);
  if (!parsed.success) {
    throw new Error(
      `Los datos de MongoDB no cumplen el esquema esperado:\n${z.prettifyError(parsed.error)}`
    );
  }

  // El esquema refleja `PortfolioData`; el cast es seguro tras validar.
  return parsed.data as PortfolioData;
}

export const portfolio = await loadPortfolio();
