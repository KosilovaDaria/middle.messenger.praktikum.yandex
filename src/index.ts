import LoginPage from './pages/loginPage/index';
import SignupPage from './pages/signUpPage/index';
import ProfilePage from './pages/profilePage/index';
import SettingsPage from './pages/settingsPage/index';
import PassPage from './pages/passPage/index';
import ChatPage from './pages/chatPage/index';
import { ErrorPage, ServerErrorPage } from './pages/ErrorPage/index';
import render from './utils/render';
import Block from './utils/Block';
import Router from './utils/Router';
import AuthLayout from './layout/auth/authLayout'

// const routes:Record<string, Block> = {
//   '/': LoginPage,
//   '/login': LoginPage,
//   '/signup': SignupPage,
//   '/profile': ProfilePage,
//   '/settings': SettingsPage,
//   '/pass': PassPage,
//   '/chat': ChatPage,
//   '/404': ErrorPage,
//   '/500': ServerErrorPage,
// };

// window.addEventListener('DOMContentLoaded', () => {
//   const path = window.location.pathname;
//   if (Object.keys(routes).find((el) => el === path)) {
//     render('.app', routes[path]);
//   } else {
//     render('.app', ErrorPage);
//   }
// })
// window.addEventListener('DOMContentLoaded', () => {
const router = new Router('.app');
router
  .use('/', LoginPage)
  .use('/sign-up', SignupPage)
  .use('/profile', ProfilePage)
  .use('/settings', SettingsPage)
  .use('/pass', PassPage)
  .use('/messenger', ChatPage)
  .use('/*', ErrorPage)
  .start();
// })
