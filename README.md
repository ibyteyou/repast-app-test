## каК запускатЬ
```
yarn || npm install
```

### Compiles and hot-reloads for development
```
yarn dev || npm run dev
```

### Compiles and minifies for production
```
yarn build || npm run build
```

### Lints and fixes files
```
yarn lint || npm run lint
```

# Цель #

Разработать SPA-приложение с использованием Vue + Vuex + Vue router.

Приложение должно получать данные из API и выводить их в клиентскую часть.

API: https://dog.ceo/dog-api

Макет: https://www.figma.com/file/xKCYI066offeYO3qTLByoP/TZ

Главная страница:

- Отображает список изображений всех собак (по умолчанию в рандомном порядке).
- Сверху находится переключатель с рандомного порядка фото на алфавитный.
- По стандарту должно отображаться 20 изображений и реализован бесконечный скролл с подгрузкой следующих 20 изображений.
- ![#f03c15](Не понял в чём смысл делать псевдобесконечную загрузку, если с апи приходит сразу всё, если что могу показать свой виртуал скролл, опыт в этом есть) `#f03c15`
- Первое фото в списке большое, на три колонки в ширину.

# Страницы пород #

- В шапке располагается селект со списком всех доступных пород.
- При выборе определенной породы происходит роутинг на app.ru/breed, например app.ru/husky.
- При переходе по таким урлам должны загружаться изображения только выбранной породы.

# Избранное #

- Каждое изображение можно лайкнуть (иконка сердца), после чего эти изображения можно будет увидеть на странице app.ru/favourites. Информация о лайкнутых фото должна храниться в localStorage.

# Общие требования #

- Использование ESLint (standard) обязательно
- Вся логика работы с API находится во Vuex
- Допустимые к использованию библиотеки только vue, vuex, vue-router, axios, vuetify
- Исходный код проекта должен быть выложен на GitHub.
- Верстка с помощью Vuetify (Only class)
- CoreJS3
