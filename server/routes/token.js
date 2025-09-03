import express from 'express';
import axios from 'axios';
import { generateSignedJwt } from '../utils/jwtGenerator.js';

const router = express.Router();

router.post('/', async (req, res) => {
  const { code } = req.body;

  if (!code) return res.status(400).json({ error: 'Missing code' });

  try {
    const jwt = await generateSignedJwt();

    const params = new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      redirect_uri: process.env.REDIRECT_URI,
      client_id: process.env.CLIENT_ID,
      client_assertion_type: process.env.CLIENT_ASSERTION_TYPE,
      client_assertion: jwt,
      code_verifier: 'dBjftJeZ4CVP-mB92K27uhbUJU1p1r_wW1gFWFOEjXk'
    });

    const response = await axios.post(
      process.env.TOKEN_ENDPOINT,
      params.toString(),
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
       responseType: 'text', // 🛠️ Force response to be treated as raw text
        transformResponse: [data => data] // 🛠️ Disable auto JSON parsing
       }
      
    );

    // return res.json(response.data);
    const rawData = response.data;

    let parsedData;

    if (typeof rawData === 'string') {
      try {
        parsedData = JSON.parse(rawData); // Convert JSON string to object
      } catch (err) {
        return res.status(500).json({ error: 'Invalid JSON from API' });
      }
    } else {
      parsedData = rawData; // already an object
    }

return res.json(parsedData);
  } catch (err) {
    console.error(err.response?.data || err.message);
    return res.status(500).json({ error: 'Token request failed' });
  }
});

export default router;