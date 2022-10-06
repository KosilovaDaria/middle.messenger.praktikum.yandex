import Block from '../../utils/Block';
import tpl from '../../layout/profile/tpl.hbs';
import * as styles from '../../layout/profile/style.module.css';
import * as styleForm from '../../components/form/style.module.css';
import * as styleInputProfile from '../../components/profileInput/style.module.css';
import * as styleInput from '../../components/input/style.module.css';
import * as styleLink from '../../components/link/style.module.css';
import * as styleButton from '../../components/button/style.module.css';
import * as styleAvatar from '../../components/avatar/style.module.css';
import Form from '../../components/form/Form';
import ProfileInput from '../../components/profileInput/ProfileInput';
import Input from '../../components/input/Input';
import Link from '../../components/link/Link';
import Router from '../../utils/Router';
import Modal from '../../components/modal/Modal';
import Button from '../../components/button/Button';
import Avatar from '../../components/avatar/Avatar';
import AuthController from '../../controllers/AuthController';
import UserController from '../../controllers/UserController';
import store, { StoreEvents } from '../../utils/Store';

const router = new Router('.app');
const fieldsOrder = ['email', 'login', 'first_name', 'second_name', 'display_name', 'phone'];

class ProfilePage extends Block {
  constructor() {
    super({})
  }
  componentDidUpdate(_oldProps: any, newProps: any): boolean {
    const avatarPath = `https://ya-praktikum.tech/api/v2/resources${newProps.avatar}`;
    const avatar = document.getElementById('avatarImage');
    avatar?.setAttribute('src', avatarPath);

    fieldsOrder.forEach((field) => {
      Object.keys((this.children.form as Block).children).forEach(key => {
        if ((this.children.form as Block).children[key].children.input.props.name == field) {
          (this.children.form as Block).children[key].children.input.setProps({ placeholder: newProps[field] })
        }
      })
    })
    return true;
  }
  init() {
    AuthController.fetchUser();
    store.on(StoreEvents.Updated, () => {
      this.setProps(store.getState().user || {})
    })
    this.children.link = new Link({
      label: '<',
      attr: { class: styleButton.button_round },
      events: {
        click: () => router.back(),
      },
    });
    this.children.modalBlock = new Modal({
      title: 'Загрузите файл',
      modalId: 'modal_profile',
      events: {
        submit: (e) => {
          e.preventDefault
          const avatar = document.getElementById('avatar') as any;
          const formData = new FormData();
          formData.append('avatar', avatar?.files[0]);
          UserController.editavatar(formData)
        },
      },
      input: new ProfileInput({
        label: ' Выбрать файл на компьютере',
        id: 'avatar',
        linkClass: styleLink.link_block,
        input: new Input({
          placeholder: 'загрузить',
          type: 'file',
          name: 'avatar',
          attr: {
            id: 'avatar',
            accept: 'image/*',
            class: styleInput.input_hide,
          },
        }),
      }),
      close: new Button({
        attr: { class: styleButton.button_square },
        label: 'x',
        events: {
          click: () => {
            (this.children.modalBlock as Block).setProps({ isOpen: false })
          },
        },
      }),
      button: new Button({
        label: 'Поменять',
        type: 'submit',
        events: {
          click: () => {
            (this.children.modalBlock as Block).setProps({ isOpen: false })
          },
        },
      }),
    })
    this.children.avatar = new Avatar({
      attr: { class: styleAvatar.avatar_profile },
      events: {
        click: async () => (this.children.modalBlock as Block).setProps({ isOpen: true }),
      },
    });
    this.children.form = new Form({
      name: 'formProfile',
      attr: {
        class: styleForm.profile_info,
      },
      inputEmail: new ProfileInput({
        attr: { class: styleInputProfile.block },
        label: 'Почта',
        input: new Input({
          placeholder: '',
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
          placeholder: '',
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
          placeholder: '',
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
          placeholder: '',
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
          placeholder: '',
          name: 'display_name',
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
          placeholder: '',
          name: 'phone',
          type: 'phone',
          attr: {
            class: styleInput.input_profile,
            disabled: 'disabled',
          },
        }),
      }),
    });
    this.children.changeData = new Link({
      label: 'Изменить данные',
      attr: { class: styleLink.link_controls },
      events: {
        click: () => router.go('/settings'),
      },
    });

    this.children.changePass = new Link({
      label: 'Изменить пароль',
      attr: { class: styleLink.link_controls },
      events: {
        click: () => router.go('/pass'),
      },
    });

    this.children.quit = new Link({
      label: 'Выйти',
      attr: { class: styleLink.link_controls },
      events: {
        click: () => AuthController.logout(),
      },
    });
  }
  render() {
    return this.compile(tpl, { styles })
  }
}
export default ProfilePage;

// interface ProfileProps extends User {}

// const fieldsOrder = ['email', 'login', 'first_name', 'second_name', 'display_name', 'phone'] as Array<keyof ProfileProps>;

// class ProfilePageBase extends Block<ProfileProps> {
//   constructor() {
//     super({})
//   }
//   componentDidUpdate(_oldProps: ProfileProps, newProps: ProfileProps): boolean {
//     const avatarPath = `https://ya-praktikum.tech/api/v2/resources${newProps.avatar}`;
//     const avatar = document.getElementById('avatarImage');
//     avatar?.setAttribute('src', avatarPath);

