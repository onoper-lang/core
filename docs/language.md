# Documentação “Onoper” (Regras da linguagem)

O que é o Onoper? onoper é uma linguagem de marcação que tem como objetivo tornar listas em algo visual.

## Estrutura

O onoper segue uma estrutura simples de listas (inclusive são lincadas em sequência por padrão), mas tem alguns metacaracteres para específicos para executar certas funcionalidades.

1. O que separa os elementos são quebras de linha `\n`.

2. A estrutura da linguagem é feita em cascata com base na indentação.
    
``` onoper
  - [id_parent] Parent --|
  Parent2 ---------------|
    Child ---------------|
      ! Problema --------|
      # Comentário ------|
  [id_parent2] Parent3 --|
    > id_parent ---------|
```

## Metacaracteres

Existem alguns tipos de metacaracteres na linguagem, eles são classificados como metacaracteres de elemento, atributo e configuração, cada um deles tem um padrão de sintaxe e executa um tipo de ação na compilação final.

### Configuração

- `version`: Utilizado para descrever a versão que essa lista esta sendo feita, isso vai ser utilizado pelo compilador para decidir qual regra ele deve usar para fazer a compilação, já que ao longo do tempo o formato da escrita pode ir se adaptando.
  - value: Number
  - required: False

- `ident`: O onoper é uma linguagem de identação forte, ou seja a quantidade de espaços no começo de cada linha precisa ser padronizada já que é essa identação que o compilador vai usar para atribuir os outros metacaracteres aos seus devidos elementos, bem como reconhecer os parents de cada elemento.
  - value: Number
  - required: False

### Elementos

- `- `: Esse metacaracter se chama `item` e é utilizado para descrever um item da lista, você precisa ter no mínimo 1 item na lista.
  - value: String
  - required: true
  - attribute: ID
    - `[<id>]`: O atributo ID é utilizado entre o value e o indentificador, ele serve para identificar um item específico e pode ser utilizado em conjunto de outros metacaracteres como o `> <id>`.
  - rules: Textos simples sem nenhum identificador são considerados `item`

- `> `: Esse metacaracter se chama `link` e é utilizado para conectar 2 ou mais `item` através do atributo ID.
  - value: `<id>`
  - required: false
  - rules: Por obrigação um `link` deve sempre ser filho de algum `item`

- `! `: Esse metacaracter se chama `claim` e é utilizado para adicionar pontos negativos para um item específico.
  - value: String
  - required: false
  - rules: Por obrigação um `claim` deve sempre ser filho de algum `item`

- `# `: Esse metacaracter se chama `comment` e é utilizado para adicionar comentários para um item específico.
  - value: String
  - required: false
  - rules: Por obrigação um `comment` deve sempre ser filho de um `item`

## Exemplos

``` onoper
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

``` onoper
[c_i_i]Capturar Ideias Iniciais
  ! Pensamentos desorganizados
Processar Ideias com LLM
  Gerar Estrutura
  Identificar Tópicos Chave
  Sugerir Próximos Passos
Apresentar Ideias Organizadas
  Revisar e Ajustar
  > c_i_i
  # Para refinar ou adicionar mais detalhes
```
