const express = require('express');
const router = express.Router();
const pool = require('../config/database');

router.get('/', async (req, res) => {
  try {
    const { camp_id, status, shift } = req.query;
    let query = 'SELECT e.*, c.name as camp_name FROM employees e LEFT JOIN camps c ON e.camp_id = c.id WHERE 1=1';
    let params = [];
    let paramCount = 1;
    if (camp_id) { query += ` AND e.camp_id = $${paramCount}`; params.push(camp_id); paramCount++; }
    if (status) { query += ` AND e.status = $${paramCount}`; params.push(status); paramCount++; }
    if (shift) { query += ` AND e.shift = $${paramCount}`; params.push(shift); paramCount++; }
    query += ' ORDER BY e.created_at DESC';
    const result = await pool.query(query, params);
    res.json({ message: '✅ Employees', data: result.rows });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const result = await pool.query('SELECT e.*, c.name as camp_name FROM employees e LEFT JOIN camps c ON e.camp_id = c.id WHERE e.id = $1', [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Not found' });
    res.json({ message: '✅ Employee', data: result.rows[0] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const { user_id, camp_id, full_name, email, phone, shift, position } = req.body;
    if (!camp_id || !full_name) return res.status(400).json({ error: 'Missing fields' });
    const campExists = await pool.query('SELECT * FROM camps WHERE id = $1', [camp_id]);
    if (campExists.rows.length === 0) return res.status(404).json({ error: 'Camp not found' });
    const result = await pool.query(
      'INSERT INTO employees (user_id, camp_id, full_name, email, phone, shift, position, status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
      [user_id || null, camp_id, full_name, email || null, phone || null, shift || 'morning', position || '', 'active']);
    res.status(201).json({ message: '✅ Created', data: result.rows[0] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { full_name, email, phone, shift, position, status } = req.body;
    const result = await pool.query(
      'UPDATE employees SET full_name = COALESCE($1, full_name), email = COALESCE($2, email), phone = COALESCE($3, phone), shift = COALESCE($4, shift), position = COALESCE($5, position), status = COALESCE($6, status), updated_at = CURRENT_TIMESTAMP WHERE id = $7 RETURNING *',
      [full_name, email, phone, shift, position, status, req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Not found' });
    res.json({ message: '✅ Updated', data: result.rows[0] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const result = await pool.query('DELETE FROM employees WHERE id = $1 RETURNING *', [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Not found' });
    res.json({ message: '✅ Deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;


