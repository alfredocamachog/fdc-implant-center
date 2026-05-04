import { existsSync, readFileSync } from 'node:fs'
import { execFile } from 'node:child_process'
import { promisify } from 'node:util'
const TO_EMAIL = 'drfernandoadelcorro@gmail.com'
const SUBJECT_PREFIX = process.env.RESEND_SUBJECT_PREFIX || 'Nueva solicitud | Prime Dental Nogales'
const execFileAsync = promisify(execFile)

const sendJson = (res, statusCode, payload) => {
  res.statusCode = statusCode
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify(payload))
}

const getResendApiKey = () => {
  if (process.env.RESEND_API_KEY) return process.env.RESEND_API_KEY

  const envPath = `${process.cwd()}/.env.local`
  if (!existsSync(envPath)) return ''

  const content = readFileSync(envPath, 'utf8')
  const line = content
    .split(/\r?\n/)
    .find((item) => item.trim().startsWith('RESEND_API_KEY='))
  return line ? line.split('=').slice(1).join('=').trim() : ''
}

const escapeHtml = (value = '') =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')

const buildTemplate = ({ nombre, email, telefono, mensaje }) => {
  const safeName = escapeHtml(nombre)
  const safeEmail = escapeHtml(email)
  const safePhone = escapeHtml(telefono || 'No proporcionado')
  const safeMessage = escapeHtml(mensaje || 'Sin mensaje').replace(/\n/g, '<br/>')
  const now = new Date().toLocaleString('es-MX', { timeZone: 'America/Hermosillo' })

  return `
  <div style="margin:0;padding:24px;background:#f5fbfe;font-family:Arial,sans-serif;color:#173e5f;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:640px;margin:0 auto;background:#ffffff;border:1px solid #c8ddea;border-radius:16px;overflow:hidden;">
      <tr>
        <td style="background:#173e5f;padding:18px 24px;color:#ffffff;">
          <h1 style="margin:0;font-size:20px;line-height:1.3;">Nueva solicitud de contacto</h1>
          <p style="margin:6px 0 0;font-size:13px;opacity:0.9;">FDC Prosthodontics & Implants</p>
        </td>
      </tr>
      <tr>
        <td style="padding:20px 24px;">
          <p style="margin:0 0 14px;font-size:14px;color:#476985;">Se recibió un nuevo formulario desde el sitio web.</p>
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:separate;border-spacing:0 10px;">
            <tr>
              <td style="width:150px;font-weight:700;font-size:14px;color:#173e5f;">Nombre</td>
              <td style="font-size:14px;color:#1e4464;">${safeName}</td>
            </tr>
            <tr>
              <td style="width:150px;font-weight:700;font-size:14px;color:#173e5f;">Email</td>
              <td style="font-size:14px;color:#1e4464;">${safeEmail}</td>
            </tr>
            <tr>
              <td style="width:150px;font-weight:700;font-size:14px;color:#173e5f;">Teléfono</td>
              <td style="font-size:14px;color:#1e4464;">${safePhone}</td>
            </tr>
            <tr>
              <td style="width:150px;font-weight:700;font-size:14px;color:#173e5f;vertical-align:top;">Mensaje</td>
              <td style="font-size:14px;color:#1e4464;line-height:1.5;">${safeMessage}</td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td style="padding:14px 24px;background:#e8f3f9;border-top:1px solid #c8ddea;font-size:12px;color:#476985;">
          Enviado el ${escapeHtml(now)}
        </td>
      </tr>
    </table>
  </div>`
}

const parseJsonSafe = (value) => {
  try {
    return JSON.parse(value)
  } catch {
    return null
  }
}

const sendWithFetch = async (payload, apiKey) => {
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })

  const raw = await response.text()
  const data = parseJsonSafe(raw)
  return { ok: response.ok, status: response.status, data, raw }
}

const sendWithCurl = async (payload, apiKey) => {
  const args = [
    '-sS',
    '-X',
    'POST',
    'https://api.resend.com/emails',
    '-H',
    `Authorization: Bearer ${apiKey}`,
    '-H',
    'Content-Type: application/json',
    '-d',
    JSON.stringify(payload),
  ]
  const { stdout } = await execFileAsync('curl.exe', args, { windowsHide: true })
  const data = parseJsonSafe(stdout)
  if (!data) {
    return { ok: false, status: 500, data: null, raw: stdout }
  }
  return { ok: !data.statusCode || data.statusCode < 400, status: data.statusCode || 200, data, raw: stdout }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return sendJson(res, 405, { ok: false, error: 'Method not allowed' })
  }

  const apiKey = getResendApiKey()
  if (!apiKey) {
    return sendJson(res, 500, { ok: false, error: 'Missing RESEND_API_KEY' })
  }

  const { nombre, email, telefono, mensaje } = req.body || {}
  if (!nombre || !email) {
    return sendJson(res, 400, { ok: false, error: 'Nombre y email son obligatorios' })
  }

  try {
    const basePayload = {
      from: email,
      to: [TO_EMAIL],
      subject: `${SUBJECT_PREFIX}: ${nombre}`,
      html: buildTemplate({ nombre, email, telefono, mensaje }),
      reply_to: email,
    }

    let result
    let useCurl = false
    try {
      result = await sendWithFetch(basePayload, apiKey)
    } catch (error) {
      const msg =
        error instanceof Error
          ? `${error.message} ${error.cause instanceof Error ? error.cause.message : ''}`.toLowerCase()
          : ''
      if (msg.includes('local issuer certificate')) {
        useCurl = true
        result = await sendWithCurl(basePayload, apiKey)
      } else {
        throw error
      }
    }

    const resendMessage = (result.data?.message || '').toLowerCase()
    if (!result.ok && (resendMessage.includes('from') || resendMessage.includes('domain is not verified'))) {
      const fallbackPayload = {
        ...basePayload,
        from: 'onboarding@resend.dev',
      }
      result = useCurl ? await sendWithCurl(fallbackPayload, apiKey) : await sendWithFetch(fallbackPayload, apiKey)
    }

    if (!result.ok) {
      return sendJson(res, result.status, {
        ok: false,
        error: result.data?.message || result.raw || 'No se pudo enviar el correo',
      })
    }

    return sendJson(res, 200, { ok: true, id: result.data?.id || null })
  } catch (error) {
    const message = error instanceof Error ? `${error.message}${error.cause ? `: ${error.cause.message}` : ''}` : 'Unexpected error'
    return sendJson(res, 500, { ok: false, error: message })
  }
}
