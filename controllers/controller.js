const { User, Profile , Post, Comment} = require('../models/index')
const {Op} = require('sequelize')

class Controller{

    static login (req,res){
        res.render('login')
    }

    static register(req,res){
        res.render('register')
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