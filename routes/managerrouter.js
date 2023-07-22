const express = require('express');
const router = express.Router();
const upload = require('../helper/multer')
const admin_token = require('../middleware/manager.middleware')
const {
    login,
    loginPost,
    home,
    form,
    update,
    updatePost,
    mail,
    deletes
} = require('../controller/managercontroller')

router.get('/login', login)
router.post('/login', loginPost)


router.get('/home',admin_token, home)
router.get('/form',admin_token, form)
router.get('/update/:id',admin_token, update)
router.post('/update/:id',admin_token, updatePost)
router.get('/mail/:id',admin_token, mail)
router.get('/delete/:id',admin_token, deletes)


module.exports = router