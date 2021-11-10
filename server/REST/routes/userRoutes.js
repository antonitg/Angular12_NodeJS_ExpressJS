const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController.js');
const { authByToken } = require('../middleware/auth');
//api/users
router.post('/', userController.register);
router.post('/login/', userController.login);
router.get('/', authByToken, userController.find);
router.get('/graphqlAuth', authByToken, userController.graphqlAuth);

module.exports = router;