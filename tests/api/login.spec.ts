import { test, expect } from '@playwright/test';
import { UsuarioFactory } from '../../src/factories/usuarioFactory';
import { UsuarioService } from '../../src/services/usuarioService';
import { LoginService } from '../../src/services/loginService';

test.describe('Autenticação de Usuários (POST /login)', () => {
  test('Deve autenticar com sucesso e retornar o Token JWT', async ({ request }) => {
    const usuarioService = new UsuarioService(request);
    const loginService = new LoginService(request);

    // 1. O teste cria o seu próprio usuário único na hora:
    const usuario = UsuarioFactory.gerarUsuarioValido();
    await usuarioService.cadastrar(usuario);

    // 2. Faz o login com esse usuário recém-criado:
    const response = await loginService.autenticar({
      email: usuario.email,
      password: usuario.password
    });

    // 3. Validações:
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.message).toBe('Login realizado com sucesso');
    expect(body).toHaveProperty('authorization');
    expect(body.authorization).toContain('Bearer ');
  });

  test('Deve rejeitar login com senha inválida', async ({ request }) => {
    const usuarioService = new UsuarioService(request);
    const loginService = new LoginService(request);

    // 1. Cria um usuário válido:
    const usuario = UsuarioFactory.gerarUsuarioValido();
    await usuarioService.cadastrar(usuario);

    // 2. Tenta logar com a senha deliberadamente errada:
    const response = await loginService.autenticar({
      email: usuario.email,
      password: 'senha_completamente_errada_123'
    });

    // 3. Valida que o sistema barrou (401 Unauthorized):
    expect(response.status()).toBe(401);

    const body = await response.json();
    expect(body.message).toBe('Email e/ou senha inválidos');
  });
});
