const companyModel = require('../models/company-model')
const tokenService = require('./token-service')
const tokenModel = require('../models/token-model')
const companyDtos = require('../dtos/company-dtos')
const ApiError = require('../exceptions/api-error')

class CompanyService {
    async createCompany(refreshToken, name, description, email, location, imagePath) {
        if (await companyModel.findOne({ name: name })) throw ApiError.BadRequest('Name already exists')
        const user = tokenService.validateRefreshToken(refreshToken)
        const companyData = await companyModel.create({ name: name, description: description, owner: user.id, email: email, img: imagePath, location: location })
        return companyData
    }

    async deleteCompany(refreshToken, id) {
        const user = tokenService.validateRefreshToken(refreshToken)
        const compData = await companyModel.findById(id)
        if (compData.owner.toString() != user.id) throw ApiError.BadRequest('U dont have access rights');
        await companyModel.deleteOne({ _id: id })
    }

    async editCompany(refreshToken, id, name, description, email, location, imagePath) {
        const datac = await companyModel.findOne({ name: name })
        if (datac && datac._id != id) throw ApiError.BadRequest('Name already exists')
        if (imagePath === false)
            await companyModel.updateOne({ _id: id }, { $set: { name: name, description: description, email: email, location: location } })
        else
            await companyModel.updateOne({ _id: id }, { $set: { name: name, description: description, email: email, location: location, img: imagePath } })
        const companyData = await companyModel.findById(id)
        const compDto = new companyDtos(companyData)
        return compDto
    }

    async getCompanies(refreshToken, id) {
        const user = tokenService.validateRefreshToken(refreshToken)
        if (user.id != id) throw ApiError.BadRequest("refused")
        const coData = await companyModel.find({ owner: id })
        return coData
    }
    async getCompany(refreshToken, id, idUs) {
        const user = tokenService.validateRefreshToken(refreshToken) ///////////////////хз возможн проверка не нужна
        if (user.id != idUs) throw ApiError.BadRequest("refused")
        const coData = await companyModel.findOne({ _id: id })
        return coData
    }
}


module.exports = new CompanyService()