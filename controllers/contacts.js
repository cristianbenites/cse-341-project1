const { ObjectId } = require('mongodb');

const mongodb = require('../data/database');

const getAll = async (_, res) => {
    const result = await mongodb.getDatabase()
        .db()
        .collection('contacts')
        .find();

    result.toArray().then((contacts) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(contacts);
    });
};

const getById = async (req, res) => {
    const contactId = new ObjectId(req.params['id']);
    const result = await mongodb.getDatabase()
        .db()
        .collection('contacts')
        .find({ _id: contactId });

    result.toArray().then((contacts) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(contacts[0]);
    });
};

module.exports = {
    getAll,
    getById
};
