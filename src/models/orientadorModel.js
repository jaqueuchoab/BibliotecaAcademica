const connection = require('../config/database');

// Funcionalidades para o modelo Orientador
const OrientadorModel = {
  getAll: (callback) => {
    const query = 'SELECT * FROM orientadores';
    connection.query(query, callback);
  },

  getById: (id, callback) => {
    const query = 'SELECT * FROM orientadores WHERE id = ?';
    connection.query(query, [id], callback);
  },

  create: (data, callback) => {
    const query = 'INSERT INTO orientadores (nome) VALUES (?)';
    connection.query(query, [data.nome], callback);
  },

  update: (id, data, callback) => {
    const query = 'UPDATE orientadores SET nome = ? WHERE id = ?';
    connection.query(query, [data.nome, id], callback);
  },

  delete: (id, callback) => {
    const query = 'DELETE FROM orientadores WHERE id = ?';
    connection.query(query, [id], callback);
  }
};

module.exports = OrientadorModel;
