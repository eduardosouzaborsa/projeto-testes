import { faker } from '@faker-js/faker';
export interface ProdutoPayload {
  nome: string;
  preco: number;
  descricao: string;
  quantidade: number;
}
export class ProdutoFactory {
  static gerarProdutoValido(sobrescrever: Partial<ProdutoPayload> = {}): ProdutoPayload {
    return {
      // Nome único misturando produto com número aleatório para não dar duplicidade
      nome: `${faker.commerce.productName()} ${faker.string.alphanumeric(5)}`,
      preco: faker.number.int({ min: 10, max: 1000 }),
      descricao: faker.commerce.productDescription(),
      quantidade: faker.number.int({ min: 1, max: 100 }),
      ...sobrescrever
    };
  }
}
