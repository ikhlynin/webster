/*
    name: {type: String, unique: false, default: "User #1"},
    description: {type: String, unique: false},
    dateStart:{type: Date},
    dateEnd: {type: Date},
    city: {type: String},
    location: {type: String},
    img: [{type: String}],
    owner: {type: Schema.Types.ObjectId, ref: 'Company'},
    members: [{type: Schema.Types.ObjectId, ref: 'User'}],
    coments: [{type: String}]
*/

module.exports = class eventDto {
    name;
    description;
    category;
    dateStart;
    dateEnd;
    city;
    location;
    img;
    price;
    owner;
    company;
    members;
    coments

    constructor(model) {
        this.id = model._id
        this.name = model.name
        this.category = model.category
        this.description = model.description
        this.dateStart = model.dateStart
        this.dateEnd = model.dateEnd
        this.city = model.city
        this.location = model.location
        this.img = model.img
        this.price = model.price
        this.members = model.members
        this.coments = model.coments
        this.owner = model.owner
        this.company = model.company
    }
}