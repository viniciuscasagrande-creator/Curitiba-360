export const INITIAL_PORTAL_SDK_DATA = {
  sandboxInfo: {
    modoAtual: 'Sandbox (Testes)',
    apiKeySandbox: 'sb_test_curitiba360_9984710',
    secretHmacSandbox: 'sb_whsec_8849102938471',
    baseUrlSandbox: 'http://localhost:3333/v1/sandbox',
    pedidosSimulados: 42,
    webhooksDisparados: 128
  },

  sdksDisponiveis: [
    {
      id: 'sdk-node',
      linguagem: 'Node.js / TypeScript',
      pacoteNpm: '@curitiba360/sdk-node',
      versao: '1.4.0',
      comandoInstalacao: 'npm install @curitiba360/sdk-node',
      snippetExemplo: `import { Curitiba360Client } from '@curitiba360/sdk-node';

const client = new Curitiba360Client({
  apiKey: process.env.CURITIBA360_API_KEY,
  environment: 'sandbox' // 'sandbox' | 'production'
});

const events = await client.events.list();
console.log('Eventos:', events.data);`
    },
    {
      id: 'sdk-python',
      linguagem: 'Python (PyPI)',
      pacoteNpm: 'curitiba360-python',
      versao: '1.2.1',
      comandoInstalacao: 'pip install curitiba360-python',
      snippetExemplo: `from curitiba360 import Curitiba360Client

client = Curitiba360Client(
    api_key="sb_test_curitiba360_9984710",
    environment="sandbox"
)

events = client.events.list()
print("Eventos:", events)`
    },
    {
      id: 'sdk-php',
      linguagem: 'PHP (Composer)',
      pacoteNpm: 'curitiba360/sdk-php',
      versao: '1.1.0',
      comandoInstalacao: 'composer require curitiba360/sdk-php',
      snippetExemplo: `use Curitiba360\\Curitiba360Client;

$client = new Curitiba360Client([
    'api_key' => 'sb_test_curitiba360_9984710',
    'environment' => 'sandbox'
]);

$events = $client->events->list();
var_dump($events);`
    }
  ],

  playgroundEndpoints: [
    { method: 'GET', path: '/v1/events', description: 'Listar todos os eventos ativos' },
    { method: 'POST', path: '/v1/orders', description: 'Simular checkout com Idempotency-Key' },
    { method: 'GET', path: '/v1/tickets/CTB-OFF-001', description: 'Validar QR Code de ingresso' },
    { method: 'POST', path: '/v1/payments', description: 'Processar pagamento via Pix/Cartão' }
  ]
};
