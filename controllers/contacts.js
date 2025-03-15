const { ObjectId } = require('mongodb');

const mongodb = require('../data/database');

const getAll = async (_, res) => {
    //#swagger.tags=['Contacts']
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
    //#swagger.tags=['Contacts']
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

const store = async (req, res) => {
    //#swagger.tags=['Contacts']
    const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    }

    const response = await mongodb.getDatabase()
        .db()
        .collection('contacts')
        .insertOne(user);

    if (response.acknowledged) {
        res.status(204).send();
    } else {
        res.status(500)
            .json(response.error || 'Some error occurred while creating the user.');
    }

};

const update = async (req, res) => {
    //#swagger.tags=['Contacts']
    const userId = new ObjectId(req.params.id);
    const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    }

    const response = await mongodb.getDatabase()
        .db()
        .collection('contacts')
        .replaceOne({ _id: userId}, user);

    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500)
            .json(response.error || 'Some error occurred while updating the user.');
    }
};

const deleteUser = async (req, res) => {
    //#swagger.tags=['Contacts']
    const userId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase()
        .db()
        .collection('contacts')
        .deleteOne({ _id: userId}, true);

    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500)
            .json(response.error || 'Some error occurred while deleting the user.');
    }
};

module.exports = {
    getAll,
    getById,
    store,
    update,
    deleteUser
};
