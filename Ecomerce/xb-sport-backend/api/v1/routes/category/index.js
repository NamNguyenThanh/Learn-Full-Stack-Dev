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
    const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, unique + '-' + file.originalname);
  },
});
const upload = multer({
  storage: storage,
});

const { asyncHandler } = require('../../helpers/async_handler');
const CategoryController = require('../../controllers/category.controller');

const router = express.Router();
const catUpload = upload.fields([
  { name: 'icon', maxCount: 1 },
  { name: 'thumbnail', maxCount: 1 },
]);
router.get('/', asyncHandler(CategoryController.getAllCategory));
router.post('/create', catUpload, asyncHandler(CategoryController.create));
router.delete('/delete/:id', asyncHandler(CategoryController.delete));

module.exports = router;
