const { getToken } = require('../utils/cookies/cookie');
const { verifyToken, getPayloadFromToken } = require('../utils/jwt/jwt');
const { getUserByUsername } = require('../services/userService');

exports.protectRoute = async (req, res, next) => {
  const token = getToken(req);

  if (!token) {
    return res.status(401).send('Unauthorized');
  }

  try {
    const verified = verifyToken(token);

    if (verified) {
      const username = getPayloadFromToken(token);
      const user = await getUserByUsername(username.username.username);
      req.user = user;
      next();
    } else {
      return res.status(403).send('Forbidden');
    }
  } catch (error) {
    return res.status(403).send('Forbidden');
  }
};

exports.restrictAnon = (req, res, next) => {
  if (req.user && req.user.role !== null) {
    next();
  } else {
    return res.status(403).send('Forbidden');
  }
};

exports.restrictAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    return res.status(403).send('Forbidden');
  }
};
