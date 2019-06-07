// const auth = require('../middleware/auth');
// const admin = require('../middleware/admin');
const { Item, validateItem } = require('../models/item');
const mongoose = require('mongoose');
const express = require('express');
const multer = require('multer');
const router = express.Router();

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads/creatorfile/');
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

router.get('/', async (req, res) => {
  const items = await Item.find().sort('title');
  res.send(items);
});

router.post('/', upload.single('itemDocFile'), async (req, res) => {
  const { error } = validateItem(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const url = req.protocol + '://' + req.get('host');
  let item = new Item({
    title: req.body.title,
    writer: req.body.writer,
    category: req.body.category,
    contentType: req.body.contentType,
    wordCount: req.body.wordCount,
    docPath: url + '/files/' + req.file.filename
  });
  item = await item.save();

  res.json(item);
});

router.put('/:id', upload.single('itemDocFile'), async (req, res) => {
  const { error } = validateItem(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const item = await Item.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title,
      writer: req.body.writer,
      category: req.body.category,
      contentType: req.body.contentType,
      wordCount: req.body.wordCount
      // itemDocFile: req.file.path
    },
    {
      new: true
    }
  );

  if (!item)
    return res.status(404).send('The item with the given ID was not found.');

  res.send(item);
});

router.delete('/:id', async (req, res) => {
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
