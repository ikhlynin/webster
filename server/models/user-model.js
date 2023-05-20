const { Schema, model } = require('mongoose')

const UserSchema = new Schema({
    email: { type: String, unique: true, required: true },
    password: { type: String, unique: false, required: true },
    name: { type: String, unique: false, default: "User #1" },
    status: { type: String, default: '' },
    img: { type: String, default: `http//localhost:8000/public/upload/defaultImg.jpg` },
    activated: { type: Boolean, default: false, required: true },
    activationLink: { type: String, required: false },
    isadmin: { type: Boolean, default: false }
})

module.exports = model('User', UserSchema);
