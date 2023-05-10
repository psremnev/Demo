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
![Buttons](https://github.com/psremnev/express_react_ts_project/blob/main/demo-image/button.png)
