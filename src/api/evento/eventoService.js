const Evento = require('./eventoModel')
const errorHandler = require('../common/errorHandler')

Evento.methods(['get', 'post', 'put', 'delete'])
Evento.updateOptions({ new: true, runValidators: true })
Evento.after('post', errorHandler).after('put', errorHandler)

module.exports = Evento