const restful = require('node-restful')
const mongoose = restful.mongoose

const regulamentoSchema = new mongoose.Schema({
    categoria: {
        type: String,
        required: true,
        unique: true
    },
    arquivos: {
        type: {String},
        required: true

    }
})

module.exports = restful.model('Regulation', regulamentoSchema)