const { User, Profile , Post, Comment} = require('../models/index')
const {Op} = require('sequelize')

class Controller{

    static login (req,res){
        res.render('login')
    }

    static register(req,res){
        res.render('register')
    }

    static validateLogin(req,res){
        const { email, password } = req.body
        User.findOne({
            where:{
                email
            }
        })
        .then(data=>{
            if(data === data.password){
                if(data.role === 'Admin'){
                    res.redirect('homeAdmin')
                }else{
                    res.redirect('homeUser')
                }
            }else{
                console.log('password salah')
            }
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