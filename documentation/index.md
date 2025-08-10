## Documentação “Onoper” (Regras da linguagem)

``` onoper
#Uso comum

version: 1
level_size: 2

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

`version` (opcional): Representa a versão do "onoper" que está sendo executada na visualização.
`level_size` (opcional): Representa a quantidade de espaços ou o tamanho do `tab` para a identação.

1. O que separa os elementos são quebras de linha `\n`.
2. A estrutura da linguagem é feita em cascata com base na indentação.
    
    ``` onoper
    Parent # -----------| sem ligação.
    	Child # ----------| ligado a `parent`
    		! Reclamação # -| ligado a `child`
    		    #           |
    	Child 2 # --------| ligado a `parent`
    	Child 3 # --------| ligado a `parent`
    		> Parent 3 # ---| ligado a `child 3` e referenciado a `parent 3`
    Parent 2 # ---------| sem ligação.
             #          |
    Parent 3 # ---------| sem ligação. 
    ```
    
3. `!` antes de um texto implica que essa é uma reclamação atrelada a um "passo" responsável.
4. `>` antes de um texto implica que o "passo" responsável leva diretamente a outro "passo".
5. `#` antes de um texto implica que esse texto é um comentário, ele não deve aparecer na visualização, mas pode ser útil para o desenvolvedor.
6. `version` e `level_size` são opcionais, mas se estiverem presentes, devem ser a primeira linha do arquivo.
7. A linguagem é sensível a espaços, então a indentação deve ser consistente.
8. A linguagem é baseada em blocos, onde cada bloco é definido por sua indentação.
9. textos simples sem nenhum prefixo são considerados "passos" ou "tarefas" que devem ser executadas.