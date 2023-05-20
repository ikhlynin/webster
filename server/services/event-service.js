const UserModel = require('../models/user-model')
const mailservice = require('./mail-service')
const tokenService = require('./token-service')
const UserDto = require('../dtos/user-dtos')
const ApiError = require('../exceptions/api-error')
const companyModel = require('../models/company-model')
const tokenModel = require('../models/token-model')
const eventModel = require('../models/event-model')
const memberModel = require('../models/member-model')
const comentModel = require('../models/coments-model')
const eventDtos = require('../dtos/event-dtos')

class EventService {
    async createEvent(refreshToken, name, description, type, startDate, endDate, location, city, price, idComp, img) {
        const user = tokenService.validateRefreshToken(refreshToken)
        const event = await eventModel.create({ name: name, description: description, category: type, dateStart: startDate, dateEnd: endDate, city: city, location: location, price: price, img: img, owner: user.id, company: idComp })
        return event
    }

    async deleteOne(refreshToken, id) {
        const user = tokenService.validateRefreshToken(refreshToken)
        if (await eventModel.findOne({ _id: id }) != await companyModel.findOne({ owner: user.id })) throw new ApiError('You dont have access rights')
        const empty = await eventModel.deleteOne({ _id: id })
        return empty
    }

    async getEvent(id) {
        const coData = await eventModel.findOne({ _id: id })
        return coData
    }
    async getAllEvent() {
        const coData = await eventModel.find()
        return coData
    }

    async getEvents(refreshToken, idCom, idUs) {
        const event = await eventModel.find({ owner: idUs, company: idCom })
        return event
    }
    async getEventsOneUs(refreshToken, idUs, idEv) {

        var now = new Date();
        const event = await eventModel.find({ owner: idUs, _id: { $ne: idEv }, dateEnd: { $lte: now } })
        return event
    }

    async editEvent(refreshToken, id, name, description, type, startDate, endDate, location, city, price, img) {
        if (img === false)
            await eventModel.updateOne({ _id: id }, { $set: { name: name, description: description, category: type, dateStart: startDate, dateEnd: endDate, city: city, location: location, price: price } })
        else
            await eventModel.updateOne({ _id: id }, { $set: { name: name, description: description, category: type, dateStart: startDate, dateEnd: endDate, city: city, location: location, price: price, img: img } })

        const companyData = await eventModel.findById(id)
        return companyData
    }

    async deleteEvent(refreshToken, id) {
        const user = tokenService.validateRefreshToken(refreshToken)
        const compData = await eventModel.findById(id)
        if (compData.owner.toString() != user.id) throw ApiError.BadRequest('U dont have access rights');
        await eventModel.deleteOne({ _id: id })
    }


}

module.exports = new EventService()