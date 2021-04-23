const express = require('express');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const jwt = require('jsonwebtoken');
const router = express.Router()
// var config = require('../config/db.config'); // get our config file
// const User   = require('../model/user');

router.get('/', (req, res) => {
    res.send('Hello! The API ');
});

module.exports = router
