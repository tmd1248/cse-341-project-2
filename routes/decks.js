const express = require('express');
const router = express.Router();

const contactsController = require('../controllers/decks');

router.get('/', contactsController.getAll);

router.get('/:id', contactsController.getSingle);

router.post('/', contactsController.createDeck);

module.exports = router;