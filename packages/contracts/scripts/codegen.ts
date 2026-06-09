import { execSync } from 'node:child_process';
import { existsSync, mkdirSync } from 'node:fs';
import { resolve } from 'node:path';

const ROOT = resolve(import.meta.dirname, '..');
const GENERATED = resolve(ROOT, 'generated');

function ensureDir(dir: string): void {
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }
}

function generateRestTypes(): void {
  console.log('📦 Generating REST types from OpenAPI specs...');
  const restDir = resolve(GENERATED, 'rest');
  ensureDir(restDir);

  const specs = ['product', 'user', 'subscription', 'cart', 'loyalty', 'education', 'admin'];

  for (const spec of specs) {
    const specPath = resolve(ROOT, `openapi/${spec}.yaml`);
    if (existsSync(specPath)) {
      const outPath = resolve(restDir, `${spec}.ts`);
      execSync(`npx openapi-typescript ${specPath} -o ${outPath}`, { stdio: 'inherit' });
      console.log(`  ✅ ${spec}.yaml → ${spec}.ts`);
    }
  }
}

function generateEventTypes(): void {
  console.log('📦 Generating event types from Avro schemas...');
  const eventsDir = resolve(GENERATED, 'events');
  ensureDir(eventsDir);
  // Avro type generation will be configured when avro-ts is added
  console.log('  ⏭️ Avro generation — placeholder (requires avro-ts setup)');
}

function generateIndex(): void {
  console.log('📦 Generating barrel exports...');
  const indexContent = `// Auto-generated — do not edit manually
// Run \`pnpm turbo codegen\` to regenerate

export * from './rest/product.js';
// Additional exports added as services are created
`;
  const { writeFileSync } = require('node:fs');
  writeFileSync(resolve(GENERATED, 'index.ts'), indexContent);
  console.log('  ✅ index.ts generated');
}

async function main(): Promise<void> {
  console.log('🚀 Matcha Contract Code Generation\n');
  ensureDir(GENERATED);

  generateRestTypes();
  generateEventTypes();
  generateIndex();

  console.log('\n✅ Code generation complete!');
}

main().catch(console.error);
