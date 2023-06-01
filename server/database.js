const sqlite3 = require('sqlite3').verbose();

// Crear una nueva conexión a la base de datos
const db = new sqlite3.Database('database.db'); // Puedes utilizar un archivo en disco en lugar de ':memory:' si deseas persistencia

// Crear la tabla de usuarios (puedes adaptarla según tus necesidades)
db.run(`CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  password TEXT NOT NULL
)`);

// Función para guardar un nuevo usuario en la base de datos
function createUser(name, email, password) {
    db.run('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, password], (err) => {
        if (err) {
            console.error(err);
        } else {
            console.log('Usuario creado exitosamente');
        }
    });
}

module.exports = {
    db,
    createUser,
};