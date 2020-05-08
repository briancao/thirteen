const router = require("express").Router();
const User = require("../model/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {
    registerValidation,
    loginValidation,
} = require("../utils/validation");

router.post("/register", async (req, res) => {
    //Validate data being sent in
    const { error } = registerValidation(req.body);
    if (error) {
        console.log(error);
        res.status(400).send(error.details[0].message);
    }

    //Checking if user is already in the database
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) {
        return res.status(400).send("Email already exists");
    }

    //Hash Passwords
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    //Create new user
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashPassword,
    });
    //Save
    try {
        const savedUser = await user.save();
        res.send({ id: savedUser.id });
    } catch (err) {
        res.status(400).send(err);
    }
});

router.post("/login", async (req, res) => {
    console.log(req);
    const { error } = loginValidation;
    if (error) {
        console.log(error);
        res.status(400).send(error.details[0].message);
    }

    //Checking if email exists
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return res.status(400).send("Email or Password is incorrect");
    }

    //Password is correct
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) {
        return res.status(400).send("Email or Password is incorrect");
    }

    //Create and assign a token
    const token = jwt.sign({ id: user.id, email: user.email }, process.env.TOKEN_SECRET);
    res.header("auth-token", token).send({ token });
});

router.post("/reset/:paramId", async (req, res) => {
    const id = req.params.paramId;
});

module.exports = router; /*  */
