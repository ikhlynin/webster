const { Schema, model } = require('mongoose')

const EventSchema = new Schema({
    name: { type: String, unique: false, default: "User #1" },
    description: { type: String, unique: false },
    category: { type: String },
    dateStart: { type: Date },
    dateEnd: { type: Date },
    city: { type: String },
    location: { type: String },
    img: [{ type: String }],
    price: { type: Number },
    owner: { type: Schema.Types.ObjectId, ref: 'User' },
    company: { type: Schema.Types.ObjectId, ref: 'Company' },
    members: [{ type: Schema.Types.ObjectId, ref: 'Member' }],
    coments: [{ type: Schema.Types.ObjectId, ref: 'Coment' }]
})

module.exports = model('Event', EventSchema);