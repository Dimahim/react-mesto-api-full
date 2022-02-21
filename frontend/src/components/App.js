import React, { useState, useEffect } from "react";
import { register, login, tokenCheck } from '../utils/auth';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import api from "../utils/api.js";

import Login from './Login';
import Register from './Register';
import InfoTooltip from './InfoTooltip';
import Main from "./Main.js";
import Footer from "./Footer.js";
import ImagePopup from "./ImagePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import EditProfilePopup from "./EditProfilePopup.js";
import AddPlacePopup from "./AddPlacePopup.js";
import PopupWithDeleteCards from "./PopupWithDeleteCards.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";



function App() {

   //Стейты для поп-апов 
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isOpenPopupDeleteCards, setisOpenPopupDeleteCards] = useState(false);
  //Стейт для  кнопки подтвержления удаления
  const [isButtonDeleteText, setIsButtonDeleteText] = useState('')
  // Стейт для открытия попапа просмора картинок, создан что бы призакрытии картинка резко не исчезала а закрывалась плавно
  const [isWatchCardPopup, setIsWatchCardPopupOpen] = useState(false);
   //Стейт просмотра картинок
  const [selectedCard, setSelectedCard] = useState({});
  //Стейт для карточек
  const [cards, setCards] = useState([]);
    //Стейт для данных пользователя
  const [currentUser, setCurrentUser] = useState({});
  // Стейт для удаления карточки
  const [cardRemove, setCardRemove] = useState({});
  // Стейт для авторизации. Показывает, залогинен пользователь или нет, показа только доступного контента
  const [loggedIn, setLoggedIn] = useState(false);
  //Стейт для отображения InfoTooltip. Модалка при успешной/ неудачной регистрации или авторизации
  const [isTooltipOpened, setIsTooltipOpened] = useState(false);
  //Стейт для авторизации. Состояние успешности авотризации пользователя.
  const [isAuth, setIsAuth] = useState(false);
  //Стейт для данных залогиненного пользователя  _id и email
  const [userLoginData, setUserLoginData] = useState('');
  const navigate = useNavigate();


  //Получаем данные пользователя и карточки
  useEffect(() => {
    if (loggedIn) {
      // const token = localStorage.getItem('jwt');

      Promise.all([api.getUserInfo(), api.getCardsInfo()])
      .then(([userInfo, cards]) => {   
        setCurrentUser(userInfo); // --- данные профиля
        setCards(cards); // -- данные карточки
    })
    .catch((err) => {
        console.log(`${err}`);
    });
} 
}, [loggedIn]);

 //Токен если есть устанавливаем loggedIn
  useEffect(() => {
    if (localStorage.getItem('jwt')) {
      const token = localStorage.getItem('jwt');
      
      tokenCheck(token)
        .then((res) => {
          if(res) {
            setLoggedIn(true);
            setUserLoginData(res.data.email);
                      
          }
        })
        .catch((err) => {
          openRegModal();
          console.log(`Произошла ошибка: ${err}`);
        });
    }
  }, [navigate, loggedIn]);

  useEffect(() => {
    if (loggedIn) {
      navigate('/');
    }
  }, [navigate, loggedIn]);
    



  //Обработчик регистрация нового пользователя
  const handleRegister = (data) => {
    const { email, password } = data;
    return register(email, password)
      .then((res) => {
        if (res) {
          setIsAuth(true);
          openRegModal();
          navigate('/signin');
          
        }
      })
      .catch((err) => {
        setIsAuth(false);
        openRegModal();
        console.log(`Произошла ошибка: ${err}`);
        navigate('/signup');
      });
  };

  //Обработчик  авторизации пользователя
  const handleLogin = (data) => {
    const { email, password } = data;
    setUserLoginData(email);
    login(email, password)
      .then((res) => {
        if (res.token) {
          localStorage.setItem('jwt', res.token);
          setLoggedIn(true);
          setIsAuth(true);
          navigate('/');
        }
      })
      .catch((err) => {
        setIsAuth(false);
        openRegModal();
        console.log(`Произошла ошибка: ${err}`);
      });
  };

  //Показ попапа о удачной или нет регистрации
  function openRegModal() {
    setIsTooltipOpened(true);
  }

  // Логаут пользователя из системы
  const handleLogout = () => {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
    setIsAuth(false);
    navigate('/signin');
  };


  // Обработчик попапа просмотра картинок
  function handleWatchCardPopup() {
    setIsWatchCardPopupOpen(true);
  }
  
  //Обработчик попапа просмотра картинок
  function handleCardClick(card) {
    setSelectedCard(card);
    
  }

  //Обработчик кнопки редактирования аватарки
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
    
  }

  //Обработчик кнопки редактирования  профиля
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
    
  }

  //Обработчик кнопки добавления карточки
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  //Обработчик получения карточки для попапа подтверждения удаления карточки
  function confirmCardDelete(card) {
    setCardRemove(card);
    setisOpenPopupDeleteCards(true);
  }

  //Обработчик закрытия поп-апов
  function closeAllPopups() {
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsWatchCardPopupOpen(false);
    setisOpenPopupDeleteCards(false);
    setIsTooltipOpened(false)
    setIsButtonDeleteText('')
  }

   //Обработчик редактирования профиля отправка  данных пользователя на сервер 
  function handleUpdateUser(userInfo) {
    setIsButtonDeleteText('Сохранение...')
    api.patchUserProfil(userInfo)
      .then(res => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch(err => console.log(err))
  }

  
  //Обработчик обновления аватарки 
  function handleUpdateAvatar(avatarLink) {
    setIsButtonDeleteText('Сохранение...')
    api.patchAvatarUser(avatarLink)
      .then(res => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch(err => console.log(err))
  }

    //Функция добавления карточки
  function handleAddPlace(newCard) {
    setIsButtonDeleteText('Добавление...')
    api.postNewCard(newCard)
      .then(res => {
      setCards([res, ...cards]);
        closeAllPopups();
      })
      .catch(err => console.log(err))
  }

    //Функция лайка карточки
  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);
      
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    })
      .catch(err => console.log(err));
  } 

  //Функция удаления карточки, по аналогии с функцией лайка
  function handleCardDelete(card) {
    setIsButtonDeleteText('Удаление...')
    api.deleteCard(card._id)
      .then(() => {
        setCards(cards.filter(item => item._id !== card._id));
        closeAllPopups()
      })
      .catch(err => console.log(err));
  }

 // Закрытие попапа по Esc
  useEffect(() => {
    function handleEscapeClick(evt) {
      if (evt.key ==='Escape') {
        closeAllPopups();
      }
    }
    document.addEventListener('keyup', handleEscapeClick);

    return () => {
      document.removeEventListener('keyup', handleEscapeClick);
    }

  },[]);

  //Закрытие о Оверлею
  useEffect(() => {
    function handleOverlayClick(evt) {
      if (evt.target.classList.contains('popup')) {
        closeAllPopups();
      }
    }
    document.addEventListener('mousedown', handleOverlayClick);

    return () => {
      document.removeEventListener('mousedown', handleOverlayClick);
    }

  },[]);
  
