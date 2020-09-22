export default class FormValidator { 

  constructor(selectorObject, formsElement) {    
    this._inputSelector = selectorObject.inputSelector;
    this._submitButtonSelector = selectorObject.submitButtonSelector;
    this._inactiveButtonClass = selectorObject.inactiveButtonClass;
    this._inputErrorClass = selectorObject.inputErrorClass;
    this._errorClass = selectorObject.errorClass;  
    this._formsElement = formsElement;
  }

  _showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  }

  _hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  }

  _isValid = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
      this._showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(formElement, inputElement);
    }
  }
 
  _hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  }

  _toggleButtonState = (inputList, buttonElement) => {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(this._inactiveButtonClass);
      buttonElement.disabled = true;
    } else {
      buttonElement.classList.remove(this._inactiveButtonClass);
      buttonElement.disabled = false;
    }
  }

  _validateListeners = () => {
    const inputList = Array.from(this._formsElement.querySelectorAll(this._inputSelector));
    const buttonElement = this._formsElement.querySelector(this._submitButtonSelector);
    this._toggleButtonState(inputList, buttonElement); 
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._isValid(this._formsElement, inputElement);
        this._toggleButtonState(inputList, buttonElement);
      });
    });
  }

  enableValidation() {
    this._formsElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    })
    this._validateListeners();
  }
}

