const express = require("express")
const { ensureAuth, ensureGuest } = require('../middlewares/auth')
const Article=require('../models/article')
const articleRouter = require("../routes/articles")
const router = express.Router()


router.get('/',ensureGuest, (req, res) => {
    res.render('login', {
        layout: 'login'
    }) 
})

router.get('/dashboard',ensureAuth, async(req, res) => {
    try{
        const userArticles=await Article.find({user:req.user.id})
        res.render('dashboard',{name:req.user.firstName,userArticles})
    }
    catch(err){console.error(err)}
        })

router.use('/articles',articleRouter)

module.exports=router