const _ = require('lodash')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('./user')
const env = require('../../.env')
//regex para validar email e senha
const emailRegex = /\S+@\S+\.\S+/
const passwordRegex = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20})/

const sendErrorsFromDb = (res, dbErrors) => {
    _.forIn(dbErrors.errors, error => errors.push(error.message))
    return res.status(400).json({ errors })
}

//Método de autenticação do usuário
const login = (req, res, next) => {
    //pega o email e senha através do corpo da requisição
    const email = req.body.email || ''
    const password = req.body.password || ''
    //busca um único usuário por email
    User.findOne({ email }, (err, user) => {
        //se não encontrar
        if (err) {
            //envia a mensagem de erro
            return sendErrorsFromDB(res, err)
            //se encontrar o usuário será feito uma comparação de forma síncrona com o password obtido na consulda
        } else if (user && bcrypt.compareSync(password, user.password)) {
            //gera um token a partir do usuário com uma chave e com validade de 1 dia 
            const token = jwt.sign(user, env.authSecret, {
                expiresIn: "1 day"
            })
            //extrai o nome e email do usuario
            const { name, email } = user 
            //gera uma resposta json com nome, email e token
            res.json({ name, email, token })
        } else {
            return res.status(400).send({ errors: ['Usuário/Senha inválidos'] })
        }
    })
}
//Método de validação do token
const validateToken = (req, res, next) => {
    //recebe o token no corpo da requisição
    const token = req.body.token || ''
    //aplica o authSecret no token recebido. Se a resposta devolve o token decodificado
    jwt.verify(token, env.authSecret, function (err, decoded) {
        //retorna status ok com valid = true
        return res.status(200).send({ valid: !err })
    })
}

//Método de criação do usuário
const signup = (req, res, next) => {
    //recebe os dados pelo corpo da requisição
    const name = req.body.name || ''
    const email = req.body.email || ''
    const password = req.body.password || ''
    const confirmPassword = req.body.confirm_password || ''
    //Valida o email digitado com a expressão regular(emailRegex)
    if (!email.match(emailRegex)) {
        return res.status(400).send({ errors: ['O e-mail informa está inválido'] })
    }
    //Valida o password digitado com a expressão regular(passwordRegex)
    if (!password.match(passwordRegex)) {
        return res.status(400).send({
            errors: [
                "Senha precisar ter: uma letra maiúscula, uma letra minúscula, um número, uma caractere especial(@#$ %) e tamanho entre 8 - 20."
            ]
        })
    }
    
    const salt = bcrypt.genSaltSync()
    //gera o hash da senha digitada
    const passwordHash = bcrypt.hashSync(password, salt)
    //compara se a senha e confirmação de senha são iguais
    if (!bcrypt.compareSync(confirmPassword, passwordHash)) {
        //se não forem retorna status de erro e a msg
        return res.status(400).send({ errors: ['Senhas não conferem.'] })
    }

    //Busca o usuário a partir do email
    User.findOne({ email }, (err, user) => {
        if (err) {
            return sendErrorsFromDB(res, err)
        } else if (user) {
            //se encontrar o usuario válido/cadastrado
            return res.status(400).send({ errors: ['Usuário já cadastrado.'] })
        } else {
            //cria um novo usuário
            const newUser = new User({ name, email, password: passwordHash })
            //salva o usuário na Base da dados
            newUser.save(err => {
                if (err) {
                    return sendErrorsFromDB(res, err)
                } else {
                    //chama a função de login fazendo que o usuário seja autenticado após o cadastro
                    login(req, res, next)
                }
            })
        }
    })
}

module.exports = { login, signup, validateToken }
