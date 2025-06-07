const express = require('express');
const cors = require('cors');
const listasRouter = require('./routes/listas');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.use('/listas', listasRouter);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}!`);
});