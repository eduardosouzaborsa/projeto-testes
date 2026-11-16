import { test, expect } from '@playwright/test';
import { LoginPage } from '../../src/pages/loginPage';
import { UsuarioFactory } from '../../src/factories/usuarioFactory';
import { UsuarioService } from '../../src/services/usuarioService';

test.describe('Interface Web: Autenticação (Front-End)', () => {

  test('Deve realizar login com sucesso via tela com usuário gerado pela API', async ({ page, request }) => {
    // -------------------------------------------------------------
    // 1. BACKEND SEEDING (Criação do usuário em 100ms via API)
    // -------------------------------------------------------------
    const usuarioService = new UsuarioService(request);
    const usuarioAdmin = UsuarioFactory.gerarUsuarioValido({ administrador: 'true' });
    const resCadastro = await usuarioService.cadastrar(usuarioAdmin);
    expect(resCadastro.status()).toBe(201);

    // -------------------------------------------------------------
    // 2. FRONT-END (Navegação visual na tela com Page Object)
    // -------------------------------------------------------------
    const loginPage = new LoginPage(page);
    await loginPage.acessar();
    await loginPage.logar(usuarioAdmin.email, usuarioAdmin.password);

    // -------------------------------------------------------------
    // 3. ASSERÇÕES VISUAIS
    // -------------------------------------------------------------
    // Valida que a URL mudou para a Home (/admin/home)
    await expect(page).toHaveURL(/.*admin\/home/);

    // Valida que o botão de Logout ou texto de boas-vindas apareceu na tela
    const botaoLogout = page.getByTestId('logout');
    await expect(botaoLogout).toBeVisible();
  });

});