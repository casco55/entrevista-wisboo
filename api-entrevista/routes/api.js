const router = require('express').Router();

const apiUrlRouter = require('./api/url');

router.use('/url', apiUrlRouter);

module.exports = router;