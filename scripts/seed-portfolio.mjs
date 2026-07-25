// Semilla (uso único): sube el contenido de `src/data/portfolio.json` a MongoDB
// como el documento { key: 'portfolio' } de la colección `content`.
//
// Uso:  npm run seed        (carga las variables de .env con --env-file)
//
// Es idempotente: hace upsert, así que puede ejecutarse varias veces sin
// duplicar el documento. Una vez sembrado y verificado, `portfolio.json` puede
// eliminarse del repo (MongoDB queda como única fuente de verdad).
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { MongoClient } from 'mongodb';
import { portfolioSchema } from '../src/data/portfolio.schema.ts';

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB || 'portfolio';

if (!uri) {
  console.error('Falta MONGODB_URI. Crea un fichero .env (ver .env.example).');
  process.exit(1);
}

const jsonUrl = new URL('../src/data/portfolio.json', import.meta.url);

let raw;
try {
  raw = JSON.parse(await readFile(fileURLToPath(jsonUrl), 'utf8'));
} catch (err) {
  console.error(`No se pudo leer src/data/portfolio.json: ${err.message}`);
  console.error('Si ya lo eliminaste, la semilla ya no es necesaria.');
  process.exit(1);
}

const parsed = portfolioSchema.safeParse(raw);
if (!parsed.success) {
  console.error('portfolio.json no cumple el esquema esperado:');
  console.error(JSON.stringify(parsed.error.issues, null, 2));
  process.exit(1);
}

const client = new MongoClient(uri);
try {
  await client.connect();
  const result = await client
    .db(dbName)
    .collection('content')
    .updateOne(
      { key: 'portfolio' },
      { $set: { key: 'portfolio', ...parsed.data } },
      { upsert: true }
    );

  const action = result.upsertedCount ? 'insertado' : 'actualizado';
  console.log(`✓ Documento { key: 'portfolio' } ${action} en ${dbName}.content`);
} finally {
  await client.close();
}
