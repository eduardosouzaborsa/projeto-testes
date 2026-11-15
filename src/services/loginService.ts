import { APIRequestContext } from '@playwright/test';

export interface LoginPayload {
  email: string;
  password: string;
}

export class LoginService {
  constructor(private request: APIRequestContext) {}

  // Dispara o POST /login com email e senha
  async autenticar(credenciais: LoginPayload) {
    return await this.request.post('/login', {
      data: credenciais
    });
  }
}
