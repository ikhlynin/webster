const { Schema, model } = require('mongoose')

const MemberSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    status: { type: Boolean }
})

module.exports = model('Member', MemberSchema);