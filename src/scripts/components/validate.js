const formConfig = {
  //уазываем селектор формы
  formSelector: 'poup__form'
}

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector))
  formList.forEach(formElement => {
    formElement.addEventListener('submit', (evt)=> {
      evt.preventDefault();
    })
  })
}
