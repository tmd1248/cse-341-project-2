const express = require('express');
const router = express.Router();
const contactsController = require('../controllers/decks');
const validation = require('../middleware/validate');

const decksController = require('../controllers/decks');

router.get('/', decksController.getAll);

router.get('/:id', decksController.getSingle);

router.post('/', validation.saveDeck, decksController.createDeck);

router.put('/:id', validation.saveDeck, decksController.updateDeck);

router.delete('/:id', decksController.deleteDeck);

module.exports = router;