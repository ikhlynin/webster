const { Schema, model } = require('mongoose');
const userModel = require('./user-model');

const CompanySchema = new Schema({
    name: { type: String, unique: false, default: "Your Co." },
    description: { type: String, unique: false, default: "Simple Co." },
    owner: { type: Schema.Types.ObjectId, ref: 'User' },
    img: { type: String, default: `http//localhost:3000/public/upload/defaultImg.jpeg` },
    location: { type: String, unique: false },
    email: { type: String, unique: false },

})

module.exports = model('Company', CompanySchema);