'use strict'
const watsonService = require('../services/auth.watson.service');
const util = require('util');
const ticketRepository = require('../repositories/ticketRepository');

exports.getFirst = async (req, res) => {
    try {

        const { userId } = req.body;
        let sessionId = await watsonService.createSession();

        let watsonMessage = await watsonService.getFirst(sessionId, userId);

        return res.status(201).send({ sessionId, watsonMessage })
    } catch (err) {
        console.log(err)
    }
}

exports.sendMessage = async (req, res) => {

    const { sessionId, message, userId } = req.body;

    const watsonMessage = await watsonService.sendUserInput(sessionId,message,userId);
    if (watsonMessage && watsonMessage.entities && watsonMessage.entities[0] && watsonMessage.entities[0].entity) {
        if (watsonMessage.entities[0].entity === 'identificador_do_problema' ) {
            let tickets = await ticketRepository.getByUser(userId);
            watsonMessage.generic[0].text = `${watsonMessage.generic[0].text}. Você possue os seguintes tickets 
            ${tickets.map(ticket =>
                `Ticket: ${ ticket._id} | Status: ${ ticket.status ? 'Resolvido' : 'Em aberto' }`).join("")
            }` 
        } else if (watsonMessage.entities[0].entity === 'descricao_problema' && watsonMessage.entities[1].entity === 'sys-date') {
            let ticket = {
                title: watsonMessage.entities[0].value,
                userId: userId,
                description: message
            }
            ticket = await ticketRepository.create(ticket);
            watsonMessage.generic[0].text = `${watsonMessage.generic[0].text}. O número do seu ticket é ${ticket._id}` 
        }     
    } 

    if (watsonMessage && watsonMessage.intents && watsonMessage.intents[0] && watsonMessage.intents[0].intent === 'sair' ) {
        await watsonService.deleteSession(sessionId)
    }

    return res.status(201).send(watsonMessage.generic[0])
}