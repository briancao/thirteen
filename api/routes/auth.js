import express from 'express';
import User from '../model/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { registerValidation, loginValidation } from '../utils/validation';
import { verifyToken, guestIdGenerator } from '../utils/auth';

let router = express.Router();

router.post('/register', async (req, res) => {
  console.log(req.body);

  //Validate data being sent in
  const { error } = registerValidation(req.body);
  if (error) {
    console.log(error);
    return res.status(400).send(error.details[0].message);
  }

  //Checking if user is already in the database
  const username = await User.findOne({ username: req.body.username });
  if (username) {
    console.log('/register: Username already exists');
    return res.status(400).send('Username already exists');
  }

  //Hash Passwords
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  //Create new user
  const user = new User({
    username: req.body.username,
    email: req.body.email || null,
    password: hashPassword,
  });

  //Save
  try {
    await user.save();
    return res.sendStatus(200);
  } catch (err) {
    console.log('/register: Failed to create');
    return res.status(400).send(err);
  }
});

router.post('/login', async (req, res) => {
  const { error } = loginValidation;
  if (error) {
    console.log(error);
    res.status(400).send(error.details[0].message);
  }

  //Checking if email exists
  const user = await User.findOne({
    $or: [{ username: req.body.username }, { email: req.body.username }],
  });
  if (!user) {
    console.log('/login: No User');
    return res.status(400).send('Email or Password is incorrect');
  }

  //Password is correct
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) {
    console.log('/login: Incorrect Password');
    return res.status(400).send('Email or Password is incorrect');
  }

  //Create and assign a token
  const token = jwt.sign(
    { id: user.id, username: user.username, guest: false },
    process.env.TOKEN_SECRET,
  );

  res.header('auth-token', token).sendStatus(200);
});

router.post('/guest', async (req, res) => {
  const guestUser = guestIdGenerator();

  //Create and assign a token
  const token = jwt.sign(guestUser, process.env.TOKEN_SECRET);

  console.log(guestUser);

  res.header('auth-token', token).sendStatus(200);
});

router.post('/verify', async (req, res) => {
  if (!req.body) {
    console.log('/login: Unauthorrized');
    return res.status(401).send('Unauthorized user and/or route');
  }

  const { token } = req.body;
  const decoded = verifyToken(token);

  if (!decoded) {
    console.log('/login: JWT Expired');
    return res.status(400).send('Unauthorized action. JWT expired');
  }

  return res.send({ user: decoded });
});

export default router;
