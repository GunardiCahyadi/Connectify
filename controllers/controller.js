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

    static addPost(req , res){
        console.log(req.body, "=======");
        const {content,imageURL,ProfileId} = req.body
        Post.create({content,imageURL,ProfileId})
        .then(() => {
            res.redirect('/profile')
        })
        .catch(err => {
            console.log(err);
            res.send(err)
        })
    }

    static profile(req,res){
        let id = 1
        Profile.findOne({
            include: {
                model:Post, 
                order:[['createdAt','DESC']]},
            where:id,
        })
        .then(profile => {
            res.render('profile', {profile})
        })
        .catch(err => {
            console.log(err)
            res.send(err)
        })

    }

    static profileEditForm(req,res){
        let id = 1
        Profile.findOne({
            where:id
        })
        .then(profile => {
            res.render('editProfile', {profile})
        })
        .catch(err => {
            console.log(err)
            res.send(err)
        })
    }

    static profileEdit(req,res){
        let id = 1
        const {name,bio,dateOfBirth} = req.body
        Profile.update({name,bio,dateOfBirth},{
            where: {id}
        })
        .then(() => {
            res.redirect('/profile')
        })
        .catch(err => {
            console.log(err)
            res.send(err)
        })
    }

    static delete(req,res){
        const {postId} = req.params
        Post.destroy({
            where: {id : postId}
        })
        .then(() => {
            res.redirect('/profile')
        })
        .catch(err => {
            console.log(err)
            res.send(err)
        })
    }
    
    static likes(req,res){
        const {postId} = req.params
        Post.increment({likes:1},{
            where: {id : postId}
        })
        .then(() => {
            res.redirect('/profile')
        })
        .catch(err => {
            console.log(err)
            res.send(err)
        })
    }

}

module.exports = Controller