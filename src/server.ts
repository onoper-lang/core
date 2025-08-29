import { Onoper } from './index';

const onoper = new Onoper();

// 1. Gerar o conteúdo HTML
const htmlContent = onoper.execute(`
Agente Multi-Fonte AI
Processo de Prebuild de Dados
  Acessar Bancos de Dados
  Resumir Informações do BD
  Salvar Resumos em Arquivos
Fluxo de Resposta
  Buscar em RAG de Arquivos
    # Utiliza busca semântica devido à dificuldade de classificação manual.
    ! Critério para "não ser capaz de responder" precisa ser definido.
  Se RAG não responder
    Verificar Bancos de Dados
      # Utiliza os resumos gerados no prebuild para entender o conteúdo dos BDs.
      ! Como decidir qual BD consultar?
  Se BDs não responderem
    Buscar na Internet via CURL
      # Última opção de busca.
      ! Como formular a query de busca para sites como o Google?
      ! Como parsear o HTML/JSON retornado pelo CURL?
      ! Necessidade de aprovação para CURL de busca na internet?
      Se usuário fornecer link
        Acessar link diretamente
      Se não houver link
        Acessar sites comuns (ex: Google)
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