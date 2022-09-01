import Input from "../../components/input/Input";
import Link from "../../components/link/Link";
import ProfileLayout from "../../layout/profile/profileLayout";
import Avatar from "../../components/avatar";
import ProfileForm from "../../components/profile/ProfileForm";
import ProfileInput from "../../components/profileInput/ProfileInput";

import * as styleInput from '../../components/input/style.module.css';
import * as styleInputProfile from '../../components/profileInput/style.module.css';
import * as styleLink from '../../components/link/style.module.css';
import * as styleAvatar from '../../components/avatar/style.module.css';
import * as styleProfile from '../../components/profile/style.module.css';
import * as styleLayout from '../../layout/profile/style.module.css';
import * as styleButton from '../../components/button/style.module.css';

const avatar = new Avatar('div', {
  attr: {
    class: styleAvatar.avatar_profile,
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
        focus: (e) => console.log(e + 'focus валидация'),
        blur: (e) => console.log(e + 'blur валидация'),
      },
      attr: {
        disabled: 'disabled',
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
        focus: (e) => console.log(e + 'focus валидация'),
        blur: (e) => console.log(e + 'blur валидация'),
      },
      attr: {
        disabled: 'disabled',
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
        focus: (e) => console.log(e + 'focus валидация'),
        blur: (e) => console.log(e + 'blur валидация'),
      },
      attr: {
        disabled: 'disabled',
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
        focus: (e) => console.log(e + 'focus валидация'),
        blur: (e) => console.log(e + 'blur валидация'),
      },
      attr: {
        disabled: 'disabled',
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
        focus: (e) => console.log(e + 'focus валидация'),
        blur: (e) => console.log(e + 'blur валидация'),
      },
      attr: {
        disabled: 'disabled',
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
        focus: (e) => console.log(e + 'focus валидация'),
        blur: (e) => console.log(e + 'blur валидация'),
      },
      attr: {
        disabled: 'disabled',
        placeholder: '+7 (909) 967 30 30',
        name: 'phone',
        class: styleInput.input_profile,
        type: 'phone',
      }
    })
  }),
});

const ProfilePage = new ProfileLayout('div', {
  attr: {
    class: styleLayout.wrapper
  },
  link: new Link('a', {
    label: '<',
    attr:{
      href:'/chat',
      class: styleButton.button_round
    }
  }),
  avatar: avatar,
  displayname: 'Иван',
  profileForm: profileForm,
  changeData: new Link('a', {
    label: 'Изменить данные',
    attr: {
      class: styleLink.link_controls,
      href:'/settings'
    }
  }),
  changePass: new Link('a', {
    label: 'Изменить пароль',
    attr: {
      class: styleLink.link_controls,
      href:'/pass'
    }
  }),
  quit: new Link('a', {
    label: 'Выйти',
    attr: {
      class: styleLink.link_controls,
      href:'/login'
    }
  }),
});

export default ProfilePage;
