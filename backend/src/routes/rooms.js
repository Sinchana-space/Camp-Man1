const express = require('express');
const router = express.Router();
const pool = require('../config/database');

router.get('/', async (req, res) => {
  try {
    const { camp_id, status } = req.query;
    let query = 'SELECT * FROM rooms WHERE 1=1';
    let params = [];
    let paramCount = 1;
    if (camp_id) { query += ` AND camp_id = $${paramCount}`; params.push(camp_id); paramCount++; }
    if (status) { query += ` AND status = $${paramCount}`; params.push(status); paramCount++; }
    query += ' ORDER BY room_number ASC';
    const result = await pool.query(query, params);
    res.json({ message: '✅ Rooms', data: result.rows });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM rooms WHERE id = $1', [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Not found' });
    res.json({ message: '✅ Room', data: result.rows[0] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const { camp_id, room_number, block, capacity, category } = req.body;
    if (!camp_id || !room_number || !capacity) return res.status(400).json({ error: 'Missing fields' });
    const existing = await pool.query('SELECT * FROM rooms WHERE camp_id = $1 AND room_number = $2', [camp_id, room_number]);
    if (existing.rows.length > 0) return res.status(400).json({ error: 'Exists' });
    const result = await pool.query(
      'INSERT INTO rooms (camp_id, room_number, block, capacity, category, status, current_occupancy) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [camp_id, room_number, block || '', capacity, category || 'dorm', 'available', 0]);
    res.status(201).json({ message: '✅ Created', data: result.rows[0] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { room_number, block, capacity, status, category, current_occupancy } = req.body;
    const result = await pool.query(
      'UPDATE rooms SET room_number = COALESCE($1, room_number), block = COALESCE($2, block), capacity = COALESCE($3, capacity), status = COALESCE($4, status), category = COALESCE($5, category), current_occupancy = COALESCE($6, current_occupancy), updated_at = CURRENT_TIMESTAMP WHERE id = $7 RETURNING *',
      [room_number, block, capacity, status, category, current_occupancy, req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Not found' });
    res.json({ message: '✅ Updated', data: result.rows[0] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const result = await pool.query('DELETE FROM rooms WHERE id = $1 RETURNING *', [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Not found' });
    res.json({ message: '✅ Deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;