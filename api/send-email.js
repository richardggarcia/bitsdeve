export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  console.log('🔑 API Key exists:', !!process.env.RESEND_API_KEY);
  console.log('📝 Request body:', req.body);

  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'contacto@bitsdeve.com',
        to: 'richardgg646@gmail.com',
        subject: `🚀 Nuevo proyecto de ${name} - bitsdeve.com`,
        html: `
          <h2>Nuevo contacto desde bitsdeve.com</h2>
          <p><strong>Nombre:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Mensaje:</strong></p>
          <p>${message.replace(/\n/g, '<br>')}</p>
        `,
        reply_to: email
      })
    });

    const result = await response.text();
    console.log('📧 Resend response:', response.status, result);

    if (response.ok) {
      res.status(200).json({ success: true });
    } else {
      res.status(500).json({ error: `Resend error: ${result}` });
    }
  } catch (error) {
    console.error('💥 Function error:', error);
    res.status(500).json({ error: error.message });
  }
}