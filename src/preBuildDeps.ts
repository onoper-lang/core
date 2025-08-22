import fs from "fs";
import path from "path";

const interactCode = fs.readFileSync(
  require.resolve('./renderer/core/scripts/interact.min.js'), 
  'utf8'
);

const arrowLineCode = fs.readFileSync(
  require.resolve('./renderer/core/scripts/arrow-line.min.js'), 
  'utf8'
);

// Gera um arquivo TypeScript com as dependências embutidas
const output = `
// Este arquivo é gerado automaticamente durante o build
export const DEPS_INTERACT_JS = ${JSON.stringify(interactCode)};
export const DEPS_ARROW_LINE = ${JSON.stringify(arrowLineCode)};
`;

fs.writeFileSync(path.join(__dirname, './renderer/core/scripts/embedded-deps.ts'), output);