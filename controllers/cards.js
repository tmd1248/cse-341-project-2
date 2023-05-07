const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = (req, res) => {
  mongodb.getDb().db().collection('cards').find().toArray((err, lists) => {
     if (err) {
       res.status(400).json({message: err});
     }
     res.setHeader('Content-Type', 'application/json');
     res.status(200).json(lists);
   });
 };
 
 const getSingle = (req, res) => {
   const userId = new ObjectId(req.params.id);
   mongodb.getDb().db().collection('cards').find({_id: userId}).toArray((err, result) => {
     if (err) {
       res.status(400).json({message: err});
     }
     res.setHeader('Content-Type', 'application/json');
     res.status(200).json(result[0]);
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

const updateCard = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('We don\'t recognize that card ID.');
  }
  const userId = new ObjectId(req.params.id);
  // be aware of updateOne if you only want to update specific fields
  const card = {
    cardName: req.body.cardName,
    colors: req.body.colors,
    manaValue: req.body.manaValue,
    type: req.body.type,
    subtype: req.body.subtype,
    stats: req.body.stats,
    text: req.body.text
  };
  const response = await mongodb
    .getDb()
    .db()
    .collection('cards')
    .replaceOne({ _id: userId }, card);
  console.log(response);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while updating the card.');
  }
};
const deleteCard = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('We don\'t recognize that card ID.');
  }
  const userId = new ObjectId(req.params.id);
  const response = await mongodb.getDb().db().collection('cards').remove({ _id: userId }, true);
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while deleting the card.');
  }
};

module.exports = {
    getAll,
    getSingle,
    createCard,
    updateCard,
    deleteCard
  };
