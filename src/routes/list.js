const express = require("express");
const db = require("../config/db.config");
const moment = require("moment");
const jwt_decode = require("jwt-decode");

const List = db.list;
const router = express.Router();

router.get("/list-user", async (req, res) => {
  try {
    const token = req.headers["x-access-token"];
    if (token) {
      const data = await List.findAll({
        attributes: ["id", "username", "checkin", "checkout"],
      });

      if (!data) {
        return res.status(401).send({ msg: "data not found" });
      }
      return res.status(200).send(data);
    } else {
      return res.status(400).send({
        msg: "there is no token",
      });
    }
  } catch (error) {
    return res.status(500).send("internal server error");
  }
});

router.put("/list-user/:token", async (req, res) => {
  try {
    // const token = req.headers["x-access-token"];
    // if (token) {

    var token = req.params.token;
    var decoded = jwt_decode(token);

    // console.log(decoded);

    if (decoded) {
      // res.status(200).send(decoded);
      const find = await List.findOne({
        where:{
          username : decoded.username
        }
      })
      // res.send(find).status(200)
      if(find){
        const update = await find.update({
          checkout: moment().format("YYYY-MM-DD h:mm:ss a"),
        });

        return res.status(200).send({
          msg:update
        });
      }
    }
  } catch (err) {
    res.status(500).send({
      auth: false,
      msg: err,
    });
  }
});

router.post("/list-user/:token", async (req, res) => {
  try {
    // const token = req.headers["x-access-token"];
    // if (token) {

    var token = req.params.token;
    var decoded = jwt_decode(token);

    // console.log(decoded);

    if (decoded) {
      // res.status(200).send(decoded);
      const [data, created] = await List.findOrCreate({
        where: {
          username: decoded.username,
        },
        defaults: {
          username: decoded.username,
          checkin: moment().format("YYYY-MM-DD h:mm:ss a"),

          checkout: req.body.checkout,
        },
      });

      if (!created) {
        return res.status(401).send({
          msg: "data already exixt",
        });
      }
      return res.status(200).send({
        msg: "data sucess created",
        data,
      });
    } else {
      res.status(500).send({
        auth: false,
        msg: "fail",
      });
    }

    // } else {
    //   return res.status(400).send({
    //     msg: "there is no token",
    //   });
    // }
  } catch (err) {
    res.status(500).send({
      auth: false,
      msg: err,
    });
  }
});

module.exports = router;
