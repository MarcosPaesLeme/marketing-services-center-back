'use strict'

const mongoose = require('mongoose');
const Ticket = require('../models/ticketModel');

exports.get = () => {
    return Ticket.find();
}

exports.getByUser = (userId) => {
    return Ticket.find({
        userId: userId
    });
}

exports.create = (body) => {
    let ticket = new Ticket(body);

    return ticket.save();
}