import { test, expect } from '@playwright/test';

test('Deve listar todos os usuários com sucesso (GET /usuarios)', async ({ request }) => {
  // 1. Dispara a requisição HTTP GET
  const response = await request.get('/usuarios');

  // 2. Valida o Status Code (esperado: 200 OK)
  expect(response.status()).toBe(200);

  // 3. Converte a resposta para JSON
  const body = await response.json();

  // 4. Valida se o corpo possui as propriedades esperadas
  expect(body).toHaveProperty('quantidade');
  expect(body).toHaveProperty('usuarios');
  expect(Array.isArray(body.usuarios)).toBeTruthy();
});
