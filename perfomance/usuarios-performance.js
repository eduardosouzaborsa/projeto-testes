import http from 'k6/http';
import { check, sleep } from 'k6';

// -------------------------------------------------------------
// 1. CONFIGURAÇÕES DO TESTE DE CARGA (Options)
// -------------------------------------------------------------
export const options = {
  // Simulação de Ramp-up (Subida, Platô e Descida de carga)
  stages: [
    { duration: '10s', target: 5 },  // Em 10 segundos, sobe para 5 usuários virtuais (VUs)
    { duration: '20s', target: 10 }, // Nos 20s seguintes, sobe para 10 usuários simultâneos
    { duration: '10s', target: 0 }   // Em 10 segundos, reduz para 0 usuários (resfriamento)
  ],

  // SLAs / Critérios de Aprovação Automática (Thresholds)
  thresholds: {
    // 95% das requisições DEVEM responder em menos de 500 milissegundos:
    http_req_duration: ['p(95)<500'],
    // A taxa de erro HTTP deve ser menor que 1% (menos de 0.01):
    http_req_failed: ['rate<0.01']
  }
};

// -------------------------------------------------------------
// 2. O QUE CADA USUÁRIO VIRTUAL FARÁ REPETIDAMENTE
// -------------------------------------------------------------
export default function () {
  const url = 'https://serverest.dev/usuarios';
  
  // Dispara a requisição HTTP GET
  const response = http.get(url);

  // Validação rápida de status code
  check(response, {
    'status é 200': (r) => r.status === 200,
    'resposta possui dados': (r) => r.body.includes('quantidade')
  });

  // Pausa de 1 segundo para simular o comportamento humano
  sleep(1);
}