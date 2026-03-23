const express = require("express");
const path = require("path");
const userRoute = require('./routes/user');
const mongoose = require("mongoose")
const cookieParser = require("cookie-parser");
const { checkForAuthenticationCookie } = require("./middlewares/authentication");
const blogRoute = require("./routes/blog")
const Blog = require('./models/blog')


const app = express();
const PORT = 8000;

mongoose.connect('mongodb://localhost:27017/blogify').then((e) =>console.log("MngoDB Connected") )

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"))

// middleware 
app.use(express.urlencoded({extended: false}))
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"))
app.use(express.static(path.resolve("./public")))



app.get('/', async (req,res) => {
  const allBlogs = await Blog.find({}) //descending sort
  res.render("home",{
    user: req.user,
    blogs:allBlogs
  })  
})

app.use('/user',userRoute);
app.use('/blog',blogRoute);


app.listen(PORT,() => console.log(`Server Started at PORT: ${PORT}`))