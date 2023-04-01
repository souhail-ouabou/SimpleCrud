

const mongoose = require('mongoose')

const articleSchema = mongoose.Schema({
    title: {
        type: String,
         required: true,
        // default: 'untitled',
    },
    image: {
        type: String,
        default: 'https://i.imgur.com/ouOr3VY.jpg',
    },
    price: {
        type: Number,
        required: true,
        default: 0,
    },
    type: {
        type: String,
        required: true,
        maxLength: 20,
    },
    surface: {
        type: String,
        required: true,
        maxLength: 20,
    },
    city: {
        type: String,
        required: true,
    },
    numberOfRooms: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
    },

    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
})

module.exports = mongoose.model('Article', articleSchema)
