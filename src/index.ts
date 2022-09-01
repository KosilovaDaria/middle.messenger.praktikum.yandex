import LoginPage from './pages/loginPage/index';
import SignupPage from './pages/signupPage/index';
import ProfilePage from './pages/profilePage/index';
import SettingsPage from './pages/settingsPage/index';
import PassPage from './pages/passPage';
import {ErrorPage,ServerErrorPage } from './pages/ErrorPage';
import { render } from "./utils/render";

const routes = {
  '/': LoginPage,
  '/login': LoginPage,
  '/signup': SignupPage,
  '/profile': ProfilePage,
  '/settings': SettingsPage,
  '/pass': PassPage,
  // '/chat': ChatPage,
  '/404': ErrorPage,
  '/500': ServerErrorPage
};
// window.onload = function (e) {
//   const path = window.location.pathname;
//   if (Object.keys(routes).find((el) => el === path)) {
//     // main!.innerHTML = routes[path];
//     render(".app", routes[path]);
//   } else {
//     // render(".app", page);
//     console.log('No page')
//   }
// };

window.addEventListener('DOMContentLoaded', () =>{
  const path = window.location.pathname;
  if (Object.keys(routes).find((el) => el === path)) {
    render(".app", routes[path]);
  } else {
    render(".app", ErrorPage);
    console.log('No page')
  }
})
