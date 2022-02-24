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
router.get('/api/users', getUsers);

// Получаем данные пользователя
router.get('/api/users/me', getMyProfile);

// Возвращаем пользователя по id
router.get('/api/users/:id', celebrate({
  body: Joi.object().keys({
    id: Joi.string().required().length(24).hex(),
  }),
}), getUserID);

// Обновляем профиль
router.patch('/api/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), updateUser);

// Обновляем аватар
router.patch('/api/users/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required()
      .pattern(
        /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\\+~#=]+\.[a-zA-Z0-9()]+([-a-zA-Z0-9()@:%_\\+.~#?&/=#]*)/,
      ),
  }),
}), updateAvatar);

module.exports = router;
