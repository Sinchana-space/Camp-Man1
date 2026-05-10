const express = require('express');
const router = express.Router();
const pool = require('../config/database');

router.get('/', async (req, res) => {
  try {
    const { room_id, employee_id, status } = req.query;
    let query = 'SELECT i.*, r.room_number, c.name as camp_name, e.full_name as employee_name FROM inspections i LEFT JOIN rooms r ON i.room_id = r.id LEFT JOIN camps c ON r.camp_id = c.id LEFT JOIN employees e ON i.employee_id = e.id WHERE 1=1';
    let params = [];
    let paramCount = 1;
    if (room_id) { query += ` AND i.room_id = $${paramCount}`; params.push(room_id); paramCount++; }
    if (employee_id) { query += ` AND i.employee_id = $${paramCount}`; params.push(employee_id); paramCount++; }
    if (status) { query += ` AND i.status = $${paramCount}`; params.push(status); paramCount++; }
    query += ' ORDER BY i.inspection_date DESC';
    const result = await pool.query(query, params);
    res.json({ message: '✅ Inspections', data: result.rows });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const result = await pool.query('SELECT i.*, r.room_number, c.name as camp_name, e.full_name as employee_name FROM inspections i LEFT JOIN rooms r ON i.room_id = r.id LEFT JOIN camps c ON r.camp_id = c.id LEFT JOIN employees e ON i.employee_id = e.id WHERE i.id = $1', [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Not found' });
    const inspection = result.rows[0];
    if (inspection.photos && typeof inspection.photos === 'string') {
      try {
        inspection.photos = JSON.parse(inspection.photos);
      } catch (e) {
        inspection.photos = [];
      }
    }
    res.json({ message: '✅ Inspection', data: inspection });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const { room_id, employee_id, status, notes, photos, signature_url } = req.body;
    if (!room_id || !employee_id) return res.status(400).json({ error: 'Missing fields' });
    const roomExists = await pool.query('SELECT * FROM rooms WHERE id = $1', [room_id]);
    if (roomExists.rows.length === 0) return res.status(404).json({ error: 'Room not found' });
    const employeeExists = await pool.query('SELECT * FROM employees WHERE id = $1', [employee_id]);
    if (employeeExists.rows.length === 0) return res.status(404).json({ error: 'Employee not found' });
    let photosJson = null;
    if (Array.isArray(photos)) {
      photosJson = JSON.stringify(photos);
    } else if (typeof photos === 'string') {
      photosJson = photos;
    }
    const result = await pool.query('INSERT INTO inspections (room_id, employee_id, inspection_date, status, notes, photos, signature_url) VALUES ($1, $2, NOW(), $3, $4, $5, $6) RETURNING *', [room_id, employee_id, status || 'clean', notes || '', photosJson, signature_url || null]);
    if (status && status !== 'clean') {
      await pool.query('UPDATE rooms SET status = $1 WHERE id = $2', [status === 'damaged' ? 'maintenance' : 'available', room_id]);
    }
    res.status(201).json({ message: '✅ Created', data: result.rows[0] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { status, notes, photos, signature_url } = req.body;
    let photosJson = null;
    if (Array.isArray(photos)) {
      photosJson = JSON.stringify(photos);
    } else if (typeof photos === 'string') {
      photosJson = photos;
    }
    const result = await pool.query('UPDATE inspections SET status = COALESCE($1, status), notes = COALESCE($2, notes), photos = COALESCE($3, photos), signature_url = COALESCE($4, signature_url), updated_at = CURRENT_TIMESTAMP WHERE id = $5 RETURNING *', [status, notes, photosJson, signature_url, req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Not found' });
    res.json({ message: '✅ Updated', data: result.rows[0] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const result = await pool.query('DELETE FROM inspections WHERE id = $1 RETURNING *', [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Not found' });
    res.json({ message: '✅ Deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