//Возвращаем разметку
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Routes>
          <Route path="/"
            element={ <ProtectedRoute
                component={Main}
                loggedIn={loggedIn}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClick={handleCardClick}
                onWatchCard={handleWatchCardPopup}
                cards={cards}
                onCardLike={handleCardLike}
                onCardDelete={confirmCardDelete}
                logout={handleLogout}
                userLoginData={userLoginData}
            />}
          />  
          <Route path="/signin" element={ <Login handleLogin={handleLogin}/> }/>
          <Route path="/signup" element={<Register handleRegister={handleRegister} />}/>
          <Route element={<Navigate to={!loggedIn ? "/signin" : "/"} />}/>
        </Routes>
       
        <Footer />

        <EditProfilePopup //Попап редактирования профиля
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          buttonText={isButtonDeleteText}
        />
        
        <EditAvatarPopup // Попап смены аватара
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          buttonText={isButtonDeleteText}
        />
        
      

        <AddPlacePopup // Попап добавления карточки
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlace}
          buttonText={isButtonDeleteText}
        /> 
    

         <PopupWithDeleteCards // Попап подтверждения удаления карточки
            isOpen={isOpenPopupDeleteCards}
            onClose={closeAllPopups}
            onSubmitDelete={handleCardDelete}
            card={cardRemove}
            buttonText={isButtonDeleteText}
          />

        <ImagePopup
          isOpen={isWatchCardPopup} 
          card={selectedCard} 
          onClose={closeAllPopups}

        />
        <InfoTooltip
          isOpen={isTooltipOpened}
          onClose={closeAllPopups}
          isRegSuccess={isAuth}
          regSuccess="Вы успешно зарегестрировались!"
          regFailed="Что-то пошло не так! Попробуйте еще раз."
        />

      </div> 
    </CurrentUserContext.Provider> 
  )
}


export default App;
