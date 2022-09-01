import Button from "../../components/button/Button";
import Input from "../../components/input/Input";
import ProfileLayout from "../../layout/profile/profileLayout";
import Avatar from "../../components/avatar";
import ProfileForm from "../../components/profile/ProfileForm";
import ProfileInput from "../../components/profileInput/ProfileInput";
import Link from "../../components/link/Link";

import * as styleInput from '../../components/input/style.module.css';
import * as styleInputProfile from '../../components/profileInput/style.module.css';
import * as styleButton from '../../components/button/style.module.css';
import * as styleAvatar from '../../components/avatar/style.module.css';
import * as styleProfile from '../../components/profile/style.module.css';
import * as styleLayout from '../../layout/profile/style.module.css';

const button = new Button({
  label: 'Сохранить',
  attr: {
    class: styleButton.button,
    type: 'submit',
  },
  events: {
    click: (e) => {
      console.log('Данные о новом пароле сохранены');
      e.preventDefault();
      e.stopPropagation();
    }
  }
});

const avatar = new Avatar('div', {
  attr: {
    class: styleAvatar.avatar_profile,
  }
});

const profileForm = new ProfileForm('form', {
  attr: {
    class: styleProfile.profile_info
  },
  inputOldPass: new ProfileInput('div', {
    attr: {
      class: styleInputProfile.block_extra
    },
    label: 'Старый пароль',
    input: new Input('input', {
      events: {
        focus: (e) => console.log('focus валидация'),
        blur: (e) => console.log('blur валидация'),
      },
      attr: {
        placeholder: '*****',
        name: 'password',
        class: styleInput.input_profile,
        type: 'password',
      }
    })
  }),
  inputNewPass: new ProfileInput('div', {
    attr: {
      class: styleInputProfile.block_extra
    },
    label: 'Новый пароль',
    input: new Input('input', {
      events: {
        focus: (e) => console.log('focus валидация'),
        blur: (e) => console.log('blur валидация'),
      },
      attr: {
        placeholder: '*******',
        name: 'password',
        class: styleInput.input_profile,
        type: 'password',
      }
    })
  }),
  inputNewPassRpt: new ProfileInput('div', {
    attr: {
      class: styleInputProfile.block_extra
    },
    label: 'Повторите новый пароль',
    input: new Input('input', {
      events: {
        focus: (e) => console.log('focus валидация'),
        blur: (e) => console.log('blur валидация'),
      },
      attr: {
        placeholder: '*******',
        name: 'password',
        class: styleInput.input_profile,
        type: 'password',
      }
    })
  }),
  button: button,
});

const PassPage = new ProfileLayout('div', {
  attr: {
    class: styleLayout.wrapper
  },
  avatar: avatar,
  profileForm: profileForm,
  link: new Link('a', {
    label: '<',
    attr: {
      href: '/chat',
      class: styleButton.button_round
    }
  })
});

export default PassPage;