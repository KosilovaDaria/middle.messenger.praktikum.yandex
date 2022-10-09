Проект первого модуля "Мессенджер".

Макет https://www.figma.com/file/E37Uz9BVx7CBTfwNMdPw9I/Messenger-app?node-id=0%3A1

Шаблонизатор: Handlebars

Препроцессор: PostCss (Css Modules)

Сборка Parcel dev-режим: npm run dev

Билд Parcel: npm run build

Express: npm run start

Netlify: https://voluble-crepe-6a0f21.netlify.app

Использован компонентный подход, базовый класс Block.

Реализован класс роутер для перехода между страницами согласно сигнатуре:

/ — страница входа,

/sign-up — страница регистрации,

/profile —  страница профиля пользователя,

/settings —  настройки профиля пользователя,

/pass —  настройки смены пароля,

/messenger — чат.

Внедрен HTTP API чатов, авторизации и пользователей.

Подключен WebSocket для работы с real-time сообщениями.

