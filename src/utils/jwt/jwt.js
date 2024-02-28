const jwt = require('jsonwebtoken');

const secretKey = process.env.SECRET_KEY;
const tokenExpiracy = process.env.TOKEN_TTL 

  
exports.generateToken = (payload) => {
    const token = jwt.sign({ username : payload }, secretKey, {
        expiresIn: '1h',
        });

    return token;
};

exports.verifyToken = (token) => {
    try {
        jwt.verify(token, secretKey);
        return true;
      } catch (error) {
        return false;
      }
  };

  exports.getPayloadFromToken = (token) => {
    try {
        const decoded = jwt.decode(token);
        return decoded;
    } catch (error) {
        throw new Error('Failed to decode token: ' + error.message);
    }
};


