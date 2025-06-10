const express = require('express');
const multer = require('multer');
const Grid = require('gridfs-stream');
const mongoose = require('mongoose');
const { Lista } = require('../../trackster/listaSchema');
const { GridFsStorage } = require('multer-gridfs-storage');

require('dotenv').config();

const router = express.Router();

const uri = process.env.MONGO_URI;
const connection = mongoose.connection;
let gfs;

connection.once('open', () => {
  gfs = Grid(connection.db, mongoose.mongo);
  gfs.collection('uploads')
})

const storage = new GridFsStorage({
  url: uri,
  file: (req, file) => ({
    filename: `${Date.now()}-${file.originalname}`,
    bucketName: 'uploads'
  })
});
const upload = multer({ storage });

router.get('/', async (req, res) => {
  const listas = await Lista.find()
  res.json(listas);
});

router.get('/:id', async (req, res) => {
  const lista = await Lista.findOne({ id: req.params.id })
  if (!lista) return res.status(404).json({ error: "Lista não encontrada" });
  res.json(lista);
});

router.post('/', async (req, res) => {
  const novaLista = new Lista({
    ...req.body,
    id: Date.now().toString(),
  });
  await novaLista.save();
  res.status(201).json(novaLista);
});

router.patch('/:id', async (req, res) => {
  const lista = await Lista.findOneAndUpdate({ id: req.params.id }, req.body, { new: true });
  if (!lista) return res.status(404).json({ error: "Lista não encontrada" });
  res.json(lista);
});

router.delete('/:id', async (req, res) => {
  await Lista.deleteOne({ id: req.params.id });
  res.status(204).end();
});

router.post('/upload', upload.single('imagem'), (req, res) => {
  res.json({ file: req.file });
});

router.get('/imagem/:id', async (req, res) => {
  try {
    const file = await gfs.files.findOne({ _id: new mongoose.Types.ObjectId(req.params.id) });
    if (!file) return res.status(404).json({ error: 'Arquivo não encontrado' });

    const readstream = gfs.createReadStream({ _id: file._id });
    res.set('Content-Type', file.contentType);
    readstream.pipe(res);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar imagem' });
  }
});

module.exports = router;