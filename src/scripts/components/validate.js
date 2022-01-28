const showInputError = (inputElement, inputErrorClass, errorElement, errorMessage) => {
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
}
const hideInputError = (inputElement, inputErrorClass, errorElement) => {
  inputElement.classList.remove(inputErrorClass);
  errorElement.textContent = '';

}
const checkInputValidity = (formSelector, inputElement, inputErrorClass) => {
  const errorElement = formSelector.querySelector(`#error-${inputElement.id}`);

  if (inputElement.validity.valid) {
    hideInputError(inputElement, inputErrorClass, errorElement);
  } else {
    showInputError(inputElement, inputErrorClass, errorElement, inputElement.validationMessage);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some(inputElement => {
    return !inputElement.validity.valid;
  })
}

const disableButton = (buttonElement, inactiveButtonClass) => {
  buttonElement.classList.add(inactiveButtonClass);
  buttonElement.disabled = true;
}

const enableButton = (buttonElement, inactiveButtonClass) => {
  buttonElement.classList.remove(inactiveButtonClass);
  buttonElement.disabled = false;
}

const toggleButtonState = (formElement, inputList, submitButtonSelector, inactiveButtonClass) => {
  const buttonElement = formElement.querySelector(submitButtonSelector);
  if (hasInvalidInput(inputList)) {
    disableButton(buttonElement, inactiveButtonClass);
  } else {
    enableButton(buttonElement, inactiveButtonClass);
  }
};


const setEventListeners = (formElement, {
  inputSelector,
  inputErrorClass,
  errorClass,
  submitButtonSelector,
  inactiveButtonClass
}) => {

  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  inputList.forEach(inputElement => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, inputErrorClass, errorClass);
      toggleButtonState(formElement, inputList, submitButtonSelector, inactiveButtonClass)
    })
  });
  toggleButtonState(formElement, inputList, submitButtonSelector, inactiveButtonClass)
}
const enableValidation = ({
  formSelector,
  ...rest
}) => {
  Array.from(document.querySelectorAll(formSelector)).forEach(formElement => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });

    setEventListeners(formElement, rest);
  });


};

export {
  enableValidation
}
