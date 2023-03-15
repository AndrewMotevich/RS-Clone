## task: [rs-clone](https://github.com/rolling-scopes-school/tasks/blob/master/tasks/rsclone/rsclone.md)
## deploy: 
- [FrontEnd Deploy](https://podcast-deploy.vercel.app/)
- [BackEnd REST Api](https://github.com/AndrewMotevich/RS-clone-API)
- [UML Diagram](https://miro.com/app/board/uXjVPpIj5ug=/?share_link_id=911662742580)
## screenShoot: 
![image](https://user-images.githubusercontent.com/101500007/221660946-2a16af58-30f2-4695-af8d-7612225bfaff.png)
***
#### Done 27.02.2023 / deadline 27.02.2023
***
## Score: 620/620
### FrontEnd (360/360)
#### Общее: (110)
- Роутинг без перезагрузки страницы, приложение SPA. (+40 баллов)
- Использование [API](https://api.podcastindex.org/developer_docs) подкастов. (+50 баллов)
- Единый стиль приложения. (+20 баллов)
#### Главная страница: (55)
 - Модальные окна логина, считывание инпутов, отправка значений на сервер. (+20 баллов)
 - Анимация меню аккаунта.  (+10 баллов)
  - Анимация кнопки Play на карточке подкаста. (+5 баллов)
 - Поисковая строка для подкастов по теме. (+20 баллов)
#### Страница эпизодов подкаста: (50)
- отображение списка эпизодов подкаста (+20 баллов)
- возможность открыть страницу эпизода с описанием (+15 баллов)
- возможность добавить эпизод подкаста в плейлист (+10 баллов)
- возможность подписаться на подкаст, он добавится в библиотеку (+5 баллов)
#### Страница библиотеки: (50)
- управление плейлистами (+30 баллов)
- просмотр каналов подкастов, на которые подписан пользователь (+20 баллов)
#### Аудиоплеер: (95)
- кастомный аудиоплеер (+30 баллов)
- кастомный регулятор громкости (+20 баллов)
- перемотка трека по 10 сек (+10 баллов)
- кнопки следующего/предыдущего эпизода (+10 баллов)
- плеер не прерывает воспроизведение при навигации по сайту (+25 баллов)
***
### BackEnd (260/260)
- #### Реализован на nodejs и express (+10 балов)
- #### Подключение и работа с БД MongoDB (+10 балов)
- #### Приложение разбито на микросервисы (authorization, library); (+10 балов)
- #### Регистрация:
 - [x] [addUser](https://github.com/AndrewMotevich/RS-clone-API/blob/main/src/doc/authMethods/addUser.md) (+20 балов)
- #### Аутентификация:
 - [x] [signIn](https://github.com/AndrewMotevich/RS-clone-API/blob/main/src/doc/authMethods/signIn.md) (+20 балов)
- #### Авторизация:
 - [x] [updateUser](https://github.com/AndrewMotevich/RS-clone-API/blob/main/src/doc/authMethods/updateUser.md) (+20 балов)
 - [x] [deleteUSer](https://github.com/AndrewMotevich/RS-clone-API/blob/main/src/doc/authMethods/deleteUser.md) (+20 балов)
 - [x] [signOut](https://github.com/AndrewMotevich/RS-clone-API/blob/main/src/doc/authMethods/signOut.md) (+20 балов)
- #### Методы работы с библиотекой пользователя:
 - [x] [userLibrary]() (+20 балов)
 - [x] [addItemToPlaylist](https://github.com/AndrewMotevich/RS-clone-API/blob/main/src/doc/libMethods/addItemToPlaylist.md) (+20 балов)
 - [x] [removeItemFromPlaylist](https://github.com/AndrewMotevich/RS-clone-API/blob/main/src/doc/libMethods/removeItemFromPlaylist.md) (+20 балов)
 - [x] [addPlaylist](https://github.com/AndrewMotevich/RS-clone-API/blob/main/src/doc/libMethods/addNewPlaylist.md) (+20 балов)
 - [x] [removePlaylist](https://github.com/AndrewMotevich/RS-clone-API/blob/main/src/doc/libMethods/removePlaylist.md) (+20 балов)
 - [x] [renamePlaylist](https://github.com/AndrewMotevich/RS-clone-API/blob/main/src/doc/libMethods/renamePlaylist.md) (+20 балов)
- #### Сервер отдаёт корректные ответы, отдаёт HTTP ошибки с нормальными body, по которым можно понять, что произошло, пишет читаемые логи. (+10 балов)
***
## Пример POST запроса (использовать POSTMAN или запустить локальный сервер под следующими доменами : 'http://localhost:8080', 'http://127.0.0.1:8080', 'http://127.0.0.1:5500'):
```
var myHeaders = new Headers();
myHeaders.append("admin-pass", "root");

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

fetch("rs-clone-api.vercel.app/allPlaylists", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
```
