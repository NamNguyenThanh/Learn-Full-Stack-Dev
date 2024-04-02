'use strict';
const express = require('express');
const v1Router = require('./v1/routes');
const router = express.Router();

// api v1
router.use('/api/v1', v1Router);

module.exports = router;
