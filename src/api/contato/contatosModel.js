const restful = require('node-restful')
const mongoose = restful.mongoose

const contatoSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true,
        maxlength: 80,
        minlength: 3
    },
    email: {
        type: String,
        unique: true,
        required: true
    }
})

module.exports = restful.model('Contact', contatoSchema)