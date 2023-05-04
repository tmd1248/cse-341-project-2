const express = require('express');
const router = express.Router();

router.use('/cards', require('./cards'));
router.use('/decks', require('./decks'));

module.exports = router;