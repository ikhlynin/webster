const eventModel = require('../models/event-model')
const memberModel = require('../models/member-model')
const tiketModel = require('../models/tiket-model')
const userModel = require('../models/user-model')
const tokenService = require('./token-service')

class TiketService {

    async buyTicket(refreshToken, eventName, yourName, surname, promocode, isVisible, idEv, price) {
        const user = tokenService.validateRefreshToken(refreshToken)
        const ticket = await tiketModel.create({ user: user.id, name: eventName, fullName: yourName, thirdName: surname, promocode: promocode, usersee: isVisible, eventId: idEv, price: price })
        return ticket

    }

    async getvisibleMembers(refreshToken, eventId) {
        const visibleOnes = await tiketModel.find({ usersee: 'yes', eventId: eventId })
        const aaa = []

        for (let i = 0; i < visibleOnes.length; i++) {
            const data = await userModel.findOne({ _id: visibleOnes[i].user })
            aaa.push(data)
        }
        const ded = await userModel.find({})
        return aaa
    }
    async getAllHistoryEve(refreshToken, id) {
        const visibleOnes = await tiketModel.find({ user: id })
        const aaa = []
        for (let i = 0; i < visibleOnes.length; i++) {
            //console.log(visibleOnes[i].user)
            const data = await eventModel.findOne({ _id: visibleOnes[i].eventId })
            aaa.push(data)
        }
        const ded = await userModel.find({})
        return aaa
    }

}

module.exports = new TiketService()