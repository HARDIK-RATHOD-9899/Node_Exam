const { Router } = require("express");
const bcrypt = require("bcrypt");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const UserModel = require("../Model/UserSchema");
const UserRouter = Router();




UserRouter.post("/signup", async (req, res) => {
  const { username, email, password, role, adminCode } = req.body
  try {
    
    if (role == 'admin' && adminCode != process.env.secret) {
      return res.status(501).send({ msg: "Unauthorised !!" })
  }
    bcrypt.hash(password, 5, async (err, hash) => {
      if (err) {
        return res.send({ msg: err });
      }
      let obj = {
        username: username,
        email: email,
        password: hash,
        role:role
      };
      let data = await UserModel.create(obj);
      res.status(200).send({ msg: "User registered successfully", data });
    });
  } catch (error) {
    res.status(501).send({ msg: error.message });
  }
});

UserRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await UserModel.findOne({ email:email });

    if (user) {
            bcrypt.compare(password, user.password, (err, result) => {
                if (result) {
                    const token = jwt.sign(
                        { userID: user._id, username: user.username, role: user.role },
                        process.env.secret
                    );
                    res.status(200).send({ msg: "User Logged in successfully", token });
                } else {
                    res.status(501).send({ msg: "Incorrect Passwrod" });
                }
            })
        } else {
            res.status(501).send({ msg: "User not registered" });
        }
    } catch (error) {
        res.status(501).send({ msg: error.message })
    }
})



module.exports = UserRouter;
