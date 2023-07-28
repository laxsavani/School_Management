const express = require('express');
const router = express.Router();
const upload = require('../helper/multer')
const admin_token = require('../middleware/student.middeleare')
const {
    login,
    loginPost
} = require('../controller/studentcontroller')

router.get('/login', login)
router.post('/login', loginPost)

module.exports = router