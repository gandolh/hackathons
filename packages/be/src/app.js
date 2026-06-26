require('dotenv').config();
const express = require('express');
const cors = require('cors');
const authRoutes = require('./auth');
const fileRoutes = require('../routes/fileRoutes');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json({ limit: '50mb' }));
app.use(cors({ origin: process.env.CORS_ORIGIN || 'http://localhost:5173' }));

app.use('/api', authRoutes);
app.use(fileRoutes);

app.get('/', (_req, res) => {
  res.json({ status: 'ok', service: 'yappinator-be' });
});

app.listen(PORT, () => {
  console.log(`[be] listening on http://localhost:${PORT}`);
});
