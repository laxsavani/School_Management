const express = require('express');
const router = express.Router();
const upload = require('../helper/multer')
const admin_token = require('../middleware/manager.middleware')
const {
    login,
    loginPost,
    home,
    form
} = require('../controller/managercontroller')

// router.get('/register', register)
// router.post('/register', registerPost)
router.get('/login', login)
router.post('/login', loginPost)


router.get('/home',admin_token, home)
router.get('/form',admin_token, form)

module.exports = router