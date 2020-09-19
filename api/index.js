import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import { gameRooms } from './socket/gameRooms';

//Import Routes
import authRoute from './routes/auth';
import postRoute from './routes/post';

dotenv.config();

//Connect to DB
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true }, () =>
  console.log('Connected to MongoDB'),
);

//App setup
const app = express();
const server = new http.Server(app);

//Middleware
app.use(express.json()); //allows body to be used in request
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
    exposedHeaders: 'auth-token'
  }),
);

//Router Middlewares
app.use('/api/user', authRoute);
app.use('/api/post', postRoute);

app.listen(process.env.API_PORT, () => {
  console.log(`Api listening on port ${Number(process.env.API_PORT)}!`);
});

server.listen(Number(process.env.API_PORT) + 1, () => {
  console.log(`Socker listening on port ${Number(process.env.API_PORT) + 1}!`);
});


//GameRoom Socket
gameRooms(server);