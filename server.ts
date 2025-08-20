import { Onoper } from './src/index';

const onoper = new Onoper();

// 1. Gerar o conteúdo HTML
const htmlContent = onoper.execute(`
version: 1
ident: 4

Onboarding cliente
[test2]Coletar Docs
  ! Cliente não envia docs
Suporte
  [test]Receber chamado
  Finalizar chamado
`) || "<h1>Erro ao processar o documento</h1>";

const baseHtml = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Onoper Document</title>
</head>
<body>
    ${htmlContent}
</body>
</html>`;

// 2. Configurar e iniciar o servidor
const server = Bun.serve({
  port: 3000, // Pode usar 0 para porta aleatória
  hostname: 'localhost',
  fetch(req) {
    return new Response(baseHtml, {
      headers: { 'Content-Type': 'text/html' },
    });
  },
});

console.log(`Servidor rodando em http://${server.hostname}:${server.port}`);