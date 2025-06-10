const mongoose = require('mongoose');

const ComentarioSchema = new mongoose.Schema({
    autor: String,
    texto: String,
    data: { type: Date, default : Date.now },
}, { _id: false });

const AvaliacaoSchema = new mongoose.Schema({
    usuario: String,
    nota: { type: Number, min: 1, max: 5},
    comentario: String,
    data: { type: Date, default : Date.now }
}, { _id: false });

const ItemSchema = new mongoose.Schema({
    id: { type: Number, required: true },
    nome: String,
    descricao: String,
    imagens: [String],
    adquirido: { type: Boolean, default: false},
    comentarios: [ComentarioSchema],
    avaliacoes: [AvaliacaoSchema]
}, { _id: false });

const ListaSchema = new mongoose.Schema({
    id: { type: Number, required: true },
    titulo: {type: String, required: true},
    descricao: String,
    imagem: { type: String, default: null },
    adquiridos: { type: Number, default: 0},
    total: { type: Number, default: 0},
    progresso: { type: Number, default: 0},
    itens: [ItemSchema]
})

const Lista = mongoose.model('Lista', ListaSchema);

module.exports = { Lista };