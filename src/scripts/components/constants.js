export const profile = document.querySelector('.profile');
export const profileName = profile.querySelector('.profile__name');
export const profileDescription = profile.querySelector('.profile__description');
export const profileButtonEdit = profile.querySelector('.profile__button-edit');
export const profileButtonPlus = profile.querySelector('.profile__button-plus');
export const profileButtonPhotoEdit = profile.querySelector('.profile__avatar');
export const profilePhotoEditPopup = document.querySelector('.popup-edit-avatar')
export const newPhoto = profilePhotoEditPopup.querySelector('.popup-avatar')
export const profileEditPopup = document.querySelector('.popup_edit');
export const newNameInput = profileEditPopup.querySelector('.popup__input_name');
export const newDescription = profileEditPopup.querySelector('.popup__input_description');
export const cardAddPopup = document.querySelector('.popup_add-photo')
export const cardDescription = cardAddPopup.querySelector('.popup__input_card-name');
export const cardLink = cardAddPopup.querySelector('.popup__input_card-link');
export const popupCloseButtons = document.querySelectorAll('.popup__button-close');
export const addCardSubmitButton = document.querySelector('.popup__add-button');
export const elementsList = document.querySelector('.elements__list');
export const cardAddPopupForm = cardAddPopup.querySelector('.popup__form');
export const profileEditPopupForm = profileEditPopup.querySelector('.popup__form');
export const profileEditPopupButton = profileEditPopup.querySelector('.popup__button');
export const profilePhotoEditPopupForm = profilePhotoEditPopup.querySelector('.popup__form');
export const profilePhotoEditPopupButton = profilePhotoEditPopup.querySelector('.popup__button');
export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_active',
}
