## Сборщик проекта

Для начала работы необходимо клонировать репозиторий
```
git clone git@github.com:imslava/imslava-front.git
```

Затем установить зависимости
```
npm i
```

## Команды

Для запуска проекта
```
gulp
```

Для сборки проекта (так же заархивирует в `zip`)
```
gulp build
```

## Структура проекта

```
imslava-front                           | Корень проекта
├── src                                 | Исходные файлы
│   ├── fonts                           | Шрифты
│   ├── img                             | Изображения
│   │   └── icons                     	| Иконки
│   ├── js                            	| Файлы скриптов
│   │   ├── helpers/functions.js        | Функции скриптов
│   │   ├── vendor                      | Файлы скриптов библиотек
│   │   ├── vendor.js                   | Файлы библиотек, имптортирует из vendor
│   │   └── main.js                   	| Основной файл скриптов
│   ├── sass                            | Файлы стилей
│   │   ├── include                     | Файлы стилей сайта
│   │   ├── vendor                      | Файлы стилей библиотек
│   │   ├── media                       | Файлы стилей для адаптива
│   │   ├── helpers                     | Помощники
│   │   │   ├── _global.sass            | Глобальные стили сайта
│   │   │   ├── _include.sass           | Стили от сайта
│   │   │   ├── _fonts.sass             | Подключение шрифтов
│   │   │   ├── _mixins.sass            | Примеси
│   │   │   ├── _normalize.sass         | Сброс стандартных стилей
│   │   │   ├── _vendor.sass            | Стили от библиотек
│   │   │   ├── _media.sass             | Стили от адаптива
│   │   │   └── _variables.sass         | Переменные
│   │   └── main.sass                   | Основной файл стилей, импортирует все остальные стиливые файлы
├── .editorconfig                       | Конфигурация редактора
├── .gitignore                          | Исключенные файлы из git
├── gulpfile.js                         | Конфигурация Gulp
└── package.json                        | Список зависимостей 
```

## Заметки

### Подключение файлов

Подключение js файла
```
//=require helpers/functions.js
```

Подключение sass файла
```
@import 'helpers/media'
```

Подключение html файла
```
{% include 'include/_header.html' %}
```