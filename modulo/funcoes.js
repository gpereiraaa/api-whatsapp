/*****************************************************************************************************
 * Objetivo: Arquivo responsavel pelas funções para criar a API do Whatsapp
 * Data: 24/09/2025
 * Autor: Gustavo Pereira
 * Versão: 1.0
 **************************************************************************************************/

// Import do arquivo de dados de usuarios
const dados = require('./contatos.js')

// Mensagem padrão de erro
const MESSAGE_ERROR = { status: false, statuscode: 500, development: 'Gustavo Pereira' }

// Função que lista todos os usuarios
const getAllUsers = function () {
    let message = { status: true, statuscode: 200, development: 'Gustavo Pereira' }
    message.dados = dados.contatos['whats-users']

    if (message.dados.length > 0)
        return message
    else
        return MESSAGE_ERROR

}

// Função que lista os dados de um usuário especifico 
const getDataUser = function (numero) {
    let message = { status: true, statuscode: 200, development: 'Gustavo Pereira', user: {} }
    dados.contatos['whats-users'].forEach(function (informacoes) {
        if (Number(informacoes.number) === Number(numero)) {
            message.user.id = informacoes.id,
            message.user.nome = informacoes.account,
            message.user.apelido = informacoes.nickname,
            message.user.numero = informacoes.number,
            message.user.imagem = informacoes['profile-image'],
            message.user.cor_de_fundo = informacoes.background,
            message.user.data_criacao_conta = informacoes['created-since'].start,
            message.user.data_encerramento_conta = informacoes['created-since'].end
        }
    })

    if (message.user.nome.length > 0)
        return message
    else
        return MESSAGE_ERROR
}

// Função que lista os dados dos contatos de um usuario
const getDataContactUser = function (numero) {
    let message = { status: true, statuscode: 200, development: 'Gustavo Pereira', contatos: [] }

    dados.contatos['whats-users'].forEach(function (informacoes) {
        if (Number(informacoes.number) === Number(numero)) {
            informacoes.contacts.forEach(contatos => {
                let contato = {
                    'nome': contatos.name,
                    'numero': contatos.number,
                    'descricao': contatos.description,
                    'imagem': contatos.image
                }
                message.contatos.push(contato)
            })

        }
    })
    if (message.contatos.length > 0)
        return message
    else
        return MESSAGE_ERROR
}

// Função que lista todas as mensagens de um usuario
const getAllMessagesUser = function (numero) {
    let message = { status: true, statuscode: 200, development: 'Gustavo Pereira', user: '', mensagens: [] }
    dados.contatos['whats-users'].forEach(function (informacoes) {
        if (Number(informacoes.number) === Number(numero)) {
            message.user = informacoes.account
            informacoes.contacts.forEach(contatos => {
                contatos.messages.forEach(mensagens => {
                    let mensagem = {
                        'contato': contatos.name,
                        'de': mensagens.sender,
                        'conteudo': mensagens.content,
                        'horario': mensagens.time
                    }
                    message.mensagens.push(mensagem)
                })
            })
        }
    })
    if (message.mensagens.length > 0)
        return message
    else
        return MESSAGE_ERROR
}

// Função que lista uma conversa de um usuario e um contato
const getConversationUserContact = function (numberUser, numberContact) {
    let message = { status: true, statuscode: 200, development: 'Gustavo Pereira', user: '', contato: '', mensagens: [] }
    dados.contatos['whats-users'].forEach(function (informacoes) {
        if (Number(informacoes.number) === Number(numberUser)) {
            message.user = informacoes.account
            informacoes.contacts.forEach(contatos => {
                if (Number(contatos.number) === Number(numberContact)) {
                    message.contato = contatos.name
                    contatos.messages.forEach(mensagens => {
                        let mensagem = {
                            'de': mensagens.sender,
                            'conteudo': mensagens.content,
                            'horario': mensagens.time
                        }
                        message.mensagens.push(mensagem)
                    })
                }

            })
        }
    })
    if (message.mensagens.length > 0)
        return message
    else
        return MESSAGE_ERROR
}

// Função que realiza um filtro em uma conversa por uma determinda palavra chave 
const getKeywordSearchFilter = function (numberUser, numberContact, keyword) {
    let message = { status: true, statuscode: 200, development: 'Gustavo Pereira', user: '', contato: '', palavra_chave: '', mensagens: [] }
    dados.contatos['whats-users'].forEach(function (informacoes) {
        if (Number(informacoes.number) === Number(numberUser)) {
            message.user = informacoes.account
            informacoes.contacts.forEach(contatos => {
                if (Number(contatos.number) === Number(numberContact)) {
                    message.contato = contatos.name
                    contatos.messages.forEach(mensagens => {
                        message.palavra_chave = keyword
                        if (mensagens.content.toLowerCase().includes(keyword.toLowerCase())) {
                            let mensagem = {
                                'de': mensagens.sender,
                                'conteudo': mensagens.content,
                                'horario': mensagens.time
                            }
                            message.mensagens.push(mensagem)
                        }
                    })
                }
            })
        }
    })
    if (message.mensagens.length > 0)
        return message
    else
        return MESSAGE_ERROR
}


module.exports = {
    getAllUsers,
    getDataUser,
    getDataContactUser,
    getAllMessagesUser,
    getConversationUserContact,
    getKeywordSearchFilter
}