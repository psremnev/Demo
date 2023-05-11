# ОПИСАНИЕ РАБОТЫ С КОНФИГУРАЦИЕЙ ПРИЛОЖЕНИЯ: (CTRL + SHIFT + V) - PREVIEW MODE VS CODE

---

 ## Запуск проекта:
   - инициализируем зависимости: npm i
   - запускаем сборку и стартуем: npm run start
 ## Конфигурация страниц находится в page.json. Здесь мы можем сконфигурировать новую страницу для нашего приложения, указав при

   - module - url до модуля из которого экспортируется компонент по умолчанию

     пример: "module": "About/About"

   - preloaderPath - url до модуля из которого экспортируется функция по умолчанию, необязательное поле
   в функцию придет 2 аргумента: опции из конфига и параметры из урл строки, пример func(opts, params)

     пример:"preloaderPath": "About/Loader",

   - различные опции, необязательное поле

     пример:
     "options": {
        "anyOption": 'anyValue'
     }
## Базовые котролы папкa - Base

Buttons

![Buttons](https://github.com/psremnev/demo-express_react_ts/blob/main/demo-image/button.png)

dropDownButton

![dropDown-button](https://github.com/psremnev/demo-express_react_ts/blob/main/demo-image/dropDown-button.png)

Hint

![Hint](https://github.com/psremnev/demo-express_react_ts/blob/main/demo-image/hint.png)

Lists

![Lists](https://github.com/psremnev/demo-express_react_ts/blob/main/demo-image/lists.png)

Popup Confirmation

![Popup Confirmation](https://github.com/psremnev/demo-express_react_ts/blob/main/demo-image/popup-confirmation.png)

Popup Dialog

![Popup Dialog](https://github.com/psremnev/demo-express_react_ts/blob/main/demo-image/popup-dialog.png)

Popup Stack

![Popup Stack](https://github.com/psremnev/demo-express_react_ts/blob/main/demo-image/popup-stack.png)

Selector List

![Popup Stack](https://github.com/psremnev/demo-express_react_ts/blob/main/demo-image/selector-list.png)

Tree List

![Popup Stack](https://github.com/psremnev/demo-express_react_ts/blob/main/demo-image/tree-list.png)

Carousel

![Popup Stack](https://github.com/psremnev/demo-express_react_ts/blob/main/demo-image/carousel.png)

Все базовые модули можно посмотреть тут https://github.com/psremnev/demo-express_react_ts/tree/main/src/modules/Base