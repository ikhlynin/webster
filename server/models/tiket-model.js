const { Schema, model } = require('mongoose')

const TicketSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    name: { type: String },
    fullName: { type: String },
    thirdName: { type: String },
    promocode: { type: String, default: false, },
    usersee: { type: String, default: false, },
    price: { type: Number },
    eventId: { type: Schema.Types.ObjectId, ref: 'Event' }
})

module.exports = model('Ticket', TicketSchema);