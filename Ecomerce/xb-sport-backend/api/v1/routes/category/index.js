'use strict';
const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const pth = path.join(__dirname, '../../public/images/categories');
    fs.mkdirSync(pth, { recursive: true });
    cb(null, pth);
  },
  filename: function (req, file, cb) {
    // cb(null, Date.now() + '-' + file.originalname);
    cb(null, file.originalname);
  },
});
const upload = multer({
  storage: storage,
});

const { asyncHandler } = require('../../helpers/async_handler');
const CategoryController = require('../../controllers/category.controller');
const { authentication, apiKey, permission } = require('../../auth/auth_utils');

const router = express.Router();
router.use(asyncHandler(apiKey));
router.use(permission('access-shop'));

// Check authentication and set req.keyToken (get from db) if request is authenticated
router.use(authentication);

const catUpload = upload.fields([
  { name: 'icon', maxCount: 1 },
  { name: 'thumbnail', maxCount: 1 },
]);
router.post('/create', catUpload, asyncHandler(CategoryController.create));

module.exports = router;
