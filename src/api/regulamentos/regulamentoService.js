const Regulamento = require('./regulamentoModel')
const errorHandler = require('../common/errorHandler')

Regulamento.methods(['get', 'post', 'put', 'delete'])
Regulamento.updateOptions({ new: true, runValidators: true })
Regulamento.after('post', errorHandler).after('put', errorHandler)

module.exports = Regulamento