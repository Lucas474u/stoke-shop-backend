export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  // Only POST allowed
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { amount, asset, description } = req.body;
    
    console.log('Creating invoice for amount:', amount);
    
    // Test response
    const response = {
      success: true,
      invoice: {
        invoice_id: 'inv_' + Date.now(),
        hash: 'h_' + Math.random().toString(36).substr(2, 9),
        asset: asset || 'USDT',
        amount: parseFloat(amount),
        pay_url: `https://t.me/CryptoBot?start=test_${Date.now()}`,
        description: description || 'Test invoice',
        status: 'active',
        created_at: new Date().toISOString(),
        expiration_date: new Date(Date.now() + 3600000).toISOString()
      }
    };
    
    return res.status(200).json(response);
    
  } catch (error) {
    return res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
}
