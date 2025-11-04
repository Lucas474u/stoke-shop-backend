const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Health check
app.get('/', (req, res) => {
  res.json({ 
    status: '🚀 API WORKING!', 
    message: 'StokeShop Backend is running!',
    timestamp: new Date().toISOString()
  });
});

// Create invoice - ПРОСТАЯ ВЕРСИЯ
app.post('/api/create-invoice', (req, res) => {
  console.log('📨 Create invoice request:', req.body);
  
  const invoice = {
    invoice_id: 'test_' + Date.now(),
    hash: 'h_' + Math.random().toString(36).substr(2, 9),
    asset: req.body.asset || 'USDT',
    amount: parseFloat(req.body.amount),
    pay_url: `https://t.me/CryptoBot?start=test_${Date.now()}`,
    description: req.body.description || 'Пополнение баланса',
    status: 'active',
    created_at: new Date().toISOString(),
    expiration_date: new Date(Date.now() + 3600000).toISOString()
  };
  
  console.log('✅ Invoice created:', invoice.invoice_id);
  res.json({ success: true, invoice });
});

// Check invoice - ПРОСТАЯ ВЕРСИЯ
app.post('/api/check-invoice', (req, res) => {
  console.log('🔍 Check invoice request:', req.body);
  
  const invoice = {
    invoice_id: req.body.invoice_id,
    status: Math.random() > 0.7 ? 'paid' : 'active',
    hash: 'chk_' + Math.random().toString(36).substr(2, 9),
    asset: 'USDT',
    amount: 10.0,
    pay_url: `https://t.me/CryptoBot?start=check_${req.body.invoice_id}`,
    created_at: new Date().toISOString()
  };
  
  console.log('✅ Invoice status:', invoice.status);
  res.json({ success: true, invoice });
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
