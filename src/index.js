import LoginPage from './pages/loginPage/index';
import SignUpPage from './pages/signUpPage/index';
import ProfilePage from './pages/profilePage';
import SettingsPage from './pages/settingsPage';
import PassPage from './pages/passPage';
import ChatPage from './pages/chatPage';
import {ErrorPage, ServerErrorPage} from './pages/ErrorPage';

const main = document.getElementById('root');
const routes = {
  '/login': LoginPage,
  '/signup': SignUpPage,
  '/profile': ProfilePage,
  '/settings': SettingsPage,
  '/pass': PassPage,
  '/chat': ChatPage,
  '/404': ErrorPage,
  '/500': ServerErrorPage
};
window.onload = function (e) {
  const path = window.location.pathname;
  if (Object.keys(routes).find((el) => el === path)) {
    main.innerHTML = routes[path];
  } else {
    console.log('fuck');
  }
};

document.getElementById('root').innerHTML = LoginPage;
