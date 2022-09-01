import Button from "../../components/button/Button";
import Input from "../../components/input/Input";
import ProfileLayout from "../../layout/profile/profileLayout";
import AvatarProfile from "../../components/avatarProfile/AvatarProfile";
import ProfileForm from "../../components/profile/ProfileForm";
import ProfileInput from "../../components/profileInput/ProfileInput";
import Link from "../../components/link/Link";

import * as styleInput from '../../components/input/style.module.css';
import * as styleInputProfile from '../../components/profileInput/style.module.css';
import * as styleButton from '../../components/button/style.module.css';
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
      console.log('Новые данные о пользователе сохранены');
      e.preventDefault();
      e.stopPropagation();
    }
  }
});

const profileForm = new ProfileForm('form', {
  attr: {
    class: styleProfile.profile_info
  },
  inputEmail: new ProfileInput('div', {
    attr: {
      class: styleInputProfile.block
    },
    label: 'Почта',
    input: new Input('input', {
      events: {
        focus: (e) => console.log('focus валидация'),
        blur: (e) => console.log('blur валидация'),
      },
      attr: {
        placeholder: 'pochta@yandex.ru',
        name: 'email',
        class: styleInput.input_profile,
        type: 'email',
      }
    })
  }),
  inputLogin: new ProfileInput('div', {
    attr: {
      class: styleInputProfile.block
    },
    label: 'Логин',
    input: new Input('input', {
      events: {
        focus: (e) => console.log('focus валидация'),
        blur: (e) => console.log('blur валидация'),
      },
      attr: {
        placeholder: 'ivanivanov',
        name: 'login',
        class: styleInput.input_profile,
        type: 'text',
      }
    })
  }),
  inputFirstName: new ProfileInput('div', {
    attr: {
      class: styleInputProfile.block
    },
    label: 'Имя',
    input: new Input('input', {
      events: {
        focus: (e) => console.log('focus валидация'),
        blur: (e) => console.log('blur валидация'),
      },
      attr: {
        placeholder: 'Иван',
        name: 'firstname',
        class: styleInput.input_profile,
        type: 'text',
      }
    })
  }),
  inputSecondName: new ProfileInput('div', {
    attr: {
      class: styleInputProfile.block
    },
    label: 'Фамилия',
    input: new Input('input', {
      events: {
        focus: (e) => console.log('focus валидация'),
        blur: (e) => console.log('blur валидация'),
      },
      attr: {
        placeholder: 'Иванов',
        name: 'secondname',
        class: styleInput.input_profile,
        type: 'text',
      }
    })
  }),
  inputDisplayName: new ProfileInput('div', {
    attr: {
      class: styleInputProfile.block
    },
    label: 'Имя в чате',
    input: new Input('input', {
      events: {
        focus: (e) => console.log('focus валидация'),
        blur: (e) => console.log('blur валидация'),
      },
      attr: {
        placeholder: 'Иван',
        name: 'displayname',
        class: styleInput.input_profile,
        type: 'text',
      }
    })
  }),
  inputPhone: new ProfileInput('div', {
    attr: {
      class: styleInputProfile.block
    },
    label: 'Телефон',
    input: new Input('input', {
      events: {
        focus: (e) => console.log('focus валидация'),
        blur: (e) => console.log('blur валидация'),
      },
      attr: {
        placeholder: '+7 (909) 967 30 30',
        name: 'phone',
        class: styleInput.input_profile,
        type: 'phone',
      }
    })
  }),
  button: button,

});

const SettingsPage = new ProfileLayout('div', {
  attr: {
    class: styleLayout.wrapper
  },
  avatar: new AvatarProfile({}),
  profileForm: profileForm,
  link: new Link('a', {
    label: '<',
    attr: {
      href: '/chat',
      class: styleButton.button_round
    }
  })
});

export default SettingsPage;