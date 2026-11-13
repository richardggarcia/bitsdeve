// ============================================
// FUNCIÓN AUXILIAR: Generar HTML del Email
// ============================================
// Lo que escribe el visitante se muestra como texto, nunca como HTML.
const escapeHtml = (value) =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const FONT = "'Helvetica Neue', Helvetica, Arial, sans-serif";
const MONO = "'SFMono-Regular', Menlo, Consolas, monospace";

const label = (text) =>
  `<p style="margin:0 0 6px;font-family:${MONO};font-size:11px;letter-spacing:1.5px;text-transform:uppercase;color:#6B7075;">${text}</p>`;

// Misma identidad que el sitio: blanco, negro y amarillo, sin adornos.
const createEmailHtml = ({ name, email, message }) => {
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeMessage = escapeHtml(message).replace(/\n/g, '<br>');

  return `
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#F2F3F4;padding:24px 12px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:100%;max-width:600px;background:#FFFFFF;border:1px solid #17191C;">
          <tr>
            <td style="background:#17191C;padding:20px 28px;border-bottom:6px solid #FFCD11;">
              <p style="margin:0;font-family:${FONT};font-size:22px;font-weight:700;letter-spacing:0.5px;color:#FFFFFF;">bitsdeve</p>
              <p style="margin:4px 0 0;font-family:${MONO};font-size:11px;letter-spacing:1.5px;text-transform:uppercase;color:#FFCD11;">Buzón de contacto · mensaje nuevo</p>
            </td>
          </tr>
          <tr>
            <td style="padding:28px 28px 8px;">
              ${label('Nombre')}
              <p style="margin:0 0 22px;font-family:${FONT};font-size:20px;font-weight:700;color:#17191C;">${safeName}</p>
              ${label('Correo')}
              <p style="margin:0 0 22px;font-family:${FONT};font-size:16px;"><a href="mailto:${safeEmail}" style="color:#17191C;">${safeEmail}</a></p>
              ${label('Mensaje')}
              <div style="margin:0 0 24px;padding:16px 18px;background:#F7F7F8;border-left:4px solid #FFCD11;font-family:${FONT};font-size:16px;line-height:1.6;color:#17191C;">${safeMessage}</div>
            </td>
          </tr>
          <tr>
            <td style="padding:0 28px 28px;">
              <a href="mailto:${safeEmail}" style="display:inline-block;background:#FFCD11;color:#17191C;font-family:${FONT};font-size:15px;font-weight:700;text-decoration:none;padding:12px 22px;border:1px solid #17191C;">Responder a ${safeName}</a>
              <p style="margin:14px 0 0;font-family:${FONT};font-size:13px;color:#6B7075;">También puedes responder este correo: la respuesta le llega directo.</p>
            </td>
          </tr>
          <tr>
            <td style="padding:14px 28px;border-top:1px solid #E3E5E7;font-family:${MONO};font-size:11px;color:#6B7075;">
              Enviado desde el formulario de bitsdeve.com
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
`;
};

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
        subject: `Mensaje nuevo de ${name} · bitsdeve.com`,
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
