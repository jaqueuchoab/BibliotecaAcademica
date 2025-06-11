const TrabalhoModel = require('../models/trabalhoModel');

// Serviço para gerenciar trabalhos
const TrabalhoService = {
  getAll: (callback) => {
    TrabalhoModel.getAll(callback);
  },

  getById: (id, callback) => {
    TrabalhoModel.getById(id, callback);
  },

  create: (data, callback) => {
    if (!data.titulo || !data.orientador_id) {
      return callback(new Error('Campos "titulo" e "orientador_id" são obrigatórios.'));
    }
    TrabalhoModel.create(data, callback);
  },

  update: (id, data, callback) => {
    if (!data.titulo || !data.orientador_id) {
      return callback(new Error('Campos "titulo" e "orientador_id" são obrigatórios.'));
    }
    TrabalhoModel.update(id, data, callback);
  },

  delete: (id, callback) => {
    TrabalhoModel.delete(id, callback);
  }
};

module.exports = TrabalhoService;
