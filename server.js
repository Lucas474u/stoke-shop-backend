const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Health check - ОБЯЗАТЕЛЬНО для Render
app.get('/', (req, res) => {
  res.json({ 
    status: '🚀 StokeShop API is running!',
    timestamp: new Date().toISOString(),
    endpoints: [
      'POST /api/create-invoice',
      'POST /api/check-invoice'
    ]
  });
});

// Create invoice endpoint
app.post('/api/create-invoice', (req, res) => {
  try {
    const { amount, asset, description } = req.body;
    
    console.log('📨 Creating invoice for amount:', amount);
    
    const invoice = {
      invoice_id: 'render_' + Date.now(),
      hash: 'rh_' + Math.random().toString(36).substr(2, 9),
      asset: asset || 'USDT',
      amount: parseFloat(amount),
      pay_url: `https://t.me/CryptoBot?start=render_${Date.now()}`,
      description: description || 'Пополнение баланса StokeShop',
      status: 'active',
      created_at: new Date().toISOString(),
      expiration_date: new Date(Date.now() + 3600000).toISOString()
    };
    
    console.log('✅ Invoice created:', invoice.invoice_id);
    res.json({ success: true, invoice });
    
  } catch (error) {
    console.error('❌ Error creating invoice:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Check invoice endpoint
app.post('/api/check-invoice', (req, res) => {
  try {
    const { invoice_id } = req.body;
    
    console.log('🔍 Checking invoice:', invoice_id);
    
    const invoice = {
      invoice_id: invoice_id,
      status: Math.random() > 0.7 ? 'paid' : 'active',
      hash: 'rchk_' + Math.random().toString(36).substr(2, 9),
      asset: 'USDT',
      amount: 10.0,
      pay_url: `https://t.me/CryptoBot?start=check_render_${invoice_id}`,
      created_at: new Date().toISOString(),
      paid_at: Math.random() > 0.7 ? new Date().toISOString() : null
    };
    
    console.log('✅ Invoice status:', invoice.status);
    res.json({ success: true, invoice });
    
  } catch (error) {
    console.error('❌ Error checking invoice:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Handle 404
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found', path: req.originalUrl });
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Render server running on port ${PORT}`);
  console.log(`✅ Health check: http://0.0.0.0:${PORT}/`);
});
