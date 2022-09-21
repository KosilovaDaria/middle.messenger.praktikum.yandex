import Form from '../../components/form/Form';
import ProfileInput from '../../components/profileInput/ProfileInput';
import Input from '../../components/input/Input';
import Link from '../../components/link/Link';
import Button from '../../components/button/Button';
import ProfileLayout from '../../layout/profile/profileLayout';
import AvatarProfile from '../../components/avatarProfile/AvatarProfile';
import {
  isValid, showMessage, hideMessage, formValidation,
} from '../../utils/validator';
import Router from '../../utils/Router';

import * as styleForm from '../../components/form/style.module.css';
import * as styleInput from '../../components/input/style.module.css';
import * as styleInputProfile from '../../components/profileInput/style.module.css';
import * as styleButton from '../../components/button/style.module.css';

const router = new Router('.app');

const button = new Button({
  label: 'Сохранить',
  type: 'submit',
});

const settingsForm = new Form({
  name: 'formProfile',
  attr: {
    class: styleForm.profile_info,
  },
  inputEmail: new ProfileInput({
    attr: { class: styleInputProfile.block },
    label: 'Почта',
    input: new Input({
      placeholder: 'pochta@yandex.ru',
      name: 'email',
      type: 'email',
      events: {
        focus: (e: any) => (isValid(e.target.name, e.target.value) ? showMessage(e.target) : hideMessage(e.target)),
        blur: (e: any) => (!isValid(e.target.name, e.target.value) ? showMessage(e.target) : hideMessage(e.target)),
      },
      attr: {
        class: styleInput.input_profile,
      },
    }),
  }),
  inputLogin: new ProfileInput({
    attr: { class: styleInputProfile.block },
    label: 'Логин',
    input: new Input({
      placeholder: 'ivanivanov',
      name: 'login',
      type: 'text',
      events: {
        focus: (e: any) => (isValid(e.target.name, e.target.value) ? showMessage(e.target) : hideMessage(e.target)),
        blur: (e: any) => (!isValid(e.target.name, e.target.value) ? showMessage(e.target) : hideMessage(e.target)),
      },
      attr: {
        class: styleInput.input_profile,
      },
    }),
  }),
  inputFirstName: new ProfileInput({
    attr: { class: styleInputProfile.block },
    label: 'Имя',
    input: new Input({
      placeholder: 'Иван',
      name: 'first_name',
      type: 'text',
      events: {
        focus: (e: any) => (isValid(e.target.name, e.target.value) ? showMessage(e.target) : hideMessage(e.target)),
        blur: (e: any) => (!isValid(e.target.name, e.target.value) ? showMessage(e.target) : hideMessage(e.target)),
      },
      attr: {
        class: styleInput.input_profile,
      },
    }),
  }),
  inputSecondName: new ProfileInput({
    attr: { class: styleInputProfile.block },
    label: 'Фамилия',
    input: new Input({
      placeholder: 'Иванов',
      name: 'second_name',
      type: 'text',
      events: {
        focus: (e: any) => (isValid(e.target.name, e.target.value) ? showMessage(e.target) : hideMessage(e.target)),
        blur: (e: any) => (!isValid(e.target.name, e.target.value) ? showMessage(e.target) : hideMessage(e.target)),
      },
      attr: { class: styleInput.input_profile },
    }),
  }),
  inputDisplayName: new ProfileInput({
    attr: { class: styleInputProfile.block },
    label: 'Имя в чате',
    input: new Input({
      placeholder: 'Иван',
      name: 'displayname',
      type: 'text',
      events: {
        focus: (e: any) => (isValid(e.target.name, e.target.value) ? showMessage(e.target) : hideMessage(e.target)),
        blur: (e: any) => (!isValid(e.target.name, e.target.value) ? showMessage(e.target) : hideMessage(e.target)),
      },
      attr: { class: styleInput.input_profile },
    }),
  }),
  inputPhone: new ProfileInput({
    attr: { class: styleInputProfile.block },
    label: 'Телефон',
    input: new Input({
      placeholder: '+7 (909) 967 30 30',
      name: 'phone',
      type: 'phone',
      events: {
        focus: (e: any) => (isValid(e.target.name, e.target.value) ? showMessage(e.target) : hideMessage(e.target)),
        blur: (e: any) => (!isValid(e.target.name, e.target.value) ? showMessage(e.target) : hideMessage(e.target)),
      },
      attr: { class: styleInput.input_profile },
    }),
  }),
  button,
  events: {
    submit: (e: any) => {
      e.stopPropagation();
      e.preventDefault();
      console.log(formValidation(e.target));
      router.go('/profile')
    },
  },
});

const SettingsPage = new ProfileLayout({
  link: new Link({
    label: '<',
    attr: { class: styleButton.button_round },
    events: {
      click: () => router.back(),
    },
  }),
  avatar: new AvatarProfile({}),
  form: settingsForm,
});

export default SettingsPage;
