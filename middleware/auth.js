import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {
  if(!req.headers.authorization)return res.status(401).json({ message: 'Authorization denied' });
  const token = req.headers.authorization.split(" ")[1];
  if (!token || revokedTokens.has(token)) return res.status(401).json({ message: 'Authorization denied' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (error) {
    console.error(error.message);
    res.status(401).json({ message: 'Invalid token' });
  }
};

export default verifyToken;
