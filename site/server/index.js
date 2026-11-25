import express from 'express';
import cors from 'cors';
import { ATTRACTIONS, CATEGORIES, BRAND_LANDMARKS } from '../src/data/attractions.js';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Visual Web API Interface served at http://localhost:3001/
app.get('/', (req, res) => {
  const html = `
  <!DOCTYPE html>
  <html lang="pt-BR">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Curitiba 360 - Visual API Explorer & Documentação Web</title>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&family=Fira+Code:wght@400;600&display=swap" rel="stylesheet">
    <style>
      :root {
        --teal: #00a896;
        --teal-dark: #008f7f;
        --bg-dark: #0f172a;
        --card-dark: #1e293b;
        --text-light: #f8fafc;
        --text-muted: #94a3b8;
        --accent-orange: #ea580c;
        --accent-blue: #2563eb;
      }
      * { box-sizing: border-box; margin: 0; padding: 0; }
      body {
        font-family: 'Plus Jakarta Sans', sans-serif;
        background-color: var(--bg-dark);
        color: var(--text-light);
        line-height: 1.6;
        padding: 40px 20px;
      }
      .container { maxWidth: 1100px; margin: 0 auto; }
      header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-bottom: 24px;
        border-bottom: 1px solid rgba(255,255,255,0.1);
        margin-bottom: 32px;
      }
      .logo { display: flex; align-items: center; gap: 12px; }
      .logo-icon {
        width: 44px; height: 44px; background: var(--teal);
        border-radius: 12px; display: flex; align-items: center;
        justify-content: center; font-weight: 800; font-size: 24px; color: #fff;
        box-shadow: 0 4px 14px rgba(0,168,150,0.4);
      }
      .title { font-size: 24px; font-weight: 800; }
      .subtitle { font-size: 13px; color: var(--teal); font-weight: 700; }
      .status-badge {
        background: rgba(16, 185, 129, 0.15); border: 1px solid #10b981;
        color: #10b981; padding: 6px 14px; border-radius: 9999px; font-size: 12px; font-weight: 700;
      }
      .grid { display: grid; grid-template-columns: 1fr; gap: 24px; margin-bottom: 40px; }
      .card {
        background: var(--card-dark); border: 1px solid rgba(255,255,255,0.08);
        border-radius: 16px; padding: 24px; transition: all 0.2s ease;
      }
      .card-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px; }
      .method {
        padding: 4px 10px; border-radius: 6px; font-size: 12px; font-weight: 800; font-family: 'Fira Code', monospace;
      }
      .method-get { background: rgba(37, 99, 235, 0.2); color: #60a5fa; border: 1px solid #3b82f6; }
      .method-post { background: rgba(16, 185, 129, 0.2); color: #34d399; border: 1px solid #10b981; }
      .endpoint-path { font-family: 'Fira Code', monospace; font-size: 16px; font-weight: 600; color: var(--teal); }
      .desc { font-size: 14px; color: var(--text-muted); margin-bottom: 16px; }
      .btn {
        background: var(--teal); color: #fff; border: none; padding: 10px 18px;
        border-radius: 8px; font-weight: 700; font-size: 13px; cursor: pointer;
        transition: background 0.2s ease;
      }
      .btn:hover { background: var(--teal-dark); }
      pre {
        background: #090d16; padding: 16px; border-radius: 10px; font-family: 'Fira Code', monospace;
        font-size: 13px; color: #38bdf8; overflow-x: auto; margin-top: 12px; display: none;
        border: 1px solid rgba(255,255,255,0.05); max-height: 300px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <header>
        <div class="logo">
          <div class="logo-icon">C</div>
          <div>
            <div class="title">Curitiba 360° <span style="color:var(--teal)">API Visual Explorer</span></div>
            <div class="subtitle">DOCUMENTAÇÃO E REQUISIÇÕES WEB EM TEMPO REAL</div>
          </div>
        </div>
        <div class="status-badge">● API Online (Porta ${PORT})</div>
      </header>

      <div class="grid">
        <!-- Route 1 -->
        <div class="card">
          <div class="card-header">
            <div style="display:flex; align-items:center; gap:12px">
              <span class="method method-get">GET</span>
              <span class="endpoint-path">/api/attractions</span>
            </div>
            <button class="btn" onclick="fetchRoute('/api/attractions', 'res-1')">Executar no Navegador</button>
          </div>
          <p class="desc">Retorna a lista completa de atrações e pacotes turísticos de Curitiba. Suporta parâmetros de busca <code>?category=parques</code> e <code>?search=opera</code>.</p>
          <pre id="res-1"></pre>
        </div>

        <!-- Route 2 -->
        <div class="card">
          <div class="card-header">
            <div style="display:flex; align-items:center; gap:12px">
              <span class="method method-get">GET</span>
              <span class="endpoint-path">/api/categories</span>
            </div>
            <button class="btn" onclick="fetchRoute('/api/categories', 'res-2')">Executar no Navegador</button>
          </div>
          <p class="desc">Retorna todas as categorias disponíveis no portal (Pacotes, Promocionais, Cupons, Parques, Restaurantes, Shows).</p>
          <pre id="res-2"></pre>
        </div>

        <!-- Route 3 -->
        <div class="card">
          <div class="card-header">
            <div style="display:flex; align-items:center; gap:12px">
              <span class="method method-get">GET</span>
              <span class="endpoint-path">/api/landmarks</span>
            </div>
            <button class="btn" onclick="fetchRoute('/api/landmarks', 'res-3')">Executar no Navegador</button>
          </div>
          <p class="desc">Lista os 8 pontos turísticos e ícones da identidade visual oficial inspirados no design de Jaime Lerner.</p>
          <pre id="res-3"></pre>
        </div>

        <!-- Route 4 -->
        <div class="card">
          <div class="card-header">
            <div style="display:flex; align-items:center; gap:12px">
              <span class="method method-post">POST</span>
              <span class="endpoint-path">/api/orders</span>
            </div>
            <button class="btn" onclick="postOrder('res-4')">Simular Compra (POST)</button>
          </div>
          <p class="desc">Processa reserva de ingressos e gera Vouchers digitais com QR Code e hash de autenticação.</p>
          <pre id="res-4"></pre>
        </div>
      </div>
    </div>

    <script>
      async function fetchRoute(url, elementId) {
        const el = document.getElementById(elementId);
        el.style.display = 'block';
        el.innerText = 'Carregando requisição...';
        try {
          const res = await fetch(url);
          const data = await res.json();
          el.innerText = JSON.stringify(data, null, 2);
        } catch(e) {
          el.innerText = 'Erro ao consultar API: ' + e.message;
        }
      }

      async function postOrder(elementId) {
        const el = document.getElementById(elementId);
        el.style.display = 'block';
        el.innerText = 'Enviando pedido...';
        try {
          const res = await fetch('/api/orders', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              cartItems: [{ id: 'parque-jaime-lerner', title: 'Parque Jaime Lerner', quantity: 2, price: 39.90 }],
              paymentMethod: 'pix',
              userEmail: 'turista@curitiba360.com'
            })
          });
          const data = await res.json();
          el.innerText = JSON.stringify(data, null, 2);
        } catch(e) {
          el.innerText = 'Erro ao enviar pedido: ' + e.message;
        }
      }
    </script>
  </body>
  </html>
  `;
  res.send(html);
});

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'Curitiba 360 API', version: '1.0.0', timestamp: new Date().toISOString() });
});

// Categories list
app.get('/api/categories', (req, res) => {
  res.json(CATEGORIES);
});

// Brand Landmarks list
app.get('/api/landmarks', (req, res) => {
  res.json(BRAND_LANDMARKS);
});

// Attractions search & filter
app.get('/api/attractions', (req, res) => {
  const { category, search } = req.query;
  let results = [...ATTRACTIONS];

  if (category && category !== 'all') {
    results = results.filter(item => 
      item.category === category || (item.categories && item.categories.includes(category))
    );
  }

  if (search) {
    const q = search.toLowerCase().trim();
    results = results.filter(item => 
      item.title.toLowerCase().includes(q) || 
      item.location.toLowerCase().includes(q) || 
      item.description.toLowerCase().includes(q)
    );
  }

  res.json(results);
});

// Attraction by ID
app.get('/api/attractions/:id', (req, res) => {
  const attraction = ATTRACTIONS.find(a => a.id === req.params.id);
  if (!attraction) {
    return res.status(404).json({ error: 'Attraction not found' });
  }
  res.json(attraction);
});

// Checkout Order creation
app.post('/api/orders', (req, res) => {
  const { cartItems, paymentMethod, userEmail } = req.body;

  if (!cartItems || cartItems.length === 0) {
    return res.status(400).json({ error: 'Carrinho vazio' });
  }

  const orderId = 'ORD-' + Math.floor(100000 + Math.random() * 900000);
  const totalAmount = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  const vouchers = cartItems.map(item => ({
    voucherCode: 'CWB360-' + Math.random().toString(36).substring(2, 9).toUpperCase(),
    attractionTitle: item.title,
    ticketType: item.ticketType || 'Adulto',
    quantity: item.quantity,
    qrCodeHash: 'QR_' + Math.random().toString(36).substring(2, 12)
  }));

  res.status(201).json({
    success: true,
    orderId,
    totalAmount,
    paymentMethod: paymentMethod || 'pix',
    status: 'paid',
    vouchers,
    createdAt: new Date().toISOString()
  });
});

// Commercial Partner registration request
app.post('/api/partners', (req, res) => {
  const { companyName, cnpj, contactPerson, phone } = req.body;
  res.status(201).json({
    success: true,
    message: 'Solicitação de cadastro de Parceiro Comercial enviada com sucesso!',
    protocol: 'PROT-' + Date.now()
  });
});

// Travel Agency registration request
app.post('/api/agencies', (req, res) => {
  const { agencyName, cnpj, cadastur, phone } = req.body;
  res.status(201).json({
    success: true,
    message: 'Solicitação de cadastro de Agência de Viagens enviada com sucesso!',
    protocol: 'AGENCY-' + Date.now()
  });
});

if (process.env.NODE_ENV !== 'production' && !process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`Curitiba 360 Visual API running at http://localhost:${PORT}`);
  });
}

export default app;

