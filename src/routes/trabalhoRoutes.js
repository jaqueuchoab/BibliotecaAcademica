const express = require('express');
const router = express.Router();
const TrabalhoController = require('../controllers/trabalhoController');

router.get('/', TrabalhoController.getAll);
router.get('/:id', TrabalhoController.getById);
router.post('/', TrabalhoController.create);
router.put('/:id', TrabalhoController.update);
router.delete('/:id', TrabalhoController.delete);

module.exports = router;
