const OrientadorModel = require('../models/orientadorModel');

// Serviço para gerenciar orientadores
const OrientadorService = {
  getAll: (callback) => {
    OrientadorModel.getAll(callback);
  },

  getById: (id, callback) => {
    OrientadorModel.getById(id, callback);
  },

  create: (data, callback) => {
    if (!data.nome) {
      return callback(new Error('O campo "nome" é obrigatório.'));
    }
    OrientadorModel.create(data, callback);
  },

  update: (id, data, callback) => {
    if (!data.nome) {
      return callback(new Error('O campo "nome" é obrigatório.'));
    }
    OrientadorModel.update(id, data, callback);
  },

  delete: (id, callback) => {
    OrientadorModel.delete(id, callback);
  }
};

module.exports = OrientadorService;
