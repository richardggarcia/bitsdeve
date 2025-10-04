// ============================================
// FUNCIÓN AUXILIAR: Generar HTML del Email
// ============================================
const createEmailHtml = ({ name, email, message }) => `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0A0A0A; color: #FFFFFF; padding: 20px; border-radius: 10px;">
    <div style="text-align: center; margin-bottom: 30px;">
      <h1 style="color: #00FFFF; font-size: 28px; margin: 0;">🚀 bitsdeve</h1>
      <p style="color: #CCCCCC; margin: 5px 0;">Nuevo proyecto desde el formulario web</p>
    </div>

    <div style="background: rgba(17, 17, 17, 0.6); padding: 25px; border-radius: 10px; border: 1px solid rgba(0, 255, 255, 0.2);">
      <h2 style="color: #00FFFF; margin-top: 0;">📧 Detalles del Cliente</h2>

      <div style="margin: 15px 0;">
        <strong style="color: #00FFFF;">👤 Nombre:</strong>
        <span style="color: #FFFFFF; margin-left: 10px; font-size: 18px;">${name}</span>
      </div>

      <div style="margin: 15px 0;">
        <strong style="color: #00FFFF;">📩 Email:</strong>
        <span style="color: #FFFFFF; margin-left: 10px; font-size: 18px;">${email}</span>
      </div>

      <div style="margin: 20px 0;">
        <strong style="color: #00FFFF;">💬 Mensaje:</strong>
        <div style="background: rgba(0, 0, 0, 0.3); padding: 15px; border-radius: 8px; margin-top: 10px; border-left: 3px solid #00FFFF;">
          <p style="color: #FFFFFF; margin: 0; line-height: 1.6; font-size: 16px;">${message.replace(/\n/g, '<br>')}</p>
        </div>
      </div>
    </div>

    <div style="text-align: center; margin-top: 25px; padding: 20px; background: rgba(0, 255, 255, 0.1); border-radius: 8px;">
      <p style="color: #00FFFF; margin: 0; font-weight: bold;">💡 Acciones recomendadas:</p>
      <p style="color: #CCCCCC; margin: 5px 0;">• Responder este email (va directo a ${email})</p>
      <p style="color: #CCCCCC; margin: 5px 0;">• WhatsApp: "Hola ${name}, recibí tu consulta..."</p>
      <p style="color: #CCCCCC; margin: 5px 0;">• Coordinar Google Meet de 30 min</p>
    </div>

    <div style="text-align: center; margin-top: 20px; color: #666;">
      <p style="margin: 0;">© 2024 bitsdeve.com</p>
    </div>
  </div>
`;

// ============================================
// HANDLER PRINCIPAL DE LA FUNCIÓN SERVERLESS
// ============================================
export default async function handler(req, res) {
  // CORS headers - Configurables por variables de entorno
  res.setHeader('Access-Control-Allow-Origin', process.env.ALLOWED_ORIGIN || '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Manejar preflight request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Solo permitir POST
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  // Logs de desarrollo (opcional, comentar en producción)
  console.log('🔑 API Key exists:', !!process.env.RESEND_API_KEY);
  console.log('📝 Request body:', req.body);

  // Validar campos requeridos
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    // Llamar a la API de Resend
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: process.env.FROM_EMAIL || 'contacto@bitsdeve.com',
        to: process.env.TO_EMAIL || 'richardgg646@gmail.com',
        subject: `🚀 Nuevo proyecto de ${name} - bitsdeve.com`,
        html: createEmailHtml({ name, email, message }),
        reply_to: email
      })
    });

    // Parsear respuesta JSON de Resend
    const result = await response.json();

    console.log('📧 Resend response:', response.status, result);

    if (response.ok) {
      res.status(200).json({ success: true, data: result });
    } else {
      res.status(response.status).json({
        error: `Resend error: ${result.message || JSON.stringify(result)}`
      });
    }
  } catch (error) {
    console.error('💥 Function error:', error);
    res.status(500).json({ error: error.message });
  }
}
