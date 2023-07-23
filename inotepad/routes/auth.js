const express = require("express");
const { ConnectionStates } = require("mongoose");
const router = express.Router();
const User = require("../models/User")
const { body, validationResult } = require('express-validator');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const fetchUser = require("../middleware/fetchUser")
const JWT_SECRET = "harryisagoodboy"

// Create a user using POST request
router.post("/createUser", [
    body('name').isLength({ min: 3 }),
    body('email').isEmail(),
    body('password').isLength({ min: 5 }),
], async (req, res) => {
    let success=false
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array() });
    }
    try {
        let user = await User.findOne({ email: req.body.email })
        if (user) {
            success=false
            return res.status(400).json({error: "Sorry user already exsists" })
        }
        var salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt)
        user = await User.create({
            name: req.body.name,
            password: secPass,
            email: req.body.email
        })
        const data = {
            user: {
                id: user.id
            }
        }
        const JWTData = jwt.sign(data, JWT_SECRET);
        success=true;
        res.json({success,JWTData})
        // res.json(user)
    } catch (error) {
        res.json(error)
    }
})

//login
router.post("/login", [
    body('email').isEmail(),
    body('password').isLength({ min: 5 }),
], async (req, res) => {
    let success=false
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body
    try {
        let user = await User.findOne({ email })
        if (!user) {
            success=false
            return res.json({ error: "Internal server error" })
        }
        const correctPassWord = await bcrypt.compare(password, user.password);
        if (!correctPassWord) {
            return res.json({ error: "Internal server error" })
        }
        const data = {
            user: {
                id: user.id
            }
        }
        const JWTData = jwt.sign(data, JWT_SECRET);
        success=true;
        res.json({success,JWTData})

    } catch (error) {
        res.json(error)
    }
})




//user details (login required)
router.post("/getuser", fetchUser, async (req, res) => {
    // try {
    //   const user = await User.findById(userId).select("-password")
    //   const userId=req.user.id
    //   res.send(user)
    // } catch (error) {
    //     res.json(error)
    // }
    try {
        userId = req.user.id;
        const user = await User.findById(userId).select("-password")
        res.send(user)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

module.exports = router