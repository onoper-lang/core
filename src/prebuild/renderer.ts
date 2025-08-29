import fs from "fs";
import path from "path";

const logic = fs.readFileSync(
  require.resolve('./dist/entry.js'), 
  'utf8'
);

const style = fs.readFileSync(
  require.resolve('./dist/entry.css'), 
  'utf8'
);

const output = `
// Este arquivo é gerado automaticamente durante o build
export const DEP_LOGIC = ${JSON.stringify(logic)};
export const DEP_STYLE = ${JSON.stringify(style)};
`;

fs.writeFileSync(path.join(__dirname, '../renderer/bundle.ts'), output);