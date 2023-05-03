const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  const result = await mongodb.getDb().db().collection('cards').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

const getSingle = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const result = await mongodb.getDb().db().collection('cards').find({ _id: userId });
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
};

const createCard = async (req, res) => {
  const card = {
    cardName: req.body.cardName,
    colors: req.body.colors,
    manaValue: req.body.manaValue,
    type: req.body.type,
    subtype: req.body.subtype,
    stats: req.body.stats,
    text: req.body.text
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
    createCard
  };
