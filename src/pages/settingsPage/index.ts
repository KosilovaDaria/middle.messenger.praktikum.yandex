import Form from '../../components/form/Form';
import ProfileInput from '../../components/profileInput/ProfileInput';
import Input from '../../components/input/Input';
import Link from '../../components/link/Link';
import Button from '../../components/button/Button';
import ProfileLayout from '../../layout/profile/profileLayout';
import AvatarProfile from '../../components/avatarProfile/AvatarProfile';
import {
  isValid, showMessage, hideMessage, formValidation,
} from '../../utils/validation';

import * as styleForm from '../../components/form/style.module.css';
import * as styleInput from '../../components/input/style.module.css';
import * as styleInputProfile from '../../components/profileInput/style.module.css';
import * as styleButton from '../../components/button/style.module.css';
import * as styleLayout from '../../layout/profile/style.module.css';

const button = new Button({
  label: 'Сохранить',
  attr: {
    class: styleButton.button,
    type: 'submit',
  },
});

const settingsForm = new Form('form', {
  attr: {
    class: styleForm.profile_info,
  },
  inputEmail: new ProfileInput('div', {
    attr: {
      class: styleInputProfile.block,
    },
    label: 'Почта',
    input: new Input('input', {
      events: {
        focus: (e: any) => (isValid(e.target.name, e.target.value) ? showMessage(e.target) : hideMessage(e.target)),
        blur: (e: any) => (!isValid(e.target.name, e.target.value) ? showMessage(e.target) : hideMessage(e.target)),
      },
      attr: {
        placeholder: 'pochta@yandex.ru',
        name: 'email',
        class: styleInput.input_profile,
        type: 'email',
      },
    }),
  }),
  inputLogin: new ProfileInput('div', {
    attr: {
      class: styleInputProfile.block,
    },
    label: 'Логин',
    input: new Input('input', {
      events: {
        focus: (e: any) => (isValid(e.target.name, e.target.value) ? showMessage(e.target) : hideMessage(e.target)),
        blur: (e: any) => (!isValid(e.target.name, e.target.value) ? showMessage(e.target) : hideMessage(e.target)),
      },
      attr: {
        placeholder: 'ivanivanov',
        name: 'login',
        class: styleInput.input_profile,
        type: 'text',
      },
    }),
  }),
  inputFirstName: new ProfileInput('div', {
    attr: {
      class: styleInputProfile.block,
    },
    label: 'Имя',
    input: new Input('input', {
      events: {
        focus: (e: any) => (isValid(e.target.name, e.target.value) ? showMessage(e.target) : hideMessage(e.target)),
        blur: (e: any) => (!isValid(e.target.name, e.target.value) ? showMessage(e.target) : hideMessage(e.target)),
      },
      attr: {
        placeholder: 'Иван',
        name: 'first_name',
        class: styleInput.input_profile,
        type: 'text',
      },
    }),
  }),
  inputSecondName: new ProfileInput('div', {
    attr: {
      class: styleInputProfile.block,
    },
    label: 'Фамилия',
    input: new Input('input', {
      events: {
        focus: (e: any) => (isValid(e.target.name, e.target.value) ? showMessage(e.target) : hideMessage(e.target)),
        blur: (e: any) => (!isValid(e.target.name, e.target.value) ? showMessage(e.target) : hideMessage(e.target)),
      },
      attr: {
        placeholder: 'Иванов',
        name: 'second_name',
        class: styleInput.input_profile,
        type: 'text',
      },
    }),
  }),
  inputDisplayName: new ProfileInput('div', {
    attr: {
      class: styleInputProfile.block,
    },
    label: 'Имя в чате',
    input: new Input('input', {
      attr: {
        placeholder: 'Иван',
        name: 'displayname',
        class: styleInput.input_profile,
        type: 'text',
      },
    }),
  }),
  inputPhone: new ProfileInput('div', {
    attr: {
      class: styleInputProfile.block,
    },
    label: 'Телефон',
    input: new Input('input', {
      events: {
        focus: (e: any) => (isValid(e.target.name, e.target.value) ? showMessage(e.target) : hideMessage(e.target)),
        blur: (e: any) => (!isValid(e.target.name, e.target.value) ? showMessage(e.target) : hideMessage(e.target)),
      },
      attr: {
        placeholder: '+7 (909) 967 30 30',
        name: 'phone',
        class: styleInput.input_profile,
        type: 'phone',
      },
    }),
  }),
  button,
  events: {
    submit: (e: any) => {
      e.stopPropagation();
      e.preventDefault();
      console.log(formValidation(e.target))
    },
  },
});

const SettingsPage = new ProfileLayout('div', {
  attr: {
    class: styleLayout.wrapper,
  },
  avatar: new AvatarProfile('div'),
  form: settingsForm,
  link: new Link('a', {
    label: '<',
    attr: {
      href: '/chat',
      class: styleButton.button_round,
    },
  }),
});

export default SettingsPage;
