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
src/lib/calendar.js  Validação e aritmética interna de datas sem horário
src/lib/dates.js     API pública de cálculos corridos e úteis
src/lib/holidays.js  Regras nacionais, pontos facultativos e Páscoa
src/lib/format.js    Formatação determinística em português do Brasil
tests/               Testes automatizados, incluindo os casos do PRD
PRD.md               Requisitos do produto
package.json         Comandos e dependências de desenvolvimento
```

As funções do motor são puras: não acessam rede, banco de dados, relógio do computador ou armazenamento. Datas são representadas como objetos `{ year, month, day }`, sem horário ou fuso horário.

## API do motor

Os módulos oferecem funções para:

- validar, ordenar, formatar, somar e comparar datas;
- contar dias corridos e dias úteis entre duas datas;
- somar ou subtrair dias úteis;
- gerar feriados nacionais e pontos facultativos para qualquer ano entre 1900 e 2100;
- contar dias úteis de um mês.

Por decisão do produto, Carnaval (segunda e terça-feira) e Corpus Christi podem ser excluídos como dias inteiros. A Quarta-feira de Cinzas continua sendo dia útil e aparece somente como nota informativa, pois o ponto facultativo termina às 14h.

## Escopo atual

- **Fase 0:** configuração do projeto, Git, Vitest e documentação.
- **Fase 1:** motor de datas e regras de feriados brasileiros.

As páginas do site e a integração com WordPress serão tratadas somente em fases futuras.
