## Сборщик проекта

Для начала работы необходимо клонировать репозиторий
```
git clone git@github.com:imslava/imslava-front.git
```

Затем установить зависимости
```
npm i
```

### Структура проекта
```
imslava-front                        		| Корень проекта
├── src                                 | Исходные файлы
│   ├── fonts                           | Шрифты
│   ├── sass                            | Файлы стилей
│   │   ├── include                     | Файлы стилей сайта
│   │   ├── libs                        | Файлы стилей библиотек
│   │   ├── media                       | Файлы стилей для адаптива
│   │   ├── helpers                     | Помощники
│   │   │   ├── _global.sass            | Глобальные стили сайта
│   │   │   ├── _include.sass           | Стили от сайта
│   │   │   ├── _fonts.sass             | Подключение шрифтов
│   │   │   ├── _mixins.sass            | Примеси
│   │   │   ├── _normalize.sass         | Сброс стандартных стилей
│   │   │   ├── _libs.sass              | Стили от библиотек
│   │   │   ├── _media.sass             | Стили от адаптива
│   │   │   └── _variables.sass         | Переменные
│   │   └── main.sass                   | Основной файл стилей, импортирует все остальные стиливые файлы
├── .editorconfig                       | Конфигурация редактора
├── .gitignore                          | Исключенные файлы из git
├── gulpfile.js                         | Конфигурация Gulp
└── package.json                        | Список зависимостей 
```