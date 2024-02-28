const cookieName = 'session';
const httpOnly = true;
const ttl = process.env.TOKEN_TTL;

exports.getToken = (req) => {
  return req.cookies[cookieName];
};

exports.setCookie = (res, jwtToken) => {
  res.cookie(cookieName, jwtToken, {
    maxAge: ttl * 1000, 
    httpOnly: httpOnly,
    sameSite: 'strict'
  });
};
