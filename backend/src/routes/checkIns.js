const express = require('express');
const router = express.Router();
const pool = require('../config/database');

router.get('/', async (req, res) => {
  try {
    const { employee_id, room_id, status } = req.query;
    let query = 'SELECT ci.*, e.full_name as employee_name, r.room_number, c.name as camp_name FROM check_ins ci LEFT JOIN employees e ON ci.employee_id = e.id LEFT JOIN rooms r ON ci.room_id = r.id LEFT JOIN camps c ON r.camp_id = c.id WHERE 1=1';
    let params = [];
    let paramCount = 1;
    if (employee_id) { query += ` AND ci.employee_id = $${paramCount}`; params.push(employee_id); paramCount++; }
    if (room_id) { query += ` AND ci.room_id = $${paramCount}`; params.push(room_id); paramCount++; }
    if (status) { query += ` AND ci.status = $${paramCount}`; params.push(status); paramCount++; }
    query += ' ORDER BY ci.check_in_time DESC';
    const result = await pool.query(query, params);
    res.json({ message: '✅ Check-ins', data: result.rows });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const result = await pool.query('SELECT ci.*, e.full_name as employee_name, r.room_number, c.name as camp_name FROM check_ins ci LEFT JOIN employees e ON ci.employee_id = e.id LEFT JOIN rooms r ON ci.room_id = r.id LEFT JOIN camps c ON r.camp_id = c.id WHERE ci.id = $1', [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Not found' });
    res.json({ message: '✅ Check-in', data: result.rows[0] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const { employee_id, room_id, notes } = req.body;
    if (!employee_id || !room_id) return res.status(400).json({ error: 'Missing fields' });
    const employeeExists = await pool.query('SELECT * FROM employees WHERE id = $1', [employee_id]);
    if (employeeExists.rows.length === 0) return res.status(404).json({ error: 'Employee not found' });
    const roomExists = await pool.query('SELECT * FROM rooms WHERE id = $1', [room_id]);
    if (roomExists.rows.length === 0) return res.status(404).json({ error: 'Room not found' });
    const result = await pool.query('INSERT INTO check_ins (employee_id, room_id, check_in_time, status, notes) VALUES ($1, $2, NOW(), $3, $4) RETURNING *', [employee_id, room_id, 'checked_in', notes || '']);
    await pool.query('UPDATE rooms SET current_occupancy = current_occupancy + 1 WHERE id = $1', [room_id]);
    res.status(201).json({ message: '✅ Checked in', data: result.rows[0] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { notes } = req.body;
    const checkInData = await pool.query('SELECT * FROM check_ins WHERE id = $1', [req.params.id]);
    if (checkInData.rows.length === 0) return res.status(404).json({ error: 'Not found' });
    const checkIn = checkInData.rows[0];
    const result = await pool.query('UPDATE check_ins SET check_out_time = NOW(), status = $1, notes = $2 WHERE id = $3 RETURNING *', ['checked_out', notes || checkIn.notes, req.params.id]);
    await pool.query('UPDATE rooms SET current_occupancy = GREATEST(0, current_occupancy - 1) WHERE id = $1', [checkIn.room_id]);
    res.json({ message: '✅ Checked out', data: result.rows[0] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const checkInData = await pool.query('SELECT * FROM check_ins WHERE id = $1', [req.params.id]);
    if (checkInData.rows.length === 0) return res.status(404).json({ error: 'Not found' });
    const checkIn = checkInData.rows[0];
    const result = await pool.query('DELETE FROM check_ins WHERE id = $1 RETURNING *', [req.params.id]);
    if (checkIn.status === 'checked_in') {
      await pool.query('UPDATE rooms SET current_occupancy = GREATEST(0, current_occupancy - 1) WHERE id = $1', [checkIn.room_id]);
    }
    res.json({ message: '✅ Deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;