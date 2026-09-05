const express = require('express');
const router = express.Router();
const db = require('../src/models/db');

// GET todas
router.get('/', (req, res) => {
  db.all("SELECT * FROM citas ORDER BY fecha DESC", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// GET una
router.get('/:id', (req, res) => {
  db.get("SELECT * FROM citas WHERE id = ?", [req.params.id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: "Cita no encontrada" });
    res.json(row);
  });
});

// POST crear
router.post('/', (req, res) => {
  const { nombre, telefono, diseno, fecha, hora } = req.body;
  if (!nombre || !telefono || !diseno || !fecha || !hora) {
    return res.status(400).json({ error: "Faltan campos: nombre, telefono, diseno, fecha, hora" });
  }
  db.run(
    "INSERT INTO citas (nombre, telefono, diseno, fecha, hora) VALUES (?,?,?,?,?)",
    [nombre, telefono, diseno, fecha, hora],
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      db.get("SELECT * FROM citas WHERE id = ?", [this.lastID], (err, row) => {
        res.status(201).json(row);
      });
    }
  );
});

// DELETE
router.delete('/:id', (req, res) => {
  db.run("DELETE FROM citas WHERE id = ?", [req.params.id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ error: "Cita no encontrada" });
    res.json({ mensaje: "Cita cancelada" });
  });
});

module.exports = router;