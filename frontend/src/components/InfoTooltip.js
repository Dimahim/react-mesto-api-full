//компонент модального окна,который информирует пользователя об успешной (или не очень) регистрации.
import React from "react";
import loginSuccess from '../images/login-success.svg';
import loginFailed from '../images/login-failed.svg';

function InfoTooltip({ isOpen, onClose, isRegSuccess, regFailed, regSuccess }) {
  return(
    <>
      <div className={`popup ${isOpen && 'popup_opened'}`}>
        <div className="popup__container popup__reg-modal">
          <button type="button"
                  className="popup__close-icon"
                  onClick={onClose}
          />
          <img className="popup__image-reg-modal"
              src={`${isRegSuccess ? loginSuccess : loginFailed}`}
              alt="статус регистрации"
          />
          <p className="popup__reg-modal-text">
            {`${isRegSuccess ? regSuccess : regFailed}`}
          </p>
        </div>
      </div>
    </>
  );
}

export default InfoTooltip;