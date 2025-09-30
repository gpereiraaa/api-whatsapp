/***********************************************************************************************
 * Objetivo: API responsavel em criar endPoints referente ao Whatsapp
 * Data: 24/09/2025
 * Autor: Gustavo Pereira
 * Versão: 1.0
 * 
 * Observações: Instalar dependencias para criar a API 
 *      express     - npm install express --save       -- Instala as dependencias para criar uma API
 *      cors        - npm install cors --save          -- Instala as dependencias para configurar as permissões de uma API
 *      body-parser - npm install body-parser --save   -- Instala as dependencias para receber os tipos de dados via POST ou PUT
 * 
 *      Quando for baixar em outra maquina usar - npm i - Para baixar as dependencias do node_modules
 **************************************************************************************************************************************/

// Import das dependencias 
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

// Import das funções 
const dados = require('./modulo/funcoes.js')

const PORT = process.PORT || 8080

// Instacia na classe do express
const app = express()

// Configurações do CORS
app.use((request, response, next) => {
    response.header('Access-Control-Allow-Origin', '*') // Libera acesso por qualquer IP
    response.header('Access-Control-Allow-Methods', 'GET') // Apenas metodo GET liberado na api

    app.use(cors())
    next()
})

// Função que lista todos os usuarios
app.get('/v1/whatsapp/allUsers', function(request, response) {
    let usersAll = dados.getAllUsers()

    response.status(usersAll.statuscode)
    response.json(usersAll)
})

// Função que lista os dados de um usuário especifico 
app.get('/v1/whatsapp/data/user/', function(request, response){
    let number = request.query.numero
    let dataUser = dados.getDataUser(number)

    response.status(dataUser.statuscode)
    response.json(dataUser)
})

// Função que lista os dados dos contatos de um usuario
app.get('/v1/whatsapp/data/contact/user/', function(request, response){
    let number = request.query.numero
    let dataContactUser = dados.getDataContactUser(number)

    response.status(dataContactUser.statuscode)
    response.json(dataContactUser)
})

// Função que lista todas as mensagens de um usuario
app.get('/v1/whatsapp/all/messages/user/', function(request, response){
    let number = request.query.numero
    let allMessagesUser = dados.getAllMessagesUser(number)

    response.status(allMessagesUser.statuscode)
    response.json(allMessagesUser)
})

// Função que lista uma conversa de um usuario e um contato
app.get('/v1/whatsapp/conversation/user/contact/', function(request, response){
    let numberUser = request.query.numeroUser
    let numberContact = request.query.numeroContact
    
    let conversationUserContact = dados.getConversationUserContact(numberUser, numberContact)

    response.status(conversationUserContact.statuscode)
    response.json(conversationUserContact)
})

// Função que realiza um filtro em uma conversa por uma determinda palavra chave 
app.get('/v1/whatsapp/keyword/search/filter', function(request, response){
    let numberUser = request.query.numeroUser
    let numberContact = request.query.numeroContact
    let keyword = request.query.keyword

    let keywordSearchFilter = dados.getKeywordSearchFilter(numberUser, numberContact, keyword)

    response.status(keywordSearchFilter.statuscode)
    response.json(keywordSearchFilter)
})

// Start da API
app.listen(PORT, function(){
    console.log('API aguardando requisições ...')
})

