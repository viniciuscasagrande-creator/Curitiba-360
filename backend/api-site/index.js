import express from 'express';
import cors from 'cors';
import { ATTRACTIONS, CATEGORIES, BRAND_LANDMARKS } from '../../site/src/data/attractions.js';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'Curitiba 360 API', version: '1.0.0', timestamp: new Date().toISOString() });
});

app.get('/api/categories', (req, res) => {
  res.json(CATEGORIES);
});

app.get('/api/landmarks', (req, res) => {
  res.json(BRAND_LANDMARKS);
});

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

app.get('/api/attractions/:id', (req, res) => {
  const attraction = ATTRACTIONS.find(a => a.id === req.params.id);
  if (!attraction) {
    return res.status(404).json({ error: 'Attraction not found' });
  }
  res.json(attraction);
});

app.post('/api/orders', (req, res) => {
  const { cartItems, paymentMethod } = req.body;

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

app.post('/api/partners', (req, res) => {
  res.status(201).json({
    success: true,
    message: 'Solicitação de cadastro de Parceiro Comercial enviada com sucesso!',
    protocol: 'PROT-' + Date.now()
  });
});

app.post('/api/agencies', (req, res) => {
  res.status(201).json({
    success: true,
    message: 'Solicitação de cadastro de Agência de Viagens enviada com sucesso!',
    protocol: 'AGENCY-' + Date.now()
  });
});

if (process.env.NODE_ENV !== 'production' && !process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`Curitiba 360 API running at http://localhost:${PORT}`);
  });
}

export default app;
