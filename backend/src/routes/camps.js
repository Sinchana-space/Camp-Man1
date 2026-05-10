const express = require('express');
const router = express.Router();
const pool = require('../config/database');

router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM camps ORDER BY created_at DESC');
    res.json({ message: '✅ Camps', data: result.rows, count: result.rows.length });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const campResult = await pool.query('SELECT * FROM camps WHERE id = $1', [req.params.id]);
    if (campResult.rows.length === 0) return res.status(404).json({ error: 'Not found' });
    res.json({ message: '✅ Camp', data: campResult.rows[0] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const { name, location, capacity, description } = req.body;
    if (!name || !location || !capacity) return res.status(400).json({ error: 'Missing fields' });
    const result = await pool.query(
      'INSERT INTO camps (name, location, capacity, description, status) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [name, location, capacity, description || '', 'active']);
    res.status(201).json({ message: '✅ Created', data: result.rows[0] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { name, location, capacity, status, description } = req.body;
    const result = await pool.query(
      'UPDATE camps SET name = COALESCE($1, name), location = COALESCE($2, location), capacity = COALESCE($3, capacity), status = COALESCE($4, status), description = COALESCE($5, description), updated_at = CURRENT_TIMESTAMP WHERE id = $6 RETURNING *',
      [name, location, capacity, status, description, req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Not found' });
    res.json({ message: '✅ Updated', data: result.rows[0] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const result = await pool.query('DELETE FROM camps WHERE id = $1 RETURNING *', [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Not found' });
    res.json({ message: '✅ Deleted', data: result.rows[0] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

