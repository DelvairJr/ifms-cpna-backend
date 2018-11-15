const restful = require('node-restful')
const mongoose = restful.mongoose

const eventoSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true,
        minlength: 3
    },
    data: {
        type: String,
        required: true
    },
    descricao: {
        type: String,
        required: false
    }
})

module.exports = restful.model('Event', eventoSchema)