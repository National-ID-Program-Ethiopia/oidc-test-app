import express from 'express';
import axios from 'axios';
import { decodeUserinfoToken } from '../utils/userinfoDecoder.js';
import { toErrorResponse } from '../utils/appError.js';

const router = express.Router();

router.post('/', async (req, res) => {
  const { access_token } = req.body;

  if (!access_token) return res.status(400).json({ error: 'Missing access token' });

  try {
    const response = await axios.get(process.env.USERINFO_ENDPOINT, {
      headers: { Authorization: `Bearer ${access_token}` },
      responseType: 'text'
    });

    const userInfo = await decodeUserinfoToken(response.data);
    res.json(userInfo);
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json(toErrorResponse(err, 'Could not load your profile'));
  }
});

export default router;