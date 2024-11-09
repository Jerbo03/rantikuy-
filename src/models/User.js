const {Schema, model} = require('mongoose')

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50,
        match: /^[a-zA-Z\s]*$/
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    },
    telefono: {
        type: String,
        required: false,
        match: /^[0-9]{9}$/
    }
},{
    timestamps: true,
})

module.exports = model('User', UserSchema)