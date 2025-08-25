import { Onoper } from './index';

const onoper = new Onoper();

// 1. Gerar o conteúdo HTML
const htmlContent = onoper.execute(`
- [organizar_pensamentos] Organizar Pensamentos com LLM
- Este é o objetivo principal do projeto: usar LLMs para estruturar ideias.Este é o objetivo principal do projeto: usar LLMs para estruturar ideias.
- [capturar_ideias] Capturar Ideias Iniciais
  # O usuário insere seus pensamentos brutos, anotações, rascunhos, etc.
  ! Pensamentos podem estar desorganizados ou incompletos nesta fase.
- [processar_llm] Processar Ideias com LLM
  # O LLM analisa e interpreta as informações fornecidas pelo usuário.
- [gerar_estrutura] Gerar Estrutura e Tópicos
  # O LLM apresenta as ideias de forma organizada, como tópicos, seções, resumos ou planos de ação.
- [revisar_ajustar] Revisar e Ajustar
  # O usuário avalia a saída do LLM, faz modificações, adiciona detalhes ou refina a estrutura.
  > capturar_ideias
  # Pode ser necessário voltar para refinar as ideias iniciais ou adicionar mais detalhes com base na estrutura gerada.
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