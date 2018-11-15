const Professor = require('./professorModel')
const errorHandler = require('../common/errorHandler')

Professor.methods(['get', 'post', 'put', 'delete'])
Professor.updateOptions({ new: true, runValidators: true })
Professor.after('post', errorHandler).after('put', errorHandler)

module.exports = Professor