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
    if (socket.handshake.query.token == 'test') {
      console.log('break');
    } else {
      const decoded = jwt.verify(socket.handshake.query.token, process.env.TOKEN_SECRET);
      socket.decoded = decoded;
      next();
    }
  }
};

export const verifyToken = token => {
  try {
      const decoded = jwt.verify(token, API_KEY);
      return decoded;
  } catch {
      return false;
  }
};

export function guestIdGenerator() {
  var userName = `Guest${Math.random() * 9999}`;
  var timestamp = ((new Date().getTime() / 1000) | 0).toString(16);
  var objectId = 'xxxxxxxxxxxxxxxx'
    .replace(/[x]/g, function () {
      return ((Math.random() * 16) | 0).toString(16);
    })
    .toLowerCase();
  return {
    id: `${userName}-${timestamp}${objectId}`,
    username: userName,
  };
}
