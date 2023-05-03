const express = require('express');
const router = express.Router();

const contactsController = require('../controllers/cards');

router.get('/', contactsController.getAll);

router.get('/:id', contactsController.getSingle);

router.post('/', contactsController.createCard);

module.exports = router;