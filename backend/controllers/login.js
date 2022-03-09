const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;
const User = require('../models/user');

const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );
      res.cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
      });
      res.status(200).send({ message: 'Вы успешно залогинены' });
    })
    .catch((_e) => {
      const err = new Error('Введены неправильный email или пароль');
      err.statusCode = 401;

      next(err);
    });
};

const logout = (req, res, _next) => {
  res.clearCookie('jwt');
  res.status(200).send({ message: 'Вы успешно разлогинены' });
};

module.exports = { login, logout };