//     fieldsOrder.forEach((field) => {
//       Object.keys((this.children.form as Block).children).forEach(key => {
//         if ((this.children.form as Block).children[key].children.input.props.name == field) {
//           (this.children.form as Block).children[key].children.input.setProps({ placeholder: newProps[field] })
//         }
//       })
//     })
//     return true;
//   }
//   init() {
//     AuthController.fetchUser();
//     store.on(StoreEvents.Updated, () => {
//       this.setProps(store.getState().user || {})
//     })
//     this.children.link = new Link({
//       label: '<',
//       attr: { class: styleButton.button_round },
//       events: {
//         click: () => router.back(),
//       },
//     });
//     this.children.modalBlock = new Modal({
//       title: 'Загрузите файл',
//       modalId: 'modal_profile',
//       events: {
//         submit: (e) => {
//           e.preventDefault
//           const avatar = document.getElementById('avatar') as any;
//           const formData = new FormData();
//           formData.append('avatar', avatar?.files[0]);
//           UserController.editavatar(formData)
//         },
//       },
//       input: new ProfileInput({
//         label: ' Выбрать файл на компьютере',
//         id: 'avatar',
//         linkClass: styleLink.link_block,
//         input: new Input({
//           placeholder: 'загрузить',
//           type: 'file',
//           name: 'avatar',
//           attr: {
//             id: 'avatar',
//             accept: 'image/*',
//             class: styleInput.input_hide,
//           },
//         }),
//       }),
//       close: new Button({
//         attr: { class: styleButton.button_square },
//         label: 'x',
//         events: {
//           click: () => {
//             (this.children.modalBlock as Block).setProps({ isOpen: false })
//           },
//         },
//       }),
//       button: new Button({
//         label: 'Поменять',
//         type: 'submit',
//         events: {
//           click: () => {
//             (this.children.modalBlock as Block).setProps({ isOpen: false })
//           },
//         },
//       }),
//     })
//     this.children.avatar = new Avatar({
//       attr: { class: styleAvatar.avatar_profile },
//       events: {
//         click: async () => (this.children.modalBlock as Block).setProps({ isOpen: true }),
//       },
//     });
//     this.children.form = new Form({
//       name: 'formProfile',
//       attr: {
//         class: styleForm.profile_info,
//       },
//       inputEmail: new ProfileInput({
//         attr: { class: styleInputProfile.block },
//         label: 'Почта',
//         input: new Input({
//           placeholder: '',
//           name: 'email',
//           type: 'email',
//           attr: {
//             class: styleInput.input_profile,
//             disabled: 'disabled',
//           },
//         }),
//       }),
//       inputLogin: new ProfileInput({
//         attr: { class: styleInputProfile.block },
//         label: 'Логин',
//         input: new Input({
//           placeholder: '',
//           name: 'login',
//           type: 'text',
//           attr: {
//             class: styleInput.input_profile,
//             disabled: 'disabled',
//           },
//         }),
//       }),
//       inputFirstName: new ProfileInput({
//         attr: { class: styleInputProfile.block },
//         label: 'Имя',
//         input: new Input({
//           placeholder: '',
//           name: 'first_name',
//           type: 'text',
//           attr: {
//             class: styleInput.input_profile,
//             disabled: 'disabled',
//           },
//         }),
//       }),
//       inputSecondName: new ProfileInput({
//         attr: { class: styleInputProfile.block },
//         label: 'Фамилия',
//         input: new Input({
//           placeholder: '',
//           name: 'second_name',
//           type: 'text',
//           attr: {
//             class: styleInput.input_profile,
//             disabled: 'disabled',
//           },
//         }),
//       }),
//       inputDisplayName: new ProfileInput({
//         attr: { class: styleInputProfile.block },
//         label: 'Имя в чате',
//         input: new Input({
//           placeholder: '',
//           name: 'display_name',
//           type: 'text',
//           attr: {
//             class: styleInput.input_profile,
//             disabled: 'disabled',
//           },
//         }),
//       }),
//       inputPhone: new ProfileInput({
//         attr: { class: styleInputProfile.block },
//         label: 'Телефон',
//         input: new Input({
//           placeholder: '',
//           name: 'phone',
//           type: 'phone',
//           attr: {
//             class: styleInput.input_profile,
//             disabled: 'disabled',
//           },
//         }),
//       }),
//     });
//     this.children.changeData = new Link({
//       label: 'Изменить данные',
//       attr: { class: styleLink.link_controls },
//       events: {
//         click: () => router.go('/settings'),
//       },
//     });

//     this.children.changePass = new Link({
//       label: 'Изменить пароль',
//       attr: { class: styleLink.link_controls },
//       events: {
//         click: () => router.go('/pass'),
//       },
//     });

//     this.children.quit = new Link({
//       label: 'Выйти',
//       attr: { class: styleLink.link_controls },
//       events: {
//         click: () => AuthController.logout(),
//       },
//     });
//   }
//   render() {
//     return this.compile(tpl, { styles })
//   }
// }
// const ProfilePage = withStore((state) => ({ ...state.user }))(ProfilePageBase);
// export default ProfilePage;
