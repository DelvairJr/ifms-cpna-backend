const Curso = require('./cursosModel')
const errorHandler = require('../common/errorHandler')

Curso.methods(['get', 'post', 'put', 'delete'])
Curso.updateOptions({new: true, runValidators: true})
Curso.after('post', errorHandler).after('put', errorHandler)

module.exports = Curso