const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(('./citas.db'), (error) => {
    if(error) {
        return console.error(error);
    }
});

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS citas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    telefono TEXT NOT NULL,
    diseno TEXT NOT NULL,
    fecha TEXT NOT NULL,
    hora TEXT NOT NULL,
    creado_en DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);
});

module.exports = db;