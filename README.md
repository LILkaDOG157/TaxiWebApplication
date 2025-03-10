# Taxi Service Website

Современный веб-сайт для службы такси с административной панелью управления, разработанный с использованием Next.js 14, TypeScript и Tailwind CSS.

## 🚀 Основные функции

- Информативная главная страница
- Раздел "О нас" с информацией о компании
- Страница требований для водителей
- Контактная форма
- Новостной раздел
- Административная панель для управления контентом
- Адаптивный дизайн
- Двуязычный интерфейс

## 🛠 Технологии

- [Next.js 14](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [PostgreSQL](https://www.postgresql.org/)
- [Prisma ORM](https://www.prisma.io/)

## 📋 Требования

- Node.js 18.0 или выше
- PostgreSQL 12 или выше
- npm или yarn

## 🚀 Установка и запуск

1. Клонируйте репозиторий:
```bash
git clone https://github.com/your-username/taxi-service.git
cd taxi-service
```

2. Установите зависимости:
```bash
npm install
# или
yarn install
```

3. Создайте файл `.env` и настройте переменные окружения:
```env
DATABASE_URL="postgresql://username:password@localhost:5432/taxi_website"
```

4. Выполните миграции базы данных:
```bash
npx prisma migrate dev
```

5. Заполните базу данных начальными данными:
```bash
npx prisma db seed
```

6. Запустите сервер разработки:
```bash
npm run dev
# или
yarn dev
```

Откройте [http://localhost:3000](http://localhost:3000) в браузере.

## 👨‍💻 Доступ к админ-панели

Административная панель доступна по адресу `/admin`. 

Учетные данные по умолчанию:
- Логин: `некитмарсель`
- Пароль: `12345`

## 📁 Структура проекта

```
taxi-service/
├── app/
│   ├── admin/           # Административная панель
│   ├── api/            # API маршруты
│   ├── components/     # React компоненты
│   ├── about/         # Страница "О нас"
│   ├── contact/       # Контактная страница
│   ├── news/          # Новостной раздел
│   └── requirements/  # Страница требований
├── prisma/
│   ├── schema.prisma  # Схема базы данных
│   └── seed.ts       # Скрипт начальных данных
├── public/           # Статические файлы
└── styles/          # CSS стили
```

## 🔧 Конфигурация

Настройки проекта можно изменить в следующих файлах:

- `.env` - Переменные окружения
- `prisma/schema.prisma` - Схема базы данных
- `tailwind.config.js` - Настройки Tailwind CSS

## 📱 Поддерживаемые браузеры

- Chrome >= 60
- Firefox >= 60
- Edge >= 79
- Safari >= 12
- iOS >= 12
- Opera >= 47

## 🙏 Благодарности

- лелику за то что он есть 
