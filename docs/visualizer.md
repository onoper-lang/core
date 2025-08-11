# Visualizer

Este documento descreve como usar o visualizador para a linguagem Unoper, que permite criar representações visuais de documentos Unoper.

## Documentação “Onoper” (Regras da linguagem)

``` onoper
#Uso comum

version: 1
ident: 2

Onboarding cliente
  Coletar Docs
    ! Cliente não envia docs
  Criar conta
  Confirmar dados
    > Suporte

Suporte
  Receber chamado
    ! Processo manual demais
  Registrar ocorrência
```

## Visualização

1. **Leitura do Documento**: Primeiro, leio o documento Unoper fazendo uma divisão baseada em indentação. Cada nível de indentação representa uma hierarquia no documento.
2. **Análise de Elementos**: Em seguida, analiso cada linha para identificar se o elemento é um "passo" ou um "meta caracter".
3. **Criação de Nós**: Para cada elemento identificado, crio um nó na árvore sintática. Os nós podem ter filhos, dependendo da hierarquia do documento.
4. **Renderização**: Após a criação da árvore, converto-a em uma representação visual utilizando HTML e CSS. Cada nó é representado como um elemento visual, e as relações hierárquicas.
5. **Exibição**: Finalmente, mostro a representação visual ao usuário, através de HTML, onde cada nó é estilizado de acordo com seu nível de hierarquia e tipo.
