const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const { NODE_ENV, JWT_SECRET_KEY } = process.env;

const ValidateError = require('../errors/validateError');
const ConflictError = require('../errors/сonflictError');
const NotFoundError = require('../errors/notFoundError');
const AuthError = require('../errors/authError');

// Поучаем всех пользователей
module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.status(200).send({ data: users }))
    .catch(next);
};

// Получаем пользователя по id
module.exports.getUserID = (req, res, next) => {
  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь не найден');
      } else {
        res.status(200).send({ data: user });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new ValidateError('Переданы некорректные данные');
      } else {
        throw err;
      }
    })
    .catch(next);
};

// Создаем пользователя
module.exports.createUser = (req, res, next) => {
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;
  if (!email || !password) {
    throw new ValidateError('Неправильные почта или пароль');
  }
  return bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }))
    .then((user) => {
      res.status(200).send({ message: `Пользователь ${user.name} успешно зарегистрирован. Почта:  ${user.email}` });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new ValidateError('Переданы некорректные данные');
      }
      if (err.code === 11000) {
        throw new ConflictError('Адрес электронной почты уже используется.');
      }
    })
    .catch(next);
};

// Получает из запроса почту и пароль и проверяет их.
// Если почта и пароль правильные, контроллер должен создавать JWT сроком на неделю.
module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET_KEY : 'dev-secret',
        { expiresIn: '7d' },
      );
      res.status(200).send({ token });
    })
    .catch(() => { throw new AuthError('Неправильные почта или пароль'); })
    .catch(next);
};

// Получаем данные профиля
module.exports.getMyProfile = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Нет пользователя с таким id');
      }
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new ValidateError('Переданы некорректные данные');
      } else {
        throw err;
      }
    })
    .catch(next);
};

// Обновляем профиль
module.exports.updateUser = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { runValidators: true, new: true },
  )
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь не найден');
      } else {
        res.status(200).send(user);
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new ValidateError('Переданы некорректные данные');
      }
      if (err.name === 'CastError') {
        throw new ValidateError('Переданы некорректные данные');
      } else {
        throw err;
      }
    })
    .catch(next);
};

// Обновляем аватар
module.exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь не найден');
      } else {
        res.status(200).send(user);
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new ValidateError('Переданы некорректные данные');
      }
      if (err.name === 'CastError') {
        throw new ValidateError('Переданы некорректные данные');
      } else {
        throw err;
      }
    })
    .catch(next);
};
