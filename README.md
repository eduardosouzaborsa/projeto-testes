# ServeRest API Automation - SDET Architecture

Projeto de automação de testes de API REST construído sobre a plataforma [ServeRest](https://serverest.dev), utilizando práticas modernas de engenharia de qualidade de software (SDET).

---

## Tecnologias Utilizadas

* **Linguagem:** [TypeScript](https://www.typescriptlang.org/)
* **Test Runner / HTTP Client:** [Playwright Test (API Module)](https://playwright.dev/)
* **Geração Dinâmica de Massa:** [@faker-js/faker](https://fakerjs.dev/)
* **Validação de Contrato (Schema):** [Zod](https://zod.dev/)
* **Padronização e Qualidade Estática:** [ESLint](https://eslint.org/) e [Prettier](https://prettier.io/)
* **Variáveis de Ambiente:** [Dotenv](https://github.com/motdotla/dotenv)

---

## Padrões de Arquitetura e Engenharia de QA

O projeto adota princípios de Clean Code e separação estrita de responsabilidades:

* **Service Object Pattern (API Clients):** Chamadas HTTP, rotas e cabeçalhos ficam centralizados em classes de serviço (`src/services/`), mantendo os testes limpos, declarativos e focados na regra de negócio.
* **Data Factory Pattern & Isolamento Total de Testes:** Não há dependência de dados estáticos ou pré-existentes. Toda massa de dados (usuários, produtos, senhas) é gerada dinamicamente via `src/factories/` com o Faker.
* **Contract Testing (JSON Schema):** Validação estrita de contratos via Zod (`src/schemas/`), garantindo integridade de tipos e regras estruturais do payload além de meros status codes HTTP.
* **Request Chaining & Autenticação JWT:** Cenários End-to-End cobrindo a jornada real: criação de usuário admin -> login -> extração de token JWT -> cadastro de produto autenticado.

---

## Estrutura do Projeto

```text
projeto-testes/
├── src/
│   ├── factories/          # Fábricas de dados dinâmicos (Faker)
│   │   ├── usuarioFactory.ts
│   │   └── produtoFactory.ts
│   ├── schemas/            # Contratos e validação de schema (Zod)
│   │   └── loginSchema.ts
│   └── services/           # Clientes de API (Service Object Pattern)
│       ├── usuarioService.ts
│       ├── loginService.ts
│       └── produtoService.ts
├── tests/
│   └── api/                # Suítes de teste (especificações .spec.ts)
│       ├── usuarios.spec.ts
│       ├── login.spec.ts
│       ├── cadastrar-usuario.spec.ts
│       ├── jornada-produto.spec.ts
│       └── contrato-login.spec.ts
├── .env.example            # Exemplo de configuração de variáveis
├── playwright.config.ts    # Configurações centrais do Playwright
└── package.json            # Scripts e dependências
```

---

## Como Executar o Projeto

### Pré-requisitos
* Node.js (v20+ recomendado)
* npm

### 1. Clonar o repositório e instalar dependências
```bash
git clone <URL_DO_SEU_REPOSITORIO>
cd projeto-testes
npm install
```

### 2. Configurar o ambiente
Crie um arquivo `.env` na raiz baseado no exemplo:
```bash
cp .env.example .env
```
*(Por padrão, aponta para `BASE_URL=https://serverest.dev`).*

### 3. Execução dos Testes
```bash
# Executa todos os testes no terminal
npm test

# Executa e abre o relatório HTML interativo
npm run test:report
```

### 4. Qualidade de Código (Lint & Format)
```bash
# Formata todo o código com Prettier
npm run format

# Executa a análise estática com ESLint
npm run lint
```
