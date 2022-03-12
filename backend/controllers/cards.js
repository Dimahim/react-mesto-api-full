const Card = require('../models/card');

const ForbiddenError = require('../errors/forbiddenError');
const NotFoundError = require('../errors/notFoundError');
const ValidateError = require('../errors/validateError');

// Получаем все карточки
module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.status(200).send({ cards }))
    .catch(next);
};

// Создаем карточку
module.exports.createCard = (req, res, next) => {
  console.log(req.body);
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => res.status(200).send({ body: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new ValidateError('Переданы некорректные данные');
      } else {
        throw err;
      }
    })
    .catch(next);
};

// Удаляем карточку
module.exports.deleteCard = (req, res, next) => {
  const owner = req.user._id;
  Card
    .findOne({ _id: req.params.cardId })
    .orFail(() => new NotFoundError('Карточка не найдена'))
    .then((card) => {
      if (!card.owner.equals(owner)) {
        throw new ForbiddenError('Нет прав на удаление этой карточки');
      } else {
        Card.deleteOne(card)
          .then(() => res.status(200).send({ message: 'Карточка удалена' }));
      }
    })
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        throw new ValidateError(' Указан не верный id карточки ');
      } if (err.name === 'CastError') {
        throw new ValidateError('Переданы некорректные данные');
      } else {
        throw err;
      }
    })
    .catch(next);
};

// Ставим лайк карочке
module.exports.putLike = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка не найдена');
      } else {
        res.status(200).send({ data: card });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new ValidateError('Указан не верный id карточки');
      } else {
        throw err;
      }
    })
    .catch(next);
};

// Удаляем лайк
module.exports.removeLike = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка не найдена');
      } else {
        res.status(200).send({ data: card });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new ValidateError('Указан не верный id карточки');
      } else {
        throw err;
      }
    })
    .catch(next);
};
