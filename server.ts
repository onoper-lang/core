import DocumentVisualizer from './src';

const visualizer = new DocumentVisualizer();

// 1. Gerar o conteúdo HTML
const htmlContent = visualizer.execute(`
version: 1
ident: 4

Onboarding cliente
    Coletar Docs
        ! Cliente não envia docs
Suporte
    Receber chamado
`) || "<h1>Erro ao processar o documento</h1>";

// 2. Configurar e iniciar o servidor
const server = Bun.serve({
  port: 3000, // Pode usar 0 para porta aleatória
  hostname: 'localhost',
  fetch(req) {
    return new Response(htmlContent, {
      headers: { 'Content-Type': 'text/html' },
    });
  },
});

console.log(`Servidor rodando em http://${server.hostname}:${server.port}`);