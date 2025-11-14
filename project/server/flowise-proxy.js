import 'dotenv/config';
import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

const FLOWISE_BASE = process.env.FLOWISE_BASE || 'http://localhost:3000';
const FLOWISE_BEARER = process.env.FLOWISE_BEARER || '';

if (!FLOWISE_BEARER) {
  console.warn('WARNING: FLOWISE_BEARER not set. The proxy will forward requests without Authorization header.');
}

app.post('/api/andybot/:canvasId', async (req, res) => {
  try {
    const { canvasId } = req.params;
    const url = `${FLOWISE_BASE}/api/v1/prediction/${canvasId}`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        ...(FLOWISE_BEARER ? { Authorization: `Bearer ${FLOWISE_BEARER}` } : {}),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(req.body)
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Proxy error' });
  }
});

const port = process.env.PROXY_PORT || 4000;
app.listen(port, () => console.log(`Flowise proxy listening on http://localhost:${port}`));
