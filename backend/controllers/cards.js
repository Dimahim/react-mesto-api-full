const Card = require('../models/card');

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const id = req.user._id;
  Card.create({ name, link, owner: id })
    .then((card) => {
      const {
        owner,
        likes,
        _id,
        createdAt,
      } = card;
      return res.status(200).send({
        name,
        link,
        owner,
        likes,
        _id,
        createdAt,
      });
    })
    .catch((e) => {
      const err = new Error('Ошибка. Переданы некорректные данные');
      if (e.name === 'ValidationError') {
        err.statusCode = 400;
      }
      next(err);
    });
};

module.exports.getAllCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.status(200).send(cards))
    .catch(next);
};

module.exports.deleteCard = (req, res, next) => {
  const userId = req.user._id;
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (!card) {
        const err = new Error('Ошибка. Карточка не найдена');
        err.statusCode = 401;
        next(err);
      }
      if (card.owner.toString() !== userId) {
        const err = new Error('Ошибка. Вы не являетесь создателем карточки');
        err.statusCode = 403;

        next(err);
      }
      return res.status(200).send(card);
    })
    .catch((e) => {
      const err = new Error('Ошибка. Переданы некорректные данные');
      if (e.name === 'CastError') {
        err.statusCode = 400;
      }
      next(err);
    });
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        const err = new Error('Ошибка. Карточка не найдена');
        err.statusCode = 404;
        next(err);
      }
      return res.status(200).send(card);
    })
    .catch((e) => {
      const err = new Error('Ошибка. Переданы некорректные данные');
      if (e.name === 'CastError') {
        err.statusCode = 400;
      }
      next(err);
    });
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        const err = new Error('Ошибка. Карточка не найдена');
        err.statusCode = 404;
        next(err);
      }
      return res.status(200).send(card);
    })
    .catch((e) => {
      const err = new Error('Ошибка. Переданы некорректные данные');
      if (e.name === 'CastError') {
        err.statusCode = 400;
      }
      next(err);
    });
};
