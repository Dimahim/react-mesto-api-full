import React, { useEffect, useState, useContext  } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";


function EditProfilePopup({ isOpen, onClose, onUpdateUser, buttonText }) {

  //Подписываемся на контекст
  const currentUser = useContext(CurrentUserContext);

  //Cтейты имени и рода занятия
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  //Данные полей ввода после загрузки Апи
  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen])

  //Функция изменения данных в полях ввода
  function handleUserName(event) {
    setName(event.target.value)
  }

  //Функция для изменения должности
  function handleUserDescription(event) {
    setDescription(event.target.value)
  }

  //Обработчик сабмита формы
  function handleSubmit(event) {
    event.preventDefault();
    //Передача значений управляемых компонентов во внешний обработчик
    onUpdateUser({
      name: name,
      about: description
    });

  }
  

  return (
    <PopupWithForm //Попап редактирования профиля
      isOpen={isOpen}
      onClose={onClose}
      buttonText={buttonText}
      title="Редактировать профиль"
      buttonName="Сохранить"
      name="edit-profile"
      onSubmit={handleSubmit}
    >
    
      <input 
        type="text" 
        id="name" 
        name="userName" 
        className="form__field form__field_item_name" 
        placeholder="Имя"
        onChange={handleUserName}
        minLength="2"
        maxLength="40"
        value={name ? name : ''}
      />

      <span 
        className="form__field-error" 
        id="name-error">Ошибка</span> 

      <input 
        type="text"  
        id="info" 
        name="userJob" 
        className="form__field form__field_item_job"  
        placeholder="О себе"
        onChange={handleUserDescription}
        minLength="2"
        maxLength="100"
        value={description ? description : ''}
        />

      <span 
        className="form__field-error" 
        id="info-error">Ошибка</span>  
  </PopupWithForm>
  );
}
export default EditProfilePopup;