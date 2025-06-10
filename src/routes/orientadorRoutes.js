const express = require('express');
const router = express.Router();
const OrientadorController = require('../controllers/orientadorController');

router.get('/', OrientadorController.getAll);
router.get('/:id', OrientadorController.getById);
router.post('/', OrientadorController.create);
router.put('/:id', OrientadorController.update);
router.delete('/:id', OrientadorController.delete);

module.exports = router;
