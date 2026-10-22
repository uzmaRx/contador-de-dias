# Contador de Dias

Motor de datas e feriados nacionais brasileiros, criado em JavaScript puro. Nesta etapa, o projeto não contém páginas, banco de dados, login ou framework web.

## Requisitos

- Node.js 22 ou mais recente
- npm
- Git

## Instalação

No terminal, dentro da pasta do projeto, execute:

```powershell
npm.cmd install
```

O comando instala somente as ferramentas de desenvolvimento listadas em `package.json`.

## Testes

Para executar todos os testes uma vez:

```powershell
npm.cmd test
```

Para repetir os testes automaticamente enquanto os arquivos são alterados:

```powershell
npm.cmd run test:watch
```

## Organização

```text
src/lib/             Módulos reutilizáveis do motor de datas e feriados
tests/               Testes automatizados do motor
PRD.md               Requisitos do produto
package.json         Comandos e dependências de desenvolvimento
```

As funções do motor são puras: não acessam rede, banco de dados, relógio do computador ou armazenamento. Datas são representadas como objetos `{ year, month, day }`, sem horário ou fuso horário.

## Escopo atual

- **Fase 0:** configuração do projeto, Git, Vitest e documentação.
- **Fase 1:** motor de datas e regras de feriados brasileiros.

As páginas do site e a integração com WordPress serão tratadas somente em fases futuras.

