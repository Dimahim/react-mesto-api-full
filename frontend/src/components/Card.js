import React, { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";


function Card({ card, onCardClick, onWatchCard, onCardLike, onCardDelete }) {
  //Подписка на контекст 
  const currentUser = useContext(CurrentUserContext);

  //Определяем, являемся ли мы владельцем карточки
  const isOwn = card.owner._id === currentUser._id;
  
  // Просмотр картинок
  function handleClick() {
    onCardClick(card);
    onWatchCard();
  }
   //Переменная  кнопки удаления Показываем кнопку удалить только на своих карточках
  const cardDeleteButton = (
    `elements__btn ${isOwn ? 'elements__btn_active' : ''}`
  );

  //Определяем, есть ли у карточки поставленный нами лайк
  const isLiked = card.likes.some(i => i._id === currentUser._id);

  //Переменная для класса кнопки лайка (закрашивание, если карточка лайкнута нами)
  const cardLikeButton = (
    `elements__group ${isLiked ? 'elements__group_like_active' : ''}`
  );

    //Обработчик клика по лайку
  function handleCardLike() {
    onCardLike(card)
  }
    //Обработчик удаления карточки
  function handleDeleteCard() {
    onCardDelete(card)
    
  }

  return (
    <div className="elements">
        <div className="elements__element">
          <img className="elements__image" src={card.link} alt={card.name} onClick={handleClick}/>
          <div className="elements__container">
            <h2 className="elements__text">{card.name}</h2>
            <div className="elements__container-like">
              <button className={cardLikeButton} onClick={handleCardLike} type="button" aria-label="лайк"></button>
              <span className="elements__number-likes">{card.likes.length}</span>
            </div>
          </div>
          <button className={cardDeleteButton} onClick={handleDeleteCard} aria-label="Удалить" type="button"></button>
        </div>  
      </div>
  )
};

export default Card;