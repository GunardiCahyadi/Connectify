const express = require('express')
const Controller = require('../controllers/controller')
const router = express.Router()

router.get('/login',Controller.login)
router.get('/register',Controller.register)
router.get('/homepage',Controller.homeUser)
router.get('/post/add',Controller.postAddForm)
router.post('/post/add',Controller.homeUser)
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