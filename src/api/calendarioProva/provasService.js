const Prova = require('./provasModel')
const errorHandler = require('../common/errorHandler')

Prova.methods(['get', 'post', 'put', 'delete'])
Prova.updateOptions({ new: true, runValidators: true })
Prova.after('post', errorHandler).after('put', errorHandler)

module.exports = Prova