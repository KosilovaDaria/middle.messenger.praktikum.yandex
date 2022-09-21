import Form from '../../components/form/Form';
import ProfileInput from '../../components/profileInput/ProfileInput';
import Input from '../../components/input/Input';
import Link from '../../components/link/Link';
import Avatar from '../../components/avatar/Avatar';
import Button from '../../components/button/Button';
import ProfileLayout from '../../layout/profile/profileLayout';
import {
  isValid, showMessage, hideMessage, formValidation,
} from '../../utils/validator';
import Router from '../../utils/Router';

import * as styleForm from '../../components/form/style.module.css';
import * as styleInputProfile from '../../components/profileInput/style.module.css';
import * as styleInput from '../../components/input/style.module.css';
import * as styleAvatar from '../../components/avatar/style.module.css';
import * as styleButton from '../../components/button/style.module.css';

const router = new Router('.app');

const button = new Button({
  label: 'Сохранить',
  type: 'submit',
});

const avatar = new Avatar({
  attr: {
    class: styleAvatar.avatar_profile,
  },
});

const passForm = new Form({
  name: 'formPass',
  attr: {
    class: styleForm.profile_info,
  },
  inputOldPass: new ProfileInput({
    attr: { class: styleInputProfile.block_extra },
    label: 'Старый пароль',
    input: new Input({
      placeholder: '*****',
      name: 'password',
      type: 'password',
      attr: { class: styleInput.input_profile },
    }),
  }),
  inputPass: new ProfileInput({
    attr: { class: styleInputProfile.block_extra },
    label: 'Новый пароль',
    input: new Input({
      placeholder: '*******',
      name: 'password',
      type: 'password',
      events: {
        focus: (e: any) => (isValid(e.target.name, e.target.value) ? showMessage(e.target) : hideMessage(e.target)),
        blur: (e: any) => (!isValid(e.target.name, e.target.value) ? showMessage(e.target) : hideMessage(e.target)),
      },
      attr: { class: styleInput.input_profile },
    }),
  }),
  inputPassRpt: new ProfileInput({
    attr: { class: styleInputProfile.block_extra },
    label: 'Повторите новый пароль',
    input: new Input({
      placeholder: '*******',
      name: 'passwordrpt',
      type: 'password',
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

const PassPage = new ProfileLayout({
  link: new Link({
    label: '<',
    attr: { class: styleButton.button_round },
    events: {
      click: () => router.back(),
    },
  }),
  avatar,
  form: passForm,
});

export default PassPage;
