import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

export const authenticateJWT = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    console.log('Token not found in cookies');

    return res.status(401).json({ message: 'Authentication token required' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (err) {
    console.log('Invalid token:', err.message);
    res.status(403).json({ message: 'Invalid token' });
  }
};


// node -e "console.log(require('crypto').randomBytes(32).toString('hex'));" generate jwt secret
