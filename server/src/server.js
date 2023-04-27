import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import dotenv from 'dotenv';
import db from './config/Database.config.js';
import routes from './api/routes/index.js';
import cookieParser from 'cookie-parser';
import http from 'http';
import { Server } from 'socket.io';
// import fileUpload from 'express-fileupload';
import { allowCrossDomain } from './api/utils/corsMiddleware.js';
dotenv.config();
const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.REACT_APP_CLIENT_URL,
  },
});

let activeUsers = [];

io.on('connection', (socket) => {
  // add new User
  socket.on('new-user-add', (newUserId) => {
    // if user is not added previously
    if (!activeUsers.some((user) => user.userId === newUserId)) {
      activeUsers.push({ userId: newUserId, socketId: socket.id });
      console.log('New User Connected', activeUsers);
    }
    // send all active users to new user
    io.emit('get-users', activeUsers);
  });

  socket.on('disconnect', () => {
    // remove user from active users
    activeUsers = activeUsers.filter((user) => user.socketId !== socket.id);
    console.log('User Disconnected', activeUsers);
    // send all active users to all users
    io.emit('get-users', activeUsers);
  });

  // send message to a specific user
  socket.on('send-message', (data) => {
    const { receiverId } = data;
    const user = activeUsers.find((user) => user.userId === receiverId);
    console.log('Sending from socket to :', receiverId);
    console.log('Data: ', data);
    if (user) {
      io.to(user.socketId).emit('receive-message', data);
    }
  });
});

// Add headers before the routes are defined
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
const PORT = process.env.PORT || 3000;
app.use(allowCrossDomain);
app.use(morgan('combined'));

//Connect database
db.connect(process.env.MONGODB_URL);
//routes
routes(app);

// app.listen(PORT, () => {
//   console.log(`App listening on port ${PORT}`);
// });

server.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
