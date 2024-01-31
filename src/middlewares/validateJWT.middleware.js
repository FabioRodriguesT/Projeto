const mapStatusHTTP = require('../utils/mapStatusHTTP');
const auth = require('../utils/auth');

const isValidToken = (req, res, next) => {
  const bearerToken = req.header('Authorization');
  const token = bearerToken.split(' ')[1];

  if (!bearerToken) {
    return res.status(mapStatusHTTP('UNAUTHORIZED')).json({ message: 'Token not found' });
  }

  try {
    const decoded = auth.verify(token);
    req.token = token;
    req.userId = decoded.userId;
    next();
  } catch (error) {
    return res.status(mapStatusHTTP('UNAUTHORIZED')).json({ message: 'Expired or invalid token' });
  }
};

module.exports = {
  isValidToken,
};