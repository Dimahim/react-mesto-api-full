import React from "react";
import Card from "./Card";
import {CurrentUserContext} from '../contexts/CurrentUserContext.js';
import Header from "./Header";



function Main({ 
  onEditProfile, 
  onAddPlace, 
  onEditAvatar, 
  onCardClick, 
  onWatchCard, 
  cards, 
  onCardLike, 
  onCardDelete, 
  loggedIn, 
  userLoginData, 
  logout }) {
//Подписка на контекст CurrentUserContext
  const currentUser = React.useContext(CurrentUserContext);
  //console.log(currentUser)

  return (
  //Данные профиля с кнопками и шаблон карточки
  <>
      <Header 
        loggedIn={loggedIn}
        login={userLoginData}
        link="/sign-in"
        onClick={logout}
        headerText={'Выйти'}
      />

      <main>  
        <div className="profile">
          <img className="profile__avatar" src={`${currentUser.avatar}`} alt="аватар" onClick={onEditAvatar} />
          <div className="profile__profile-info">
            <h1 className="profile__title">{currentUser.name}</h1>
            <button className="profile__edit-button" type="button" aria-label="Редактировать" onClick={onEditProfile}></button>
            <p className="profile__subtitle">{currentUser.about}</p>
          </div>
          <button className="profile__add-button" type="button" aria-label="Добавить" onClick={onAddPlace}></button>
        </div> 
        
        <section className="template-container">
          {
            cards.map(card => (
              <Card 
              card={card} 
              key={card._id} 
              onCardClick={onCardClick} 
              onWatchCard={onWatchCard} 
              onCardLike={onCardLike} 
              onCardDelete={onCardDelete}
              
              />
            ))
          }
            
        </section>
      </main> 
    </>
  );
}

export default Main