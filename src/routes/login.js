const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../config/db.config");
const { JWTSECRET } = require("../middlewares/jwt");

const User = db.user;
const router = express.Router();

router.post("/register-user", async (req, res) => {
  try {
    // const token = req.headers["x-access-token"];
    // if (token) {
    let hashedPassword = bcrypt.hashSync(req.body.password, 5);

    const [data, created] = await User.findOrCreate({
      where: {
        username: req.body.username,
      },
      defaults: {
        username: req.body.username,
        password: hashedPassword,
        type: req.body.type,
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
    // } else {
    //   return res.status(400).send({
    //     msg: "there is no token",
    //   });
    // }
  } catch (err) {
    res.status(500).send({
      auth: false,
      msg: "internal server error",
    });
  }
});

router.get("/register-user", async (req, res) => {
  try {
    const token = req.headers["x-access-token"];
    if (token) {
      const data = await User.findAll({
        attributes: ["id", "username", "type"],
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

router.get("/register-user/:id", async (req, res) => {
  try {
    const find = await User.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (!find) {
      return res.status(401).send({ msg: "data not found" });
    }
    return res.status(200).send(find);
  } catch (error) {}
});

router.delete("/register-user/:id", async (req, res) => {
  try {
    const find = await User.findOne({
      where: {
        id: req.params.id,
      },
    });

    const data = find.destroy();

    if (!data) {
      return res.status(401).send({ msg: "data not found" });
    }
    return res.status(200).send({ data: find, msg: "data succes deleted" });
  } catch (error) {
    return res.status(500).send("internal server error");
  }
});

router.put("/register-user/:id", async (req, res) => {
  try {
    const find = await User.findOne({
      where: {
        id: req.params.id,
      },
    });
    if(find){
      const data = await find.update({
        username: req.body.username,
        type: req.body.type,
      });
      return res.status(200).send({
        msg:"seccess updated",
        data
      });
    }
    return req.status(400).send({
      msg:"No data"
    })
    
  } catch (error) {}
});

router.post("/login", async (req, res) => {
  User.findOne({
    where: {
      username: req.body.username,
    },
  })
    .then((data) => {
      const validPassword = bcrypt.compareSync(
        req.body.password,
        data.password
      );
      if (validPassword) {
        var token = jwt.sign(
          {
            id: data.id,
            username: data.username,
          },
          JWTSECRET,
          {
            expiresIn: 86400, // expires in 24 h
          }
        );
        res.send({
          auth: true,
          token: token,
        });
      } else {
        res.status(400).send({
          auth: false,
          message: "password is invalid",
        });
      }
    })
    .catch((err) => {
      res.status(500).send("internal server error");
    });
});

router.get("/dashboard", (req, res) => {
  const token = req.headers["x-access-token"];
  if (!token)
    return res.status(401).send({
      auth: false,
      message: "No token provided.",
    });

  jwt.verify(token, JWTSECRET, (err, decoded) => {
    User.findAll({
      where: {
        username: decoded.username,
      },
    })
      .then((response) => {
        if (err)
          return res.status(500).send({
            auth: false,
            message: "Failed to authenticate token.",
          });

        res.status(200).send(response);
      })
      .catch((err) => {
        res.status(500).send("internal server error");
      });
  });
});

module.exports = router;
