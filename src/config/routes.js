const express = require('express')
const auth = require('./auth')

module.exports = function (server) {
    /*
     * Rotas protegidas por Token JWT 
     */
    //defini a rota a partir da função Router do Express
    const protectedApi = express.Router()
    //aplica a rota ao servidor que possui a rota /api
    server.use('/api', protectedApi)
    //Aplica o filtro de autenticação
    protectedApi.use(auth)

    //Rota de professor
    const Professor = require('../api/professor/professorService')
    Professor.register(protectedApi, '/professores')

    const Evento = require('../api/evento/eventoService')
    Evento.register(protectedApi, '/eventos')

    //Rota provas
    const Prova = require('../api/calendarioProva/provasService')
    Prova.register(protectedApi, '/provas')

    //Rota horario de permanência
    const Permanencia = require('../api/horarioPermanencia/permanenciaService')
    Permanencia.register(protectedApi, '/horario-de-permanencia')

    //Rota Contatos
    const Contatos = require('../api/contato/contatosService')
    Contatos.register(protectedApi, '/contatos')

    //Rota Cursos
    const Cursos = require('../api/cursos/cursoService')
    Cursos.register(protectedApi, '/cursos')

    //Rota editais
    const Edital = require('../api/editais/editalService')
    Edital.register(protectedApi, '/editais')

    //Rota regulamento
    const Regulamento = require('../api/regulamentos/regulamentoService')
    Regulamento.register(protectedApi, '/regulamentos')


    /*
    * Rotas abertas
    */
    const openApi = express.Router()
    server.use('/oapi', openApi)

    const AuthService = require('../api/user/authService')
    openApi.post('/login', AuthService.login)
    openApi.post('/signup', AuthService.signup)
    openApi.post('/validateToken', AuthService.validateToken)

    const RegulamentoOpen = require('../api/regulamentos/regOpenService')
    RegulamentoOpen.register(openApi, '/m-regulamentos')

    const ProfessorOpen = require('../api/professor/profOpenService')
    ProfessorOpen.register(openApi, '/m-professor')

    const PermanenciaOpen = require('../api/horarioPermanencia/permOpenService')
    PermanenciaOpen.register(openApi, '/m-horario-de-permanencia')

    const EventoOpen = require('../api/evento/eventOpenService')
    EventoOpen.register(openApi, '/m-eventos')

    const EditalOpen = require('../api/editais/editOpenService')
    EditalOpen.register(openApi, '/m-editais')

    const CursosOpen = require('../api/cursos/cursOpenService')
    CursosOpen.register(openApi, '/m-cursos')

    const ContatosOpen = require('../api/contato/contOpenService')
    ContatosOpen.register(openApi, '/m-contatos')

    const ProvasOpen = require('../api/calendarioProva/provOpenService')
    ProvasOpen.register(openApi, '/m-provas')
}