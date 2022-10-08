import LoginPage from './pages/loginPage/index';
import SignupPage from './pages/signUpPage/index';
import ProfilePage from './pages/profilePage/index';
import SettingsPage from './pages/settingsPage/index';
import PassPage from './pages/passPage/index';
import ChatPage from './pages/chatPage/index';
import { ErrorPage, ServerErrorPage } from './pages/ErrorPage/index';
import Router from './utils/Router';
import AuthController from './controllers/AuthController';

const router = new Router('.app');

enum Routes {
  Index = '/',
  Signup = '/sign-up',
  Profile = '/profile',
  Settings = '/settings',
  Pass = '/pass',
  Chat = '/messanger',
  Error = '/404',
  ServerError = '/500',
}

window.addEventListener('DOMContentLoaded', async () => {
  router
    .use(Routes.Index, LoginPage)
    .use(Routes.Signup, SignupPage)
    .use(Routes.Profile, ProfilePage)
    .use(Routes.Settings, SettingsPage)
    .use(Routes.Pass, PassPage)
    .use(Routes.Chat, ChatPage)
    .use(Routes.Error, ErrorPage)
    .use(Routes.ServerError, ServerErrorPage)
    .start()

  let isProtectedRoute = true;

  // eslint-disable-next-line default-case
  switch (window.location.pathname) {
    case Routes.Index:
    case Routes.Signup:
      isProtectedRoute = true;
      break;
  }
  try {
    await AuthController.fetchUser();
    router.start();

    if (!isProtectedRoute) {
      router.go(Routes.Profile)
    }
  } catch (e) {
    router.start();

    if (isProtectedRoute) {
      router.go(Routes.Index);
    }
  }
})
