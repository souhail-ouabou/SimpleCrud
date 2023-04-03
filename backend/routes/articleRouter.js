const router = require('express').Router()
const articleCtrl = require('../controllers/articlesCtrl')
const auth = require('../middleware/auth')

router.post('/addarticle', auth, articleCtrl.addArticle)
router.get('/details/:id', auth, articleCtrl.getArticledetails)
router.put('/updatearticle/:id', articleCtrl.updateArticle)
router.get('/allarticles', articleCtrl.getAllArticles)
router.delete('/deletearticle/:id', auth, articleCtrl.deleteArticle)

module.exports = router
