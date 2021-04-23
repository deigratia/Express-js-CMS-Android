require("dotenv").config();

const JWTSECRET = process.env.JWT;

module.exports = { JWTSECRET };
