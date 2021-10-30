const express = require("express")
const { ensureAuth, ensureGuest } = require('../middlewares/auth')
const Article=require('../models/article')
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

router.post('/',async(req,res,next)=>{
            req.article=new Article()
            next()
           },saveArticleAndRedirect('new'))


function saveArticleAndRedirect(path){
            return async(req,res)=>{
                let article=req.article
                    article.title=req.body.title
                    article.description=req.body.description
                    article.markdown=req.body.markdown
            
                try{
                    article =await article.save()
                    res.redirect(`/articles/${article.slug}`)}
                catch(e){
                    console.log(e)
                    res.render(`articles/${path}`,{article:article})
                }
            }
        }
module.exports=router