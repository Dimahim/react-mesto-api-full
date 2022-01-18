import React from 'react';

function PopupWithForm({ name, title, children, isOpen, onClose, buttonName, onSubmit, buttonText}) {
  // Переменная попапа
  const popupOpened = (
    `popup popup_type_${name} ${isOpen ? "popup_opened" : ""}`
  );
  return (
    <div className={popupOpened} >
        <div className="popup__container" > 
          <h2 className="popup__title">{title}</h2>
          <button className="popup__close-icon" onClick={onClose} type="button" aria-label="Закрыть"></button>
          <form className="popup__form" name={name} onSubmit={onSubmit}>      
            { children }
            <button className="form__button"  type="submit" aria-label="Сохранить">{buttonText ? buttonText : buttonName}</button>
          </form> 
        </div>
      </div>
  )
}

export default PopupWithForm;
