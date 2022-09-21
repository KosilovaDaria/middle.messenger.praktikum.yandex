import ProfileLayout from '../../layout/profile/profileLayout';
import Form from '../../components/form/Form';
import ProfileInput from '../../components/profileInput/ProfileInput';
import Input from '../../components/input/Input';
import Link from '../../components/link/Link';
import Avatar from '../../components/avatar/Avatar';
import Router from '../../utils/Router';

import * as styleForm from '../../components/form/style.module.css';
import * as styleInputProfile from '../../components/profileInput/style.module.css';
import * as styleInput from '../../components/input/style.module.css';
import * as styleLink from '../../components/link/style.module.css';
import * as styleAvatar from '../../components/avatar/style.module.css';
import * as styleButton from '../../components/button/style.module.css';

const router = new Router('.app');

const avatar = new Avatar({
  attr: {
    class: styleAvatar.avatar_profile,
  },
});
const profileForm = new Form({
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
      attr: {
        class: styleInput.input_profile,
        disabled: 'disabled',
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
      attr: {
        class: styleInput.input_profile,
        disabled: 'disabled',
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
      attr: {
        class: styleInput.input_profile,
        disabled: 'disabled',
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
      attr: {
        class: styleInput.input_profile,
        disabled: 'disabled',
      },
    }),
  }),
  inputDisplayName: new ProfileInput({
    attr: { class: styleInputProfile.block },
    label: 'Имя в чате',
    input: new Input({
      placeholder: 'Иван',
      name: 'displayname',
      type: 'text',
      attr: {
        class: styleInput.input_profile,
        disabled: 'disabled',
      },

    }),
  }),
  inputPhone: new ProfileInput({
    attr: { class: styleInputProfile.block },
    label: 'Телефон',
    input: new Input({
      placeholder: '+7 (909) 967 30 30',
      name: 'phone',
      type: 'phone',
      attr: {
        class: styleInput.input_profile,
        disabled: 'disabled',
      },
    }),
  }),
});

const ProfilePage = new ProfileLayout({
  link: new Link({
    label: '<',
    attr: { class: styleButton.button_round },
    events: {
      click: () => router.back(),
    },
  }),
  avatar,
  displayname: 'Иван',
  form: profileForm,
  changeData: new Link({
    label: 'Изменить данные',
    attr: { class: styleLink.link_controls },
    events: {
      click: () => router.go('/settings'),
    },
  }),
  changePass: new Link({
    label: 'Изменить пароль',
    attr: { class: styleLink.link_controls },
    events: {
      click: () => router.go('/pass'),
    },
  }),
  quit: new Link({
    label: 'Выйти',
    attr: { class: styleLink.link_controls },
    events: {
      click: () => router.go('/'),
    },
  }),
});

export default ProfilePage;
