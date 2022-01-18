import React, { useState, useEffect } from 'react';
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace, buttonText }) {
  //Стейты для карточки имя и ссылка
  const [cardTitle, setCardTitle] = useState('');
  const [cardLink, setCardLink] = useState('');

  //Обработчик назвния
  function handleCardTitle(event) {
    setCardTitle(event.target.value)
  }

  //Обработчик ссылки на картинку
  function handleCardLink(event) {
    setCardLink(event.target.value)
  }

  //Обработчик сабмита формы т данные для апи
  function handleSubmit(event) {
    event.preventDefault();

    onAddPlace({
      name: cardTitle,
      link: cardLink
    })
  }

  useEffect(() => {
    setCardLink('')
    setCardTitle('')
  }, [isOpen])

  return(
    <PopupWithForm // Попап добавления карточки
      isOpen={isOpen}
        onClose={onClose}
        buttonText={buttonText}
        title="Новое место"
        buttonName="Создать"
        name="add-place"
        onSubmit={handleSubmit}
      > 
        <input 
          type="text" 
          name="title" 
          id="title" 
          className="form__field form__field_item_title" 
          placeholder="Название" 
          minLength="2"
          maxLength="30"
          onChange={handleCardTitle}
          value={ cardTitle || ''} 
          required 
          />

        <span 
          className="form__field-error" 
          id="title-error">Ошибка</span>
        <input 
          type="url" 
          name="link" id="link" 
          className="form__field form__field_item_link" 
          placeholder="Ссылка на картинку"  
          onChange={handleCardLink}
          value={cardLink ? cardLink : ''}
          required 
          />

        <span 
          className="form__field-error" 
            id="link-error">Ошибка</span>
      </PopupWithForm>   
  )
}

export default AddPlacePopup;