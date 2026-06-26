const express = require('express');
const hash = require('object-hash');
const db = require('../src/db');
const { buildDashboard } = require('../src/utils');
const { requireAuth } = require('../src/middleware');

const router = express.Router();

// POST /api/sendFile — parse and store a conversation, return its ID
router.post('/api/sendFile', requireAuth, (req, res) => {
  const messageArray = req.body;
  if (!Array.isArray(messageArray) || messageArray.length === 0) {
    return res.status(400).json({ error: 'Expected a non-empty array of messages.' });
  }

  const convId = hash.MD5(messageArray);
  const existing = db.prepare('SELECT id FROM conversations WHERE id = ?').get(convId);
  if (existing) {
    return res.status(200).json({ ID: convId });
  }

  const dashboard = buildDashboard(messageArray);
  db.prepare('INSERT INTO conversations (id, user_id, data) VALUES (?, ?, ?)').run(
    convId,
    req.user.userId,
    JSON.stringify(dashboard)
  );

  res.status(201).json({ ID: convId });
});

// GET /api/:ID — retrieve dashboard data for a conversation
router.get('/api/:ID', requireAuth, (req, res) => {
  const row = db.prepare('SELECT data, user_id FROM conversations WHERE id = ?').get(req.params.ID);
  if (!row) {
    return res.status(404).json({ error: 'Conversation not found.' });
  }
  if (row.user_id !== req.user.userId) {
    return res.status(403).json({ error: 'Forbidden.' });
  }
  res.status(200).json(JSON.parse(row.data));
});

module.exports = router;
