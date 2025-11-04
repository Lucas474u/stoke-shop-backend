export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { invoice_id } = req.body;

    // ТЕСТОВЫЙ РЕЖИМ
    const statuses = ['active', 'paid', 'expired'];
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];

    const testInvoice = {
      invoice_id: invoice_id,
      status: randomStatus,
      hash: 'check_hash_' + Math.random().toString(36).substr(2, 9),
      asset: 'USDT',
      amount: 10.00,
      pay_url: `https://t.me/CryptoBot?start=check_${invoice_id}`,
      created_at: new Date().toISOString()
    };

    console.log('✅ Checked invoice:', testInvoice);
    
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
