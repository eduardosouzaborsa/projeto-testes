import { test, expect } from '@playwright/test';
import { UsuarioFactory } from '../../src/factories/usuarioFactory';
import { UsuarioService } from '../../src/services/usuarioService';
import { LoginService } from '../../src/services/loginService';
import { ProdutoFactory } from '../../src/factories/produtoFactory';
import { ProdutoService } from '../../src/services/produtoService';

test.describe('Jornada E2E: Usuário -> Autenticação -> Cadastro de Produto', () => {
  test('Deve criar um usuário admin, autenticar e cadastrar um novo produto com sucesso', async ({
    request
  }) => {
    // 1. Instanciar os serviços necessários
    const usuarioService = new UsuarioService(request);
    const loginService = new LoginService(request);
    const produtoService = new ProdutoService(request);

    // -------------------------------------------------------------
    // ETAPA 1: Cadastrar Usuário Administrador
    // -------------------------------------------------------------
    const usuarioAdmin = UsuarioFactory.gerarUsuarioValido({ administrador: 'true' });
    const resCadastroUsuario = await usuarioService.cadastrar(usuarioAdmin);
    expect(resCadastroUsuario.status()).toBe(201);

    // -------------------------------------------------------------
    // ETAPA 2: Autenticar (Login) com o usuário que acabamos de criar
    // -------------------------------------------------------------
    const resLogin = await loginService.autenticar({
      email: usuarioAdmin.email,
      password: usuarioAdmin.password
    });
    expect(resLogin.status()).toBe(200);

    const bodyLogin = await resLogin.json();
    const token = bodyLogin.authorization; // Token JWT obtido dinamicamente
    expect(token).toBeDefined();

    // -------------------------------------------------------------
    // ETAPA 3: Cadastrar Produto usando o Token recém-gerado
    // -------------------------------------------------------------
    const novoProduto = ProdutoFactory.gerarProdutoValido();
    const resCadastroProduto = await produtoService.cadastrar(novoProduto, token);

    // -------------------------------------------------------------
    // ETAPA 4: Validações Finais de Sucesso
    // -------------------------------------------------------------
    expect(resCadastroProduto.status()).toBe(201);

    const bodyProduto = await resCadastroProduto.json();
    expect(bodyProduto.message).toBe('Cadastro realizado com sucesso');
    expect(bodyProduto).toHaveProperty('_id');
  });
});
