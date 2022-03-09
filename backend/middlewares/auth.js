const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const cookie = req.cookies.jwt;

  if (req.originalUrl === '/users/me' && !cookie) {
    res.send({ message: 'Необходима авторизация' });
  }
  if (!cookie) {
    const err = new Error('Необходима авторизация');
    err.statusCode = 401;

    next(err);
  }

  let payload;

  try {
    const { JWT_SECRET = 'dev-key' } = process.env;

    payload = jwt.verify(cookie, JWT_SECRET);
  } catch (e) {
    const err = new Error('Необходима авторизация. Неверный токен');
    err.statusCode = 401;

    next(err);
  }

  req.user = payload;
  next();
};
