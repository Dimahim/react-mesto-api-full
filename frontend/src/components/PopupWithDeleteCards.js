import PopupWithForm from "./PopupWithForm";



function PopupWithDeleteCards({ isOpen, onClose, onSubmitDelete, card, buttonText }) {
  

  function handleSubmitCardsDelete(event) {
    event.preventDefault();
    onSubmitDelete(card)
  }

  return (
    <PopupWithForm 
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmitCardsDelete}
      title="Вы уверены?"
      buttonName="Да"
      name="delete-cards"
      buttonText={buttonText}
    />
  )

}

export default PopupWithDeleteCards;