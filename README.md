# 🚀 Проект первого моудуля Мессенджер

This project has been created using **webpack-cli**, you can now run

```
npm run build
```

or

```
yarn build
```

to bundle your application
Проект первого модуля "Мессенджер".

Макет https://www.figma.com/file/E37Uz9BVx7CBTfwNMdPw9I/Messenger-app?node-id=0%3A1

Шаблонизатор: Handlebars

Препроцессор: PostCss (Css Modules)

Сборка Webpack:

Build: npm run build

Dev: npm run build:dev

DevServer: npm run serve

Запуск тестов: npm run test

Netlify: https://voluble-crepe-6a0f21.netlify.app

Компонентный подход, базовый класс Block.

Реализован класс роутер для перехода между страницами согласно сигнатуре:

/ — страница входа,

/sign-up — страница регистрации,

/profile — страница профиля пользователя,

/settings — настройки профиля пользователя,

/pass — настройки смены пароля,

/messenger — чат.

HTTP API чатов, авторизации и пользователей.

WebSocket для работы с real-time сообщениями.

