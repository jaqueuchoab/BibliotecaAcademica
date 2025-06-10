const OrientadorService = require('../services/orientadorService');

const OrientadorController = {
  getAll: (req, res) => {
    OrientadorService.getAll((err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(results);
    });
  },

  getById: (req, res) => {
    const id = req.params.id;
    OrientadorService.getById(id, (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      if (result.length === 0) return res.status(404).json({ message: 'Orientador não encontrado' });
      res.json(result[0]);
    });
  },

  create: (req, res) => {
    OrientadorService.create(req.body, (err, result) => {
      if (err) return res.status(400).json({ error: err.message });
      res.status(201).json({ id: result.insertId, ...req.body });
    });
  },

  update: (req, res) => {
    const id = req.params.id;
    OrientadorService.update(id, req.body, (err, result) => {
      if (err) return res.status(400).json({ error: err.message });
      res.json({ message: 'Orientador atualizado com sucesso' });
    });
  },

  delete: (req, res) => {
    const id = req.params.id;
    OrientadorService.delete(id, (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: 'Orientador deletado com sucesso' });
    });
  }
};

module.exports = OrientadorController;
