const router = require('express').Router();

const contactsController = require('../controllers/contacts');

router.get('/contacts', contactsController.getAll);
router.get('/contacts/:id', contactsController.getById);
router.post('/contacts', contactsController.store);
router.put('/contacts/:id', contactsController.update);
router.delete('/contacts/:id', contactsController.deleteUser);

module.exports = router;
