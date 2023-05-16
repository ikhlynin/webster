const UserServices = require('../services/user-service')
const { validationResult } = require('express-validator')
const ApiError = require('../exceptions/api-error')
const tokenService = require('../services/token-service')
const tiketService = require('../services/tiket-service')

class TiketController {

    async buyTicket(req, res, next) {
        try {
            const { refreshToken } = req.cookies
            const { eventName, yourName, surname, promocode, isVisible, idEv, price } = req.body
            const ticket = await tiketService.buyTicket(refreshToken, eventName, yourName, surname, promocode, isVisible, idEv, price)
            return res.json(ticket)
        } catch (e) {
            next(e)
        }
    }
    async allSubscribers(req, res, next) {
        try {
            const { refreshToken } = req.cookies
            const { id } = req.params
            const ticket = await tiketService.getvisibleMembers(refreshToken, id)
            return res.json(ticket)
        } catch (e) {
            next(e)
        }
    }
    async allHistoryEve(req, res, next) {
        try {
            const { refreshToken } = req.cookies
            const { id } = req.params
            const ticket = await tiketService.getAllHistoryEve(refreshToken, id)
            return res.json(ticket)
        } catch (e) {
            next(e)
        }
    }


}

module.exports = new TiketController()