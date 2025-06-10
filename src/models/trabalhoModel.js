const connection = require('../config/database');

const TrabalhoModel = {
  getAll: (callback) => {
    const query = `
      SELECT t.id, t.titulo, o.nome AS orientador
      FROM trabalhos t
      LEFT JOIN orientadores o ON t.orientador_id = o.id
    `;
    connection.query(query, callback);
  },

  getById: (id, callback) => {
    const query = `
      SELECT t.id, t.titulo, o.nome AS orientador
      FROM trabalhos t
      LEFT JOIN orientadores o ON t.orientador_id = o.id
      WHERE t.id = ?
    `;
    connection.query(query, [id], callback);
  },

  create: (data, callback) => {
    const query = 'INSERT INTO trabalhos (titulo, orientador_id) VALUES (?, ?)';
    connection.query(query, [data.titulo, data.orientador_id], callback);
  },

  update: (id, data, callback) => {
    const query = 'UPDATE trabalhos SET titulo = ?, orientador_id = ? WHERE id = ?';
    connection.query(query, [data.titulo, data.orientador_id, id], callback);
  },

  delete: (id, callback) => {
    const query = 'DELETE FROM trabalhos WHERE id = ?';
    connection.query(query, [id], callback);
  }
};

module.exports = TrabalhoModel;
