import { test, expect } from '@playwright/test';
import { UsuarioService } from '../../src/services/usuarioService';
import { UsuarioFactory } from '../../src/factories/usuarioFactory';

test.describe('Cadastro de Usuários com Service Object', () => {
  test('Deve cadastrar usuário com sucesso utilizando Service e Factory', async ({ request }) => {
    // 1. Instancia o serviço com o request do Playwright
    const usuarioService = new UsuarioService(request);

    // 2. Gera a massa dinâmica com o Faker
    const novoUsuario = UsuarioFactory.gerarUsuarioValido();

    // 3. Executa a ação de negócio via Service (sem URLs ou métodos HTTP soltos no teste)
    const response = await usuarioService.cadastrar(novoUsuario);

    // 4. Validações de regra de negócio
    expect(response.status()).toBe(201);

    const body = await response.json();
    expect(body.message).toBe('Cadastro realizado com sucesso');
    expect(body).toHaveProperty('_id');
  });
});
