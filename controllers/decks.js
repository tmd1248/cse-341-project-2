const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = (req, res) => {
 mongodb.getDb().db().collection('decks').find().toArray((err, lists) => {
    if (err) {
      res.status(400).json({message: err});
    }
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

const getSingle = (req, res) => {
  const userId = new ObjectId(req.params.id);
  mongodb.getDb().db().collection('decks').find({_id: userId}).toArray((err, result) => {
    if (err) {
      res.status(400).json({message: err});
    }
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result[0]);
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
  const response = await mongodb.getDb().db().collection('decks').insertOne(deck);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'Some error occurred while entering the deck.');
  }
};

const updateDeck = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('We don\'t recognize that deck ID.');
  }
  const userId = new ObjectId(req.params.id);
  // be aware of updateOne if you only want to update specific fields
  const deck = {
    deckName: req.body.deckName,
    card1Name: req.body.card1Name,
    card1Number: req.body.card1Number,
    card2Name: req.body.card2Name, 
    card2Number: req.body.card2Number
  };
  const response = await mongodb
    .getDb()
    .db()
    .collection('decks')
    .replaceOne({ _id: userId }, deck);
  console.log(response);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while updating the deck.');
  }
};
const deleteDeck = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('We don\'t recognize that deck ID.');
  }
  const userId = new ObjectId(req.params.id);
  const response = await mongodb.getDb().db().collection('decks').remove({ _id: userId }, true);
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while deleting the deck.');
  }
};

module.exports = {
    getAll,
    getSingle,
    createDeck,
    updateDeck,
    deleteDeck
  };