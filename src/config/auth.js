const jwt = require('jsonwebtoken')
const env = require('../.env')

module.exports = (req, res, next) => {
    // CORS preflight request
    if (req.method === 'OPTIONS') {
        next()
    } else {
        //recebe o token que pode vir pelo corpo da requisição ou pela query ou pelo header
        const token = req.body.token || req.query.token || req.headers['authorization']
        //se não existir o token
        if (!token) {
            //retorna status de erro  e msg de token não existente
            return res.status(403).send({ errors: ['No token provided.'] })
        }
        //se existir o token valida com o authSecret e retorna o token decodificado
        jwt.verify(token, env.authSecret, function (err, decoded) {
            //se falhar a decodificação
            if (err) {
                //retorna status de erro e msg de falha na validação do token
                return res.status(403).send({
                    errors: ['Failed to authenticate token.']
                })
            } else {
                //req.decoded = decoded
                next()
            }
        })
    }
}