const Contato = require('./contatosModel')
const errorHandler = require('../common/errorHandler')

Contato.methods(['get', 'post', 'put', 'delete'])
Contato.updateOptions({ new: true, runValidators: true })
Contato.after('post', errorHandler).after('put', errorHandler)

module.exports = Contato