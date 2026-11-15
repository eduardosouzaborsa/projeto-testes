import { APIRequestContext } from '@playwright/test';
import { ProdutoPayload } from '../factories/produtoFactory';
export class ProdutoService {
  constructor(private request: APIRequestContext) {}
  // Cadastra produto passando o token de autenticação no header
  async cadastrar(produto: ProdutoPayload, token: string) {
    return await this.request.post('/produtos', {
      headers: {
        Authorization: token
      },
      data: produto
    });
  }
  // Lista produtos (rota pública)
  async listar() {
    return await this.request.get('/produtos');
  }
}
