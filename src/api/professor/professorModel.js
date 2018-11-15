const restful = require('node-restful')
const mongoose = restful.mongoose

const professorSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true,
        unique: true,
        maxlength: 80,
        minlength: 3
    },
    email: {
        type: String,
        unique: true,
        match: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        required: true
    }
})

module.exports = restful.model('Teacher', professorSchema)