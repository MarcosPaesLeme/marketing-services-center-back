'use strict'

const mongoose = require('mongoose');
const repository = require('../repositories/ticketRepository');

exports.getTickets = async (req, res) => {

    await repository.get().then(tickets => {

        res.status(200).send(tickets)

    });

}

exports.createTicket = async (req, res) => {


    await repository.create(req.body)
        .then(x => {

            res.status(201).send({ message: "Ticket criado" })

        }).catch(e => {

            res.status(400).send({ message: "Ticket não criado" + e })

        });
}
