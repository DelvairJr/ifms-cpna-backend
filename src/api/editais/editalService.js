const Edital = require('./editalModel')
const errorHandler = require('../common/errorHandler')

Edital.methods(['get', 'post', 'put', 'delete'])
Edital.updateOptions({ new: true, runValidators: true })
Edital.after('post', errorHandler).after('put', errorHandler)

module.exports = Edital