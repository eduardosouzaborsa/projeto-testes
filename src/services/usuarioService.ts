import { APIRequestContext } from '@playwright/test';
import { UsuarioPayload } from '../factories/usuarioFactory';

export class UsuarioService {
  // O Playwright entrega o cliente HTTP 'request' para o serviço
  constructor(private request: APIRequestContext) {}

  // Cadastra um novo usuário
  async cadastrar(usuario: UsuarioPayload) {
    return await this.request.post('/usuarios', {
      data: usuario
    });
  }

  // Lista todos os usuários
  async listar() {
    return await this.request.get('/usuarios');
  }

  // Busca um usuário pelo ID
  async buscarPorId(id: string) {
    return await this.request.get(`/usuarios/${id}`);
  }

  // Deleta um usuário pelo ID
  async deletar(id: string) {
    return await this.request.delete(`/usuarios/${id}`);
  }
}
