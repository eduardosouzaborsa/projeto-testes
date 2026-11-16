import { Page, Locator } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly campoEmail: Locator;
  readonly campoSenha: Locator;
  readonly botaoEntrar: Locator;

  constructor(page: Page) {
    this.page = page;
    // Localizadores usando o padrão data-testid do ServeRest
    this.campoEmail = page.getByTestId('email');
    this.campoSenha = page.getByTestId('senha');
    this.botaoEntrar = page.getByTestId('entrar');
  }

  // 1. Acessa a página de login
  async acessar() {
    await this.page.goto('https://front.serverest.dev/login');
  }

  // 2. Realiza o fluxo completo de login
  async logar(email: string, pass: string) {
    await this.campoEmail.fill(email);
    await this.campoSenha.fill(pass);
    await this.botaoEntrar.click();
  }
}