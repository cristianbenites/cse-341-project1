const router = require('express').Router();

router.get('/', (_, res) => res.send('Hello World'));

router.use(require('./contacts'));

module.exports = router;
