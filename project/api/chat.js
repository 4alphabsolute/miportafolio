import { GoogleGenerativeAI } from '@google/generative-ai';

export default async function handler(req, res) {
  // Solo permitir POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({ error: 'Question is required' });
    }

    // Inicializar Gemini
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-pro-latest",
      generationConfig: {
        temperature: 0.7,
        topP: 0.8,
        topK: 40,
        maxOutputTokens: 1024,
      }
    });

    // Contexto sobre Andrés
    const context = `Eres AndyBot, el asistente virtual de Andrés Almeida. 

INFORMACIÓN SOBRE ANDRÉS:
- Nombre: Andrés Almeida
- Ubicación: Madrid, España
- Profesión: Analista de Datos y Negocio
- Email: soyandresalmeida@gmail.com
- Teléfono: (+34) 633-084828

EXPERIENCIA:
- Especialista de Control y Gestión del Dato en Banesco Seguros (2025-03 a 2025-06)
- Analista de Crédito en Banesco Banco Universal (2024-02 a 2025-02)

EDUCACIÓN:
- MBA en EUDE Business School (2025 - Presente)
- Máster en Business Intelligence y Big Data Analytics en EUDE Business School (2024-2025, Completado)
- Economía en Universidad Católica Andrés Bello (2018-2024, Completado)

HABILIDADES:
- Power BI (modelado, DAX)
- R (tidyverse)
- SQL (TOAD/Oracle)
- Python
- Análisis financiero y de riesgo
- Automatización low-code

PERFIL:
Analista de Datos y Negocio con base financiera y experiencia en banca y seguros. Especializado en estructurar información compleja, mejorar la calidad del dato y elaborar reportes ejecutivos para comités. Combina BI, análisis financiero y automatización con visión estratégica.

Responde de manera profesional, amigable y concisa. Si te preguntan sobre algo que no está en esta información, di que puedes conectar al visitante directamente con Andrés.`;

    const prompt = `${context}

Pregunta del usuario: ${question}

Responde como AndyBot de manera profesional y útil:`;

    // Generar respuesta
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return res.status(200).json({ 
      text: text,
      success: true 
    });

  } catch (error) {
    console.error('Error:', error);
    
    // Manejar errores específicos
    if (error.message.includes('API_KEY_INVALID')) {
      return res.status(401).json({ error: 'Invalid API key' });
    }
    
    if (error.message.includes('QUOTA_EXCEEDED')) {
      return res.status(429).json({ error: 'API quota exceeded' });
    }

    return res.status(500).json({ 
      error: 'Internal server error',
      message: error.message 
    });
  }
}