import { z } from 'zod';

// Contrato: define a estrutura exata esperada no retorno de sucesso do /login
export const loginSucessoSchema = z.object({
  message: z.string(),
  authorization: z.string().startsWith('Bearer ')
});

// Contrato: define a resposta de erro (401)
export const loginInvalidoSchema = z.object({
  message: z.literal('Email e/ou senha inválidos')
});
