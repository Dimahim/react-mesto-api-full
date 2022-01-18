// Роуты для пользователя.
const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getUserID,
  getUsers,
  updateUser,
  updateAvatar,
  getMyProfile,
} = require('../controllers/users');

// Возвращаем всех пользователей
router.get('/users', getUsers);

// Получаем данные пользователя
router.get('/users/me', getMyProfile);

// Возвращаем пользователя по id
router.get('/users/:id', celebrate({
  body: Joi.object().keys({
    id: Joi.string().required().length(24).hex(),
  }),
}), getUserID);

// Обновляем профиль
router.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), updateUser);

// Обновляем аватар
router.patch('/users/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required()
      .pattern(
        /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\\+~#=]+\.[a-zA-Z0-9()]+([-a-zA-Z0-9()@:%_\\+.~#?&/=#]*)/,
      ),
  }),
}), updateAvatar);

module.exports = router;
