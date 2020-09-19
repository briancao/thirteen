import jwt from 'jsonwebtoken';

export default function authenticate(req, res, next) {
  const token = req.header('auth-token');
  if (!token) {
    return res.status(401).send('Access Denied');
  }
  try {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(400).send('Invalid Token');
  }
}

export const verifySocket = (socket, next) => {
  if (socket.handshake.query && socket.handshake.query.token) {
    const decoded = jwt.verify(socket.handshake.query.token, process.env.TOKEN_SECRET);
    socket.decoded = decoded;
    next();
  }
};
