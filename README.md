# ServeRest Fullstack Test Automation - SDET Architecture

Projeto completo de automação de testes de API REST, Interface Web (Front-End) e Performance (Carga) construído sobre a plataforma [ServeRest](https://serverest.dev), utilizando práticas modernas de engenharia de qualidade de software (SDET).

---

## Tecnologias Utilizadas

* **Linguagem:** [TypeScript](https://www.typescriptlang.org/)
* **Test Runner & Automação Web/API:** [Playwright Test](https://playwright.dev/)
* **Testes de Performance & Carga:** [k6 (Grafana Labs)](https://k6.io/)
* **Geração Dinâmica de Massa:** [@faker-js/faker](https://fakerjs.dev/)
* **Validação de Contrato (Schema):** [Zod](https://zod.dev/)
* **Padronização e Qualidade Estática:** [ESLint](https://eslint.org/) e [Prettier](https://prettier.io/)
* **Variáveis de Ambiente:** [Dotenv](https://github.com/motdotla/dotenv)
* **CI/CD:** [GitHub Actions](https://github.com/features/actions)

---

## Padrões de Arquitetura e Engenharia de QA

O projeto adota princípios de Clean Code e separação estrita de responsabilidades:

* **Page Object Model (POM) para Web UI:** Encapsulamento dos elementos visuais e ações de tela em classes de página (`src/pages/`), garantindo resiliência e facilidade de manutenção no Front-end.
* **API Seeding em Testes de UI:** Em vez de fluxos manuais lentos de cadastro pela interface, o usuário é provisionado em milissegundos via API antes do teste de tela, acelerando drasticamente o tempo de execução.
* **Service Object Pattern (API Clients):** Chamadas HTTP, rotas e cabeçalhos ficam centralizados em classes de serviço (`src/services/`), mantendo os testes limpos, declarativos e focados na regra de negócio.
* **Data Factory Pattern & Isolamento Total de Testes:** Não há dependência de dados estáticos ou pré-existentes. Toda massa de dados (usuários, produtos, senhas) é gerada dinamicamente via `src/factories/` com o Faker.
* **Contract Testing (JSON Schema):** Validação estrita de contratos via Zod (`src/schemas/`), garantindo integridade de tipos e regras estruturais do payload além de meros status codes HTTP.
* **Performance Testing & SLAs como Código:** Scripts de estresse e carga com k6 simulando múltiplos usuários virtuais concorrentes (VUs), estágios de ramp-up e validação de SLOs via Thresholds (ex.: p95 < 500ms e taxa de falhas < 1%).
* **Estratégia de CI/CD (GitHub Actions):** 
  * Pipeline Contínua (`ci.yml`): Executada a cada commit e pull request para validação de linter, testes de API e testes de Web UI em modo headless.
  * Pipeline Sob Demanda (`performance.yml`): Disparada manualmente via `workflow_dispatch` para testes de carga com k6 sem onerar o ciclo diário de commits.

---

## Estrutura do Projeto

```text
projeto-testes/
├── .github/
│   └── workflows/
│       ├── ci.yml                  # Pipeline de CI/CD rápida (API + UI)
│       └── performance.yml         # Pipeline manual de carga com k6
├── performance/
│   └── usuarios-performance.js     # Script de carga e thresholds do k6
├── src/
│   ├── factories/                  # Fábricas de dados dinâmicos (Faker)
│   │   ├── usuarioFactory.ts
│   │   └── produtoFactory.ts
│   ├── pages/                      # Page Object Model (Web UI)
│   │   └── loginPage.ts
│   ├── schemas/                    # Contratos e validação de schema (Zod)
│   │   └── loginSchema.ts
│   └── services/                   # Clientes de API (Service Object Pattern)
│       ├── usuarioService.ts
│       ├── loginService.ts
│       └── produtoService.ts
├── tests/
│   ├── api/                        # Suítes de testes de API REST
│   │   ├── usuarios.spec.ts
│   │   ├── login.spec.ts
│   │   ├── cadastrar-usuario.spec.ts
│   │   ├── jornada-produto.spec.ts
│   │   └── contrato-login.spec.ts
│   └── ui/                         # Suítes de testes de Web UI (Front-end)
│       └── login-ui.spec.ts
├── .env.example                    # Exemplo de configuração de variáveis
├── playwright.config.ts            # Configurações centrais do Playwright
└── package.json                    # Scripts e dependências
```

---

## Como Executar o Projeto

### Pré-requisitos
* Node.js (v20+ recomendado)
* npm
* k6 (opcional, para execução local de performance)

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

### 3. Execução dos Testes Funcionais (API + UI)
```bash
# Executa todos os testes funcionais (API + UI em modo headless)
npm test

# Executa apenas os testes de interface gráfica com navegador visível
npm run test:ui

# Executa e abre o relatório HTML interativo com evidências
npm run test:report
```

### 4. Execução dos Testes de Performance (Carga)
```bash
# Executa o teste de carga localmente com k6
npm run test:load
```

### 5. Qualidade de Código (Lint & Format)
```bash
# Formata todo o código com Prettier
npm run format

# Executa a análise estática com ESLint
npm run lint
```