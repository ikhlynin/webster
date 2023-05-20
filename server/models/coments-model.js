const { Schema, model } = require('mongoose')

const ComentSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    title: { type: String },
    event: { type: Schema.Types.ObjectId, ref: 'Event' },
    content: { type: String },
    likes: { type: Number },
    dislike: { type: Number }
})

module.exports = model('Coment', ComentSchema);