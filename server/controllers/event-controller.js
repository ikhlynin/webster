const ApiError = require('../exceptions/api-error')
const tokenService = require('../services/token-service')
const eventDtos = require('../dtos/event-dtos')
const eventService = require('../services/event-service')
const eventDto = require('../dtos/event-dtos')

class EventController {
    async createEvent(req, res, next) {
        try {
            const { refreshToken } = req.cookies
            const formData = req.body
            const imageName = formData.nameImg
            const basePath = `${req.protocol}://${req.get('host')}/public/${imageName}`
            const coData = await eventService.createEvent(refreshToken, formData.name, formData.description, formData.type, formData.startDate, formData.endDate, formData.location, formData.city, formData.price, formData.idComp, basePath)
            const coDtos = new eventDto(coData)
            return res.json(coDtos)
        } catch (e) {
            next(e)
        }
    }

    async getEventsCom(req, res, next) {
        try {
            const { refreshToken } = req.cookies
            const { idUs, idCom } = req.params
            const event = await eventService.getEvents(refreshToken, idUs, idCom)
            return res.json(event)
        } catch (e) {
            next(e)
        }
    }

    async getEventsOneUs(req, res, next) {
        try {
            const { refreshToken } = req.cookies
            const { idUs, idEv } = req.params
            const event = await eventService.getEventsOneUs(refreshToken, idUs, idEv)
            return res.json(event)
        } catch (e) {
            next(e)
        }
    }
    async getEvent(req, res, next) {
        try {

            const { id } = req.params
            console.log(id)
            const event = await eventService.getEvent(id)
            return res.json(event)
        } catch (e) {
            next(e)
        }
    }
    async getAllEvent(req, res, next) {
        try {
            const event = await eventService.getAllEvent()
            return res.json(event)
        } catch (e) {
            next(e)
        }
    }

    async editEvent(req, res, next) {
        try {
            const { refreshToken } = req.cookies
            const formData = req.body
            const imageName = formData.nameImg
            let basePath = ''
            if (imageName === "undefined") {
                basePath = false
            } else {
                basePath = `${req.protocol}://${req.get('host')}/public/${imageName}`
            }
            const coData = await eventService.editEvent(refreshToken, formData.id, formData.name, formData.description, formData.type, formData.startDate, formData.endDate, formData.location, formData.city, formData.price, basePath)
            const eventDto = new eventDtos(coData)
            return res.json(eventDto)
        } catch (e) {
            next(e)
        }
    }


    async deleteEvent(req, res, next) {
        try {
            const { refreshToken } = req.cookies
            const { id } = req.params
            await eventService.deleteEvent(refreshToken, id)
        } catch (e) {
            next(e)
        }
    }






    async getAllMembers(req, res, next) {
        try {
            const { refreshToken } = req.cookies
            const { id } = req.body
            const eventMembers = await function (refreshToken, id) { }
            return res.json(eventMembers)
        } catch (e) {
            next(e)
        }
    }

    async getVisibleMembers(req, res, next) {
        try {
            const { refreshToken } = req.cookies
            const { event_id } = req.body
            const data = await function (refreshToken, event_id) { }
            return res.json(data)
        } catch (e) {
            next(e)
        }
    }

    async addComent(req, res, next) {
        try {
            const { refreshToken } = req.cookies
            const { event_id, title, content } = req.body
            const data = await function (refreshToken, event_id, title, content) { }
            return res.json(data)
        } catch (e) {
            next(e)
        }
    }

    async buyTicket(req, res, next) {
        try {

        } catch (e) {
            next(e)
        }
    }
}

module.exports = new EventController()