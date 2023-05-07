const express = require('express');
const router = express.Router();
const contactsController = require('../controllers/cards');
const validation = require('../middleware/validate');

const cardsController = require('../controllers/cards');

router.get('/', cardsController.getAll);

router.get('/:id', cardsController.getSingle);

router.post('/', validation.saveCard, cardsController.createCard);

router.put('/:id',validation.saveCard, cardsController.updateCard);

router.delete('/:id', cardsController.deleteCard);

module.exports = router;