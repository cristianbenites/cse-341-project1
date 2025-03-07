const router = require('express').Router();

const contactsController = require('../controllers/contacts');

router.get('/contacts', contactsController.getAll);
router.get('/contacts/:id', contactsController.getById);

module.exports = router;
