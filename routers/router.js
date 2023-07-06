const express = require('express')
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
const Controller = require('../controllers/controller')
const router = express.Router()

router.get('/login',Controller.login)
router.post('/login',Controller.postLogin)//tambahan joni

router.use(function(req, res, next){ 
    if(!req.session.userId){
        const error = "Please login into your account"
        res.redirect(`/login?error=${error}`)
    }else{
        next()
    }
})

router.get('/register',Controller.register)
router.post('/register', Controller. postRegister) //tambahan joni
router.get('/homepage',Controller.homeUser)
router.get('/post/add', Controller.postAddForm)
router.post('/post/add',Controller.addPost)
router.get('/profile',Controller.profile)
router.get('/profile/edit',Controller.profileEditForm)
router.post('/profile/edit',Controller.profileEdit)
router.get('/posts/:postId/delete',Controller.delete)
router.get('/posts/:postId/likes',Controller.likes)
// router.get('/stores/add',Controller.addForm)
// router.post('/stores/add',Controller.addStore)
// router.get('/stores/:storeId',Controller.storeDetail)
// router.get('/stores/:storeId/employees/add',Controller.addEmployeeForm)
// router.post('/stores/:storeId/employees/add',Controller.addEmployee)
// router.get('/stores/:storeId/employees/:employeeId/edit',Controller.editEmployeeForm)
// router.post('/stores/:storeId/employees/:employeeId/edit',Controller.editEmployee)
// router.get('/stores/:storeId/employees/:employeeId/delete',Controller.deleteEmployee)
// router.get('/employees',Controller.listEmployee)


module.exports = router