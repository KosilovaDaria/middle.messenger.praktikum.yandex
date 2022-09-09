import LoginPage from './pages/loginPage/index';
import SignupPage from './pages/signupPage/index';
import ProfilePage from './pages/profilePage/index';
import SettingsPage from './pages/settingsPage/index';
import PassPage from './pages/passPage/index';
import ChatPage from './pages/chatPage/index';
import { ErrorPage, ServerErrorPage } from './pages/ErrorPage/index';
import render from './utils/render';

const routes:Record<string, any> = {
  '/': LoginPage,
  '/login': LoginPage,
  '/signup': SignupPage,
  '/profile': ProfilePage,
  '/settings': SettingsPage,
  '/pass': PassPage,
  '/chat': ChatPage,
  '/404': ErrorPage,
  '/500': ServerErrorPage,
};

window.addEventListener('DOMContentLoaded', () => {
  const path = window.location.pathname;
  if (Object.keys(routes).find((el) => el === path)) {
    render('.app', routes[path]);
  } else {
    render('.app', ErrorPage);
    console.log('No page')
  }
})
