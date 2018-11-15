const restful = require('node-restful')
const mongoose = restful.mongoose

const Professor = require('../professor/professorModel')

const permanenciaSchema = new mongoose.Schema({
    dia_semana: {
        type: String,
        required: true
    },
    hrs_inicio: {
        type: String,
        required: true
    },
    hrs_final: {
        type: String,
        required: true
    },
    local: {
        type: String,
        required: true
    },
    professor: {
        //type: mongoose.Schema.Types.ObjectId,
        //ref: 'Professor',
        type: String,
        required: true
    }
})

module.exports = restful.model('Horario_Permanencia', permanenciaSchema)