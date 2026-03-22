const {Router} = require("express");
const User = require('../models/user')
const router = Router();

router.get('/signin',(req,res) => {
    return res.render("signin")
})

router.get('/signup',(req,res) => {
    return res.render("signup")
})

router.post('/signup', async(req,res) => {
    const { FullName, email, password } = req.body;
    await User.create({
        FullName,
        email,
        password,
    })
    return res.redirect("/")
})

router.post('/signin',async(req,res) => {
    const {email,password} = req.body;
    // phele user ko email se find karna hoga
    // uske salt ko use karke iss password ko bhi hash karna hoga
    // then dono ke hashes ko match karna hoga

   const user = await User.matchPassword(email,password);
   console.log("User",user);
   return res.redirect("/")
   
})

module.exports = router