const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  const result = await mongodb.getDb().db().collection('decks').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

const getSingle = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const result = await mongodb.getDb().db().collection('decks').find({ _id: userId });
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
};

const createDeck = async (req, res) => {
  const deck = {
    deckName: req.body.deckName,
    card1Name: req.body.card1Name,
    card1Number: req.body.card1Number,
    card2Name: req.body.card2Name, 
    card2Number: req.body.card2Number
  };
  const response = await mongodb.getDb().db().collection('cards').insertOne(card);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'Some error occurred while entering the card.');
  }
};
module.exports = {
    getAll,
    getSingle,
    createDeck
  };