import express from 'express';
import axios from 'axios';
import { generateSignedJwt } from '../utils/jwtGenerator.js';
import { toErrorResponse } from '../utils/appError.js';

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
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
    );

    res.json({
      access_token: response.data.access_token,
      id_token: response.data.id_token
    });
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json(toErrorResponse(err, 'Sign-in could not be completed'));
  }
});

export default router;