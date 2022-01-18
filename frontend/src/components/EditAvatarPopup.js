import React, { useRef, useEffect } from 'react';
import PopupWithForm from "./PopupWithForm";


function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, buttonText }) {
  //Реф для прямого доступа к DOM-элементу инпута и его значению
  const avatarRef = useRef('');

  //Очистка поля ввода 
  useEffect(() => {
    avatarRef.current.value = '';
  }, [isOpen])

  //Обработчик сабмита формы аватара
  function handleSubmit(event) {
    event.preventDefault();
// Значение инпута, полученное с помощью реф
    onUpdateAvatar({
      avatar: avatarRef.current.value 
    });
  }

  return(
    <PopupWithForm // Попап смены аватара
      isOpen={isOpen}
      onClose={onClose}
      buttonText ={buttonText}
      title="Обновить аватар"
      buttonName="Сохранить"
      name="avatar"
      onSubmit={handleSubmit}
    >
      <input 
        type="url" 
        name="avatar" 
        id="avatar" 
        className="form__field form__field_avatar" 
        placeholder="Ссылка на аватар" 
        ref={avatarRef} 
        required
        />

      <span 
        className="form__field-error" 
        id="avatar-error">Ошибка</span>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;