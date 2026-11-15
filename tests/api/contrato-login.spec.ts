import { test, expect } from '@playwright/test';
import { UsuarioFactory } from '../../src/factories/usuarioFactory';
import { UsuarioService } from '../../src/services/usuarioService';
import { LoginService } from '../../src/services/loginService';
import { loginSucessoSchema } from '../../src/schemas/loginSchema';

test.describe('Testes de Contrato: Autenticação', () => {
  test('Deve garantir o contrato da resposta de login com sucesso', async ({ request }) => {
    const usuarioService = new UsuarioService(request);
    const loginService = new LoginService(request);

    // 1. Prepara a massa
    const usuario = UsuarioFactory.gerarUsuarioValido();
    await usuarioService.cadastrar(usuario);

    // 2. Faz o login
    const response = await loginService.autenticar({
      email: usuario.email,
      password: usuario.password
    });
    const body = await response.json();

    // 3. VALIDAÇÃO DO CONTRATO:
    // O safeParse compara o JSON real da API contra o schema definido.
    const resultadoContrato = loginSucessoSchema.safeParse(body);

    // Se houver qualquer divergência de tipo ou campo ausente, o teste falha aqui:
    expect(resultadoContrato.success).toBe(true);
  });
});
