const CompanyService = require('../services/company-service')
const ApiError = require('../exceptions/api-error')
const tokenService = require('../services/token-service')
const companyDtos = require('../dtos/company-dtos')

class CompanyController {
    async createCompany(req, res, next) {
        try {
            const { refreshToken } = req.cookies
            const formData = req.body
            const imageName = formData.nameImg
            const basePath = `${req.protocol}://${req.get('host')}/public/${imageName}`
            const coData = await CompanyService.createCompany(refreshToken, formData.name, formData.description, formData.email, formData.location, basePath)
            const coDtos = new companyDtos(coData)
            return res.json(coDtos)
        } catch (e) {
            next(e)
        }
    }

    async deleteCompany(req, res, next) {
        try {
            const { refreshToken } = req.cookies
            const { id } = req.params
            await CompanyService.deleteCompany(refreshToken, id)
        } catch (e) {
            next(e)
        }
    }

    async editCompany(req, res, next) {
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
            const coData = await CompanyService.editCompany(refreshToken, formData.id, formData.name, formData.description, formData.email, formData.location, basePath)
            return res.json(coData)
        } catch (e) {
            next(e)
        }
    }

    async getCompanies(req, res, next) {
        try {
            const { refreshToken } = req.cookies
            const { id } = req.params
            const coData = await CompanyService.getCompanies(refreshToken, id)
            return res.json(coData)
        } catch (e) {
            next(e)
        }
    }

    async getCompany(req, res, next) {
        try {

            const { refreshToken } = req.cookies
            const { id, idUs } = req.params
            const coData = await CompanyService.getCompany(refreshToken, id, idUs)
            return res.json(coData)
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new CompanyController()