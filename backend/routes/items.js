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
  'image/jpg': 'jpg'
};

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error('Invalid mime type');
    if (isValid) {
      error = null;
    }
    cb(null, './uploads/creatorfile/');
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

router.get('/', async (req, res) => {
  const items = await Item.find().sort('title');
  res.send(items);
});

router.post('/', checkAuth, upload.single('docFile'), async (req, res) => {
  const { error } = validateItem(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const url = req.protocol + '://' + req.get('host');
  // const path = req.file.path.replace('\\', '/');
  let item = new Item({
    title: req.body.title,
    writer: req.body.writer,
    category: req.body.category,
    contentType: req.body.contentType,
    wordCount: req.body.wordCount,
    // docPath: url + '/files/' + req.file.filename
    docPath: url + '/files/' + req.file.filename

    // docPath: url + '/' + path
  });
  item = await item.save();

  res.json(item);
});

router.put('/:id', checkAuth, upload.single('docFile'), async (req, res) => {
  const { error } = validateItem(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  let docPath = req.body.docPath;
  if (req.file) {
    const url = req.protocol + '://' + req.get('host');
    // const path = req.file.path.replace('\\', '/');
    docPath = url + '/files/' + req.file.filename;
  }
  const item = await Item.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title,
      writer: req.body.writer,
      category: req.body.category,
      contentType: req.body.contentType,
      wordCount: req.body.wordCount,
      docPath: docPath
    },
    {
      new: true
    }
  );

  if (!item)
    return res.status(404).send('The item with the given ID was not found.');

  res.send(item);
});

router.delete('/:id', checkAuth, async (req, res) => {
  const item = await Item.findByIdAndRemove(req.params.id);

  if (!item)
    return res.status(404).send('The item with the given ID was not found.');

  res.send(item);
});

router.get('/:id', async (req, res) => {
  const item = await Item.findById(req.params.id);

  if (!item)
    return res.status(404).send('The item with the given ID was not found.');

  res.send(item);
});

module.exports = router;
