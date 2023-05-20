module.exports = class CompanyDto {
    id;
    name;
    description;
    owner;
    img;
    location;
    email;

    constructor(model) {
        this.id = model._id
        this.name = model.name
        this.description = model.description
        this.owner = model.owner
        this.img = model.img
        this.location = model.location
        this.email = model.email
    }
}