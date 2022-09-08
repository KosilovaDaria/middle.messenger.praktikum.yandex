import Form from "../../components/form/Form";
import ProfileInput from "../../components/profileInput/ProfileInput";
import Input from "../../components/input/Input";
import Link from "../../components/link/Link";
import Avatar from "../../components/avatar";
import Button from "../../components/button/Button";
import ProfileLayout from "../../layout/profile/profileLayout";
import { isValid, showMessage, hideMessage, formValidation } from '../../utils/Validation';

import * as styleForm from '../../components/form/style.module.css';
import * as styleInputProfile from '../../components/profileInput/style.module.css';
import * as styleInput from '../../components/input/style.module.css';
import * as styleAvatar from '../../components/avatar/style.module.css';
import * as styleButton from '../../components/button/style.module.css';
import * as styleLayout from '../../layout/profile/style.module.css';

const button = new Button({
  label: 'Сохранить',
  attr: {
    class: styleButton.button,
    type: 'submit',
  },
});

const avatar = new Avatar('div', {
  attr: {
    class: styleAvatar.avatar_profile,
  }
});

const passForm = new Form('form', {
  attr: {
    class: styleForm.profile_info
  },
  inputOldPass: new ProfileInput('div', {
    attr: {
      class: styleInputProfile.block_extra
    },
    label: 'Старый пароль',
    input: new Input('input', {
      attr: {
        placeholder: '*****',
        name: 'password',
        class: styleInput.input_profile,
        type: 'password',
      }
    })
  }),
  inputPass: new ProfileInput('div', {
    attr: {
      class: styleInputProfile.block_extra
    },
    label: 'Новый пароль',
    input: new Input('input', {
      events: {
        focus: (e) => isValid(e.target.name, e.target.value) ? showMessage(e.target) : hideMessage(e.target),
        blur: (e) => !isValid(e.target.name, e.target.value) ? showMessage(e.target) : hideMessage(e.target),
      },
      attr: {
        placeholder: '*******',
        name: 'password',
        class: styleInput.input_profile,
        type: 'password',
      }
    })
  }),
  inputPassRpt: new ProfileInput('div', {
    attr: {
      class: styleInputProfile.block_extra
    },
    label: 'Повторите новый пароль',
    input: new Input('input', {
      events: {
        focus: (e) => isValid(e.target.name, e.target.value) ? showMessage(e.target) : hideMessage(e.target),
        blur: (e) => !isValid(e.target.name, e.target.value) ? showMessage(e.target) : hideMessage(e.target),
      },
      attr: {
        placeholder: '*******',
        name: 'passwordrpt',
        class: styleInput.input_profile,
        type: 'password',
      }
    })
  }),
  button: button,
  events: {
    submit: (e) => {
      e.stopPropagation();
      e.preventDefault();
      console.log(formValidation(e.target))
    }
  }
});

const PassPage = new ProfileLayout('div', {
  attr: {
    class: styleLayout.wrapper
  },
  avatar: avatar,
  form: passForm,
  link: new Link('a', {
    label: '<',
    attr: {
      href: '/chat',
      class: styleButton.button_round
    }
  })
});

export default PassPage;