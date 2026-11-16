# ServeRest Fullstack Test Automation - SDET Architecture

Projeto completo de automação de testes de API REST e Interface Web (Front-End) construído sobre a plataforma [ServeRest](https://serverest.dev), utilizando práticas modernas de engenharia de qualidade de software (SDET).

---

## Tecnologias Utilizadas

* **Linguagem:** [TypeScript](https://www.typescriptlang.org/)
* **Test Runner & Automação Web/API:** [Playwright Test](https://playwright.dev/)
* **Geração Dinâmica de Massa:** [@faker-js/faker](https://fakerjs.dev/)
* **Validação de Contrato (Schema):** [Zod](https://zod.dev/)
* **Padronização e Qualidade Estática:** [ESLint](https://eslint.org/) e [Prettier](https://prettier.io/)
* **Variáveis de Ambiente:** [Dotenv](https://github.com/motdotla/dotenv)
* **CI/CD:** [GitHub Actions](https://github.com/features/actions)

---

## Padrões de Arquitetura e Engenharia de QA

O projeto adota princípios de Clean Code e separação estrita de responsabilidades:

* **Page Object Model (POM) para Web UI:** Encapsulamento dos elementos visuais e ações de tela em classes de página (`src/pages/`), garantindo resiliência e facilidade de manutenção no Front-end.
* **API Seeding em Testes de UI:** Em vez de fluxos manuais lentos de cadastro pela interface, o usuário é gerado e provisionado em milissegundos via API antes do teste de tela, acelerando drasticamente o tempo de execução.
* **Service Object Pattern (API Clients):** Chamadas HTTP, rotas e cabeçalhos ficam centralizados em classes de serviço (`src/services/`), mantendo os testes limpos, declarativos e focados na regra de negócio.
* **Data Factory Pattern & Isolamento Total de Testes:** Não há dependência de dados estáticos ou pré-existentes. Toda massa de dados (usuários, produtos, senhas) é gerada dinamicamente via `src/factories/` com o Faker.
* **Contract Testing (JSON Schema):** Validação estrita de contratos via Zod (`src/schemas/`), garantindo integridade de tipos e regras estruturais do payload além de meros status codes HTTP.
* **Integração Contínua (CI/CD):** Pipeline configurada no GitHub Actions que instala navegadores, valida o linter e executa todas as suítes (API + Web UI em modo headless), publicando relatórios de evidências a cada push.

---

## Estrutura do Projeto

```text
projeto-testes/
├── .github/
│   └── workflows/
│       └── ci.yml          # Pipeline de CI/CD (GitHub Actions)
├── src/
│   ├── factories/          # Fábricas de dados dinâmicos (Faker)
│   │   ├── usuarioFactory.ts
│   │   └── produtoFactory.ts
│   ├── pages/              # Page Object Model (Web UI)
│   │   └── loginPage.ts
│   ├── schemas/            # Contratos e validação de schema (Zod)
│   │   └── loginSchema.ts
│   └── services/           # Clientes de API (Service Object Pattern)
│       ├── usuarioService.ts
│       ├── loginService.ts
│       └── produtoService.ts
├── tests/
│   ├── api/                # Suítes de testes de API REST
│   │   ├── usuarios.spec.ts
│   │   ├── login.spec.ts
│   │   ├── cadastrar-usuario.spec.ts
│   │   ├── jornada-produto.spec.ts
│   │   └── contrato-login.spec.ts
│   └── ui/                 # Suítes de testes de Web UI (Front-end)
│       └── login-ui.spec.ts
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
npx playwright install chromium
```

### 2. Configurar o ambiente
Crie um arquivo `.env` na raiz baseado no exemplo:
```bash
cp .env.example .env
```
*(Por padrão, aponta para `BASE_URL=https://serverest.dev`).*

### 3. Execução dos Testes
```bash
# Executa todos os testes (API + UI em modo headless)
npm test

# Executa apenas os testes de interface gráfica com navegador visível
npx playwright test tests/ui/ --headed

# Executa e abre o relatório HTML interativo com evidências
npm run test:report
```

### 4. Qualidade de Código (Lint & Format)
```bash
# Formata todo o código com Prettier
npm run format

# Executa a análise estática com ESLint
npm run lint
```