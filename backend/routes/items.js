const checkAuth = require('../middleware/check-auth');
// const admin = require('../middleware/admin');
const { Item, validateItem } = require('../models/item');
const mongoose = require('mongoose');
const express = require('express');
const multer = require('multer');
const router = express.Router();

const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg',
  'application/msword': 'doc',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
    'docx',
  'application/pdf': 'pdf'
};

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error('Invalid mime type');
    if (isValid) {
      error = null;
    }
    cb(error, 'backend/docFile');
  },
  filename: function(req, file, cb) {
    const name = file.originalname
      .toLowerCase()
      .split(' ')
      .join('-');
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, Date.now() + '-' + name + '.' + ext);
  }
});

const upload = multer({ storage: storage });

router.get('/', (req, res) => {
  Item.find()
    .sort('creator')
    .then((documents) => {
      res.status(200).json({
        message: 'Item fetched successfully',
        items: documents
      });
    });
});

router.post('/', checkAuth, upload.single('docFile'), (req, res) => {
  const url = req.protocol + '://' + req.get('host');
  // const path = req.file.path.replace('\\', '/');
  const item = new Item({
    title: req.body.title,
    writer: req.body.writer,
    category: req.body.category,
    contentType: req.body.contentType,
    wordCount: req.body.wordCount,
    docPath: url + '/files/' + req.file.filename,
    creator: req.userData.userId

    // docPath: url + '/' + path
  });
  item.save().then((createdItem) => {
    res.status(201).json({
      message: 'Item added successfully',
      item: {
        ...createdItem,
        id: createdItem._id
      }
    });
  });
});

router.put('/:id', checkAuth, upload.single('docFile'), (req, res) => {
  let docPath = req.body.docPath;
  if (req.file) {
    const url = req.protocol + '://' + req.get('host');
    // const path = req.file.path.replace('\\', '/');
    docPath = url + '/files/' + req.file.filename;
  }
  const item = new Item({
    _id: req.body.id,
    title: req.body.title,
    writer: req.body.writer,
    category: req.body.category,
    contentType: req.body.contentType,
    wordCount: req.body.wordCount,
    docPath: docPath,
    creator: req.userData.userId
  });

  // if (!item)
  //   return res.status(404).send('The item with the given ID was not found.');

  Item.updateOne({ _id: req.params.id }, item).then((result) => {
    res.status(200).json({ message: 'Update successfull' });
    res.send(result);
  });
});

router.delete('/:id', checkAuth, (req, res) => {
  Item.deleteOne({ _id: req.params.id }).then((result) => {
    console.log(result);
    res.status(200).json({
      message: 'Item deleted'
    });
  });
});

router.get('/:id', (req, res) => {
  Item.findById(req.params.id).then((item) => {
    if (item) {
      res.status(200).json(item);
    } else {
      res.status(404).json({ message: 'Item not found!' });
    }
  });
});

module.exports = router;
