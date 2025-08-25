import { Onoper } from './index';

const onoper = new Onoper();

// 1. Gerar o conteúdo HTML
const htmlContent = onoper.execute(`
[onoper_solucao]Onoper - A Solução do Usuário para Visualização
  Problemas Atuais (Bugs Identificados)
    Input Textarea: cresce excessivamente, obscurecendo o chat
  [ui_solucoes]Soluções Propostas/Implementadas (UI/UX)
    [input_textarea_solucao]Input Textarea
      Limitar altura a 8 linhas, adicionar barra de rolagem
      Botão flutuante (abrir/fechar) no canto inferior direito
      Mecanismo de feedback para > 8 linhas
        Apitar/piscar para alertar sobre expansão
    Itens Longos
      Permitir expansão até 5 linhas
      Objetivo: nome do item com no máximo 1 ou 2 linhas
    Resposta LLM
      Exibição em drawer lateral (metade da página)
`) || 
"<h1>Erro ao processar o documento</h1>";

const baseHtml = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Onoper Document</title>
</head>
<body style="margin: 0; padding: 0; width: 100vw; height: 100vh; overflow: hidden;">
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