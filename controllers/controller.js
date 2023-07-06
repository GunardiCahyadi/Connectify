const { User, Profile , Post, Comment} = require('../models/index')
const {Op} = require('sequelize')
const bcrypt= require('bcryptjs')

class Controller{

    static login (req,res){
        const {error} = req.query
        res.render('login', {error})
    }
    static postLogin(req,res){
        const {email, password} = req.body
        User.findOne({
            where:{
                email
            }
        })
        .then(user=>{
            if(user){
                const isValidPassword = bcrypt.compareSync(password, user.password)
                if(isValidPassword){
                    req.session.userId = user.id
                    return res.redirect('/homepage')
                }else{
                    const error = "Invalid Email or Password"
                    return res.redirect(`/login?error=${error}`)
                }
            }else{
                const error = "Invalid Email or Password"
                return res.redirect(`/login?error=${error}`)
            }
        })
        .catch(err=>{
            console.log(err)
            res.send(err)
        })
    }

    static register(req,res){
        res.render('register')
    }
    static postRegister(req,res){
        const {email, password} = req.body
        User.create({email, password})
        .then(()=>{
            res.redirect('/login')
        })
        .catch(err=>{
            console.log(err)
            res.send(err)
        })
    }

    static homeUser(req,res){
        Post.findAll({
            include:Profile
        })
        .then(posts => {
            res.render('homeUser', {posts})
        })
        .catch(err => {
            console.log(err)
            res.send(err)
        })
    }

    static postAddForm(req,res){
        Profile.findAll()
        .then(profiles => {
            res.render('addPost',{profiles})
        })
        .catch(err => {
            console.log(err)
            res.send(err)
        })
        
    }

}

module.exports = Controller