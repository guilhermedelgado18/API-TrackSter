var express = require('express');
var router = express.Router();


let listas = [

];

router.get('/', (req, res) => {
  res.json(listas);
});

router.get('/:id', (req, res) => {
  const lista = listas.find(l => l.id == req.params.id);
  if (!lista) return res.status(404).json({ error: "Lista não encontrada" });
  res.json(lista);
});

router.post('/', (req, res) => {
  const novaLista = { ...req.body, id: Date.now(), itens: req.body.itens || [] };
  listas.push(novaLista);
  res.status(201).json(novaLista);
});

router.patch('/:id', (req, res) => {
  const idx = listas.findIndex(l => l.id == req.params.id);
  if (idx === -1) return res.status(404).json({ error: "Lista não encontrada" });
  listas[idx] = { ...listas[idx], ...req.body };
  res.json(listas[idx]);
});

router.delete('/:id', (req, res) => {
  const idx = listas.findIndex(l => l.id == req.params.id);
  if (idx === -1) return res.status(404).json({ error: "Lista não encontrada" });
  listas.splice(idx, 1);
  res.status(204).end();
});

module.exports = router;