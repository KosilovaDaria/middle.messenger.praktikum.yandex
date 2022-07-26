const regExpLogin = /^[\w-]{3,20}$/i;
const regExpEmail = /^[-_.\w]+@([\w-]+\.)+[\w-]+$/;
const regExpPhone = /^([+]?[0-9\s-\(\)]{10,15})*$/;
const regExpName = /^[A-яА-ЯёЁa-zA-Z0-]+$/i;
const regExpPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s{8,40}).*$/;

type FormData = {
  [key: string]: string;
}

const showMessage = (elem: HTMLFormElement) => {
  const validMessage: HTMLElement | null = document.querySelector(`p[data-name = ${elem.name}]`);
  validMessage!.style.display = 'block';
}
const hideMessage = (elem: HTMLFormElement) => {
  const validMessage: HTMLElement | null = document.querySelector(`p[data-name = ${elem.name}]`);
  validMessage!.style.display = 'none';
}
const isValid = (inputName: string, inputValue: string) => {
  if (inputName == 'email') return regExpEmail.test(inputValue);
  if (inputName == 'login') return regExpLogin.test(inputValue);
  if (inputName == 'first_name') return regExpName.test(inputValue);
  if (inputName == 'second_name') return regExpName.test(inputValue);
  if (inputName == 'phone') return regExpPhone.test(inputValue);
  if (inputName == 'password') return regExpPassword.test(inputValue);
  if (inputName == 'passwordrpt') return regExpPassword.test(inputValue);
  return true;
}

const formValidation = (form: HTMLFormElement): FormData | string => {
  const formData: FormData = {};
  let error = false;
  Array.from(form.elements).forEach((elem: any) => {
    if (elem.tagName === 'INPUT') {
      !isValid(elem.name, elem.value) ? (showMessage(elem), error = true) : formData[elem.name] = elem.value;
    }
  })
  return error ? 'Не все поля формы заполнены корректно' : formData
}

export {
  isValid, showMessage, hideMessage, formValidation,
}
