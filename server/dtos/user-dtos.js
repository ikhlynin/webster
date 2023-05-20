module.exports = class UserDto {
    email;
    id;
    isActivated;
    name;
    img;
    isAdmin;
    status

    constructor(model) {
        this.email = model.email
        this.id = model._id
        this.isActivated = model.activated
        this.status = model.status
        this.name = model.name
        this.img = model.img
        this.isAdmin = model.isadmin
    }
}