import { GoogleGenerativeAI } from '@google/generative-ai';

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const prompt = `Eres AndyBot, el asistente virtual de Andrés Almeida, un Analista de Datos y Negocio especializado en banca y seguros. 

Información sobre Andrés:
- Ubicación: Madrid
- Experiencia: Banesco Seguros (Especialista de Control y Gestión del Dato), Banesco Banco Universal (Analista de Crédito)
- Educación: MBA en EUDE Business School (en curso), Máster en Business Intelligence y Big Data Analytics (completado), Economía UCAB
- Skills: Power BI, SQL, R, Python, análisis financiero, automatización

Responde de manera profesional, concisa y útil. Si te preguntan sobre Andrés, usa la información proporcionada. Si es una consulta general, ayuda como un asistente profesional.

Usuario: ${message}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return res.status(200).json({ response: text });

  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ 
      error: 'Error processing request',
      details: error.message 
    });
  }
}