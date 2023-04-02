const Articles = require('../models/articleModel')
const User = require('../models/userModel')
const uuid = require('uuid')

const articlesCtrl = {
    addArticle: async (req, res) => {
        try {
            const {
                title,
                price,
                type,
                surface,
                city,
                numberOfRooms,
                description,
            } = req.body

            // console.log('--------------req booody-------------', req)
            const article = new Articles({
                // user: req.user.id,
                title: title,
                price: price,
                type: type,
                surface: surface,
                city: city,
                numberOfRooms: numberOfRooms,
                description: description,
            })
            const addArticle = await article.save()
            console.log('addArticle', addArticle)
            res.json({ msg: 'addArticle Success!' })
        } catch (err) {
            console.log('-----------Add prjt error-------------', err)
            return res.status(500).json({ msg: err.message })
        }
    },
    getArticledetails: async (req, res) => {
        try {
            let articles = await Articles.findById(req.params.id)
            const updatedArt = await articles.save()
            res.json(updatedArt)
        } catch (error) {
            console.log('------------Article details error----------')
            console.log(error)
            return res.status(500).json({ msg: error.message })
        }
    },
    updateArticle: async (req, res) => {
        try {
            const {
                title,
                price,
                type,
                surface,
                city,
                numberOfRooms,
                description,
            } = req.body

            const article = await Articles.findById(req.params.id)
            if (article) {
                article.title = title
                article.price = price
                article.type = type
                article.surface = surface
                article.city = city
                article.numberOfRooms = numberOfRooms
                article.description = description
                const updatedrticle = await article.save()
                console.log('updatedrticle', updatedrticle)
                res.json({ msg: 'Update Article Success!' })
            }
        } catch (err) {
            console.log('-----------Update article error-------------', err)
            return res.status(500).json({ msg: err.message })
        }
    },
    getAllArticles: async (req, res) => {
        try {
            const keyword = req.query.keyword
                ? {
                      name: {
                          $regex: req.query.keyword,
                          $options: 'i',
                      },
                  }
                : {}
            const articles = await Articles.find({ ...keyword })
            res.json(articles)
        } catch (err) {
            console.log('-----------All Prj error-------------')

            console.log(err)
            return res.status(500).json({ msg: err.message })
        }
    },
    deleteArticle: async (req, res) => {
        console.log('id article delete' + req.params.id)
        const article = await Articles.findById(req.params.id)
        if (article) {
            await article.deleteOne()
            res.json({ message: 'article Removed' })
        } else {
            // status it's 500 by default cuz of errHandler
            res.status(404)
            throw new Error('article not found')
        }
    },
}
module.exports = articlesCtrl
