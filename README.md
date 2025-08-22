# Onoper - Core Language

Este repositório contém a **implementação da linguagem Onoper**, um núcleo de processamento para transformar documentos em representações estruturadas e visuais. O Onoper foi projetado como uma **Linguagem de Domínio Específico (DSL)** para mapear e documentar processos de negócio de forma simples e intuitiva.

O core da linguagem é a fundação para ferramentas de produtividade, como o editor em overlay, que permite capturar fluxos de trabalho e gargalos em tempo real, sem interromper as tarefas diárias.

---

O que é Onoper?
Onoper usa uma sintaxe minimalista baseada em **indentação** para definir a hierarquia de um fluxo de trabalho. Com o uso de metacaracteres simples, é possível identificar diferentes tipos de passos:

* **Passos (`step`)**: Uma tarefa simples no fluxo.

* **Gargalos (`complaint`, `!`)**: Problemas ou pontos de atrito no processo.

* **Referências (`reference`, `>`)**: Conexões a outros fluxos ou documentos.

* **Comentários (`comment`, `#`)**: Anotações internas para o desenvolvedor.

A simplicidade da linguagem permite que qualquer pessoa, de analistas de negócio a desenvolvedores, possa ler, escrever e entender um fluxo de trabalho em texto puro.

---

Status do Projeto e Próximos Passos
Este repositório contém o **Lexer** e o **Parser** da linguagem Onoper. O Lexer é responsável por transformar o texto em tokens, e o Parser constrói uma **Árvore de Sintaxe Abstrata (AST)** que representa a estrutura do fluxo.

Nossos próximos passos incluem a construção de:

- Uma representação visual para a AST.

- Um editor para a linguagem.

- O editor em overlay, que é o objetivo final do projeto.

---

Como Começar
Para começar a explorar o core da linguagem Onoper, clone este repositório e instale as dependências:

```bash
git clone https://github.com/unoper/core.git
cd core
bun install
```

Uso
Para executar o core da linguagem e testar a análise de um arquivo, use o seguinte comando:

```bash
bun run src/index.ts
```

Documentação
A documentação detalhada sobre a sintaxe, semântica e exemplos de uso está disponível na pasta docs.

Contribuições
Contribuições, ideias e feedback são muito bem-vindos! Se você se interessou pela linguagem ou pela ferramenta, por favor, leia o nosso CONTRIBUTING.md para saber como participar.

Licença
Este projeto é licenciado sob a Licença Apache 2.0. Consulte o arquivo LICENSE para mais detalhes.

Contato
Para perguntas, dúvidas ou problemas, sinta-se à vontade para abrir uma issue no GitHub.