import { faker } from '@faker-js/faker';

export interface UsuarioPayload {
  nome: string;
  email: string;
  password: string;
  administrador: 'true' | 'false';
}

export class UsuarioFactory {
  /**
   * Gera um payload de usuário válido com dados aleatórios.
   * Permite sobrescrever qualquer campo se necessário (ex: testar campo vazio).
   */
  static gerarUsuarioValido(sobrescrever: Partial<UsuarioPayload> = {}): UsuarioPayload {
    return {
      nome: faker.person.fullName(),
      email: faker.internet.email().toLowerCase(),
      password: faker.internet.password({ length: 8 }),
      administrador: 'true',
      ...sobrescrever // Sobrescreve apenas os campos que você passar
    };
  }
}
