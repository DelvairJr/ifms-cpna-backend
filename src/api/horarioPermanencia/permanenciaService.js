const Permanencia = require('./permanenciaModel')
const errorHandler = require('../common/errorHandler')

Permanencia.methods(['get', 'post', 'put', 'delete'])
Permanencia.updateOptions({ new: true, runValidators: true })
Permanencia.after('post', errorHandler).after('put', errorHandler)

module.exports = Permanencia