const validator = require('../helpers/validate');

const saveCard = (req, res, next) => {
  const validationRule = {
    "cardName": "required|string" ,
    "colors": "required|string",
    "manaValue": "required|integer",
    "type": "required|string",
    "subtype": "required|string",
    "stats": "required|string",
    "text": "required|string"
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

const saveDeck = (req, res, next) => {
    const validationRule = {
      "deckName": "required|string" ,
    };
    validator(req.body, validationRule, {}, (err, status) => {
      if (!status) {
        res.status(412).send({
          success: false,
          message: 'Validation failed',
          data: err
        });
      } else {
        next();
      }
    });
  };

module.exports = {
  saveCard,
  saveDeck
};