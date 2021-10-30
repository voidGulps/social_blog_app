const express = require("express")
const path = require('path')
const mongoose =require('mongoose')
const dotenv = require('dotenv')
const connectDB =require('./config/db')
const passport = require('passport')
const session =require('express-session')
const MongoStore=require('connect-mongo')
const Article = require('./models/article')
const articleRouter = require("./routes/articles")
const methodOverride=require("method-override")
const { config } = require('process')



dotenv.config({path:'./config/config.env'})

require('./config/passport')(passport)

connectDB()

const app = express()

app.use(express.urlencoded({extended:false}))



app.use(express.static(path.join(__dirname,'public')))

app.use(methodOverride('_method'))



app.set("view engine", "ejs");

app.use(session({
  secret: 'desert elf',
  resave: false,
  saveUninitialized: false,
  store:MongoStore.create({mongoUrl:process.env.MONGO_URI,mongooseConnection:mongoose.connection})
}))

app.use(passport.initialize())
app.use(passport.session())

app.use('/', require('./routes/index'))
app.use('/auth', require('./routes/auth'))
app.use('/articles', require('./routes/articles'))


app.get("/articles", async(req, res) => {
  const articles = await Article.find().populate('user').sort({createdAt:'desc'})
  
  res.render("articles/index", { articles: articles});
});




app.use("/articles", articleRouter);

app.listen(process.env.PORT || 5000);
