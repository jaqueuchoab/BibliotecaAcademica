const TrabalhoService = require('./trabalhoService');

const TrabalhoController = {
  getAll: (req, res) => {
    TrabalhoService.getAll((err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(results);
    });
  },

  getById: (req, res) => {
    const id = req.params.id;
    TrabalhoService.getById(id, (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      if (result.length === 0) return res.status(404).json({ message: 'Trabalho não encontrado' });
      res.json(result[0]);
    });
  },

  create: (req, res) => {
    TrabalhoService.create(req.body, (err, result) => {
      if (err) return res.status(400).json({ error: err.message });
      res.status(201).json({ id: result.insertId, ...req.body });
    });
  },

  update: (req, res) => {
    const id = req.params.id;
    TrabalhoService.update(id, req.body, (err, result) => {
      if (err) return res.status(400).json({ error: err.message });
      res.json({ message: 'Trabalho atualizado com sucesso' });
    });
  },

  delete: (req, res) => {
    const id = req.params.id;
    TrabalhoService.delete(id, (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: 'Trabalho deletado com sucesso' });
    });
  }
};

module.exports = TrabalhoController;
