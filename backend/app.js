const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { errors, celebrate, Joi } = require('celebrate');
const routerUser = require('./routes/users');
const routerCards = require('./routes/cards');
const { errorLogger, requestLogger } = require('./middlewares/logger');
const auth = require('./middlewares/auth');

const app = express();
const { PORT = 3000 } = process.env;
const { login, createUser } = require('./controllers/users');
const NotFoundError = require('./errors/notFoundError');

// подключаемся к серверу mongo
mongoose.connect('mongodb://localhost:27017/mestodb').catch((err) => console.log(err));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Мидлвер логи запросов.
app.use(requestLogger);

// Логин
app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);
// Создание пользователя
app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(100),
    avatar: Joi.string()
      .regex(/^(https?:\/\/)?([\da-z.-]+).([a-z.]{2,6})([/\w.-]*)*\/?$/),
  }),
}), createUser);

// подключаем роуты пользователя
app.use('/', auth, routerUser);

// получаем роуты карточек
app.use('/', auth, routerCards);

// обработка несуществующего роута
app.use('*', auth, (req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

// Мидлвер логи ошибок.
app.use(errorLogger);

// Обработчик ошибок
app.use(errors());

// Мидлвэр для обработки ошибок централизоапнно.
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message: statusCode === 500
      ? 'На сервере произошла ошибка.'
      : message,
  });
  next();
});

// Слушаем порт
app.listen(PORT, () => {
  console.log(`Projeсt is listenning on port ${PORT}`);
});
