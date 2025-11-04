export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { amount, asset, description } = req.body;

    // ТЕСТОВЫЙ РЕЖИМ - работает без токена
    const testInvoice = {
      invoice_id: 'inv_' + Date.now(),
      hash: 'hash_' + Math.random().toString(36).substr(2, 9),
      asset: asset || 'USDT',
      amount: parseFloat(amount),
      pay_url: `https://t.me/CryptoBot?start=invoice_${Date.now()}`,
      description: description || 'Пополнение баланса',
      status: 'active',
      created_at: new Date().toISOString(),
      expiration_date: new Date(Date.now() + 3600000).toISOString()
    };

    console.log('✅ Created invoice:', testInvoice);
    
    return res.status(200).json({
      success: true,
      invoice: testInvoice
    });

  } catch (error) {
    return res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
}
