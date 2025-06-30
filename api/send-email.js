export default async function handler(req, res) {
  // Permitir CORS para tu dominio
  res.setHeader('Access-Control-Allow-Origin', 'https://bitsdeve.com');
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { name, email, message } = req.body;

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
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2 style="color: #00FFFF;">Nuevo contacto desde bitsdeve.com</h2>
            <div style="background: #f8f9fa; padding: 20px; border-radius: 10px; margin: 20px 0;">
              <p><strong>👤 Nombre:</strong> ${name}</p>
              <p><strong>📧 Email:</strong> ${email}</p>
              <p><strong>💬 Mensaje:</strong></p>
              <div style="background: white; padding: 15px; border-radius: 5px; margin-top: 10px;">
                ${message.replace(/\n/g, '<br>')}
              </div>
            </div>
            <p style="color: #666; font-size: 14px;">Enviado desde el formulario de contacto de bitsdeve.com</p>
          </div>
        `,
        reply_to: email
      })
    });

    if (response.ok) {
      res.status(200).json({ success: true, message: 'Email enviado correctamente' });
    } else {
      const errorData = await response.text();
      console.error('Resend error:', errorData);
      res.status(500).json({ error: 'Error sending email' });
    }
  } catch (error) {
    console.error('Function error:', error);
    res.status(500).json({ error: error.message });
  }
}