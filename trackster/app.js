
const express = require('express');
const cors = require('cors');
const listasRouter = require('./routes/listas');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const PORT = 3001;

const uri = process.env.MONGO_URI;

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB conectado!'))
.catch(err => console.error('Erro ao conectar no MongoDB:', err));

app.use(cors());

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use('/listas', listasRouter);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}!`);
});