import React from 'react';

function ImagePopup({ card, onClose, isOpen }) {
  //Переменная попапа
  const popupCloseImage = `popup popup_type_img ${isOpen ? "popup_opened" : ""}`



return (
  <div className={popupCloseImage}>
        <div className="popup__image-container">
          <button className="popup__close-icon popup__close-icon_close_image" onClick={onClose} type="button" aria-label="Закрыть"></button>
          <figure className="popup__figure" >
            <img src={`${card.link}`} className="popup__image" alt={card.name} />
            <figcaption className="popup__image-caption">{card.name}</figcaption>
          </figure>
        </div>
      </div>
);
}

export default ImagePopup;