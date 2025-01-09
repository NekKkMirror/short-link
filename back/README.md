# Short Link Manager – Backend Service
## 📚 Проект: Backend для управления короткими ссылками

Этот проект представляет из себя **REST API сервис для сокращения ссылок**. Он построен с использованием **гексагональной архитектуры (Hexagonal Architecture)**, что делает систему гибкой, легко тестируемой и масштабируемой. Основное предназначение сервиса — управление короткими ссылками, отслеживание статистики кликов и предоставление аналитики.

## 📂 Структура проекта
Проект основан на **гексагональной архитектуре**, разделяющей инфраструктуру, доменные сущности и адаптеры.

### Основные модули:
- **Core (Domain Layer)**: Основная логика взаимодействия и бизнес-правила.
  - Модели, такие как [`Analytics`](src/domain/entity/analytics.ts) и [`ShortenedLink`](src/domain/entity/shortened-link.ts).
  - Логика сокращения ссылок, проверки, аналитики.

- **Adapters**: Адаптеры — интерфейсы для взаимодействия с базой данных и внешними сервисами.
  - Интеграция с PostgreSQL через Prisma ORM.

- **Infrastructure/Delivery**: Уровень проведения данных.
  - Express для REST API уровню.
  - Swagger для документирования API.

### Шаги интеракции:
1. **Входящие запросы** через HTTP на основе правила роутинга (например, API для создания ссылок, редиректа, аналитики).
2. **Зависимости изолированы через интерфейсы** (Use Cases/Adapters).
3. **Логика из Domain Layer** отрабатывает сценарии.
4. **Данные хранятся с использованием PostgreSQL**.

## ⚙️ Как начать работу (Настройка проекта)
### 1. **Установка зависимостей**
Системные требования:
- **Node.js**: 22.12.0 или выше.
- **PostgreSQL**: версии 15 или выше.

Установите зависимости:
``` bash
  npm install
```

### 2. **Запуск проекта в Development-режиме**
- Создайте `.env` и скопируйте в него [`.env.development`](.env.development):
``` bash
  touch .env & cp .env.development .env
```
- Запустите проект в режиме разработки:
``` bash
  make run-dev
```
- Для просмотра логов:
``` bash
  make run-dev-logs
```

### 3. **🛡️ Запуск в тестовом окружении**
- Тесты включают:
  - Интеграционные тесты для проверки сценариев.

- Создайте `.env` и скопируйте в него [`.env.testing`](.env.testing):
``` bash
  touch .env & cp .env.testing .env
```
- Запуск тестов:
``` bash
  make run-test
```

### 4. **Переменные окружения**
Параметры настраиваются через `.env.*` файлы:
**Пример `.env.development`:**
``` dotenv
  APP_NODE_ENV=development
  APP_HOST=0.0.0.0
  APP_PORT=3000
  APP_IMAGE_NAME=short-link-back/app-dev:latest
  APP_CONTAINER_NAME=short-link-back_development

  EXAMPLE_MESSAGE="Hello, world!"

  DB_IMAGE_NAME=postgres:15
  DB_CONTAINER_NAME=short-link-db_development
  DB_USER=dev
  DB_PASSWORD=dev
  DB_HOST=0.0.0.0
  DB_PORT=5432
  DB_NAME=dev
  DATABASE_URL=postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}
```
**База данных (PostgreSQL):**
- Имя БД, пользователь, пароль — настраиваются через `.env`.

### 5. **Миграция базы данных**
Примените или организуйте базу миграцией:
``` bash
  npm run migrate:dev
```
Запустите интерфейс для работы с данными:
``` bash
  npm run prisma:studio
```

## 🛠 Стек технологий
- **Node.js & TypeScript** — производительность и безопасность.
- **Express** — REST API.
- **Prisma ORM** — удобное взаимодействие с PostgreSQL.
- **PostgreSQL** — для хранения данных ссылок и аналитики.
- **Jest** — тестирование.
- **Docker** — управление окружением для разработки и тестирования.
- **Swagger/OpenAPI** — для API-документации.

## 🏗️ Архитектура проекта
### 🟢 Гексагональная архитектура
Гексагональная архитектура состоит из:
1. **Domain Layer (Бизнес-логика)**:
  - Чистая логика, используя интерфейсы.
  - Модели [`ShortenedLink`](src/domain/entity/shortened-link.ts), [`Analytics`](src/domain/entity/analytics.ts).

2. **Application/Use Case Layer (Сценарии):**
  - Все действия вынесены в виде "Юзкейсов".
  - Пример: [`listByLink`](src/domain/usecase/analytics/list-by-link.ts), [`prepareRedirect`](src/domain/usecase/shortened-link/prepare-redirect.ts).

3. **Infrastructure Layer (Инфраструктура):**
  - Адаптеры для баз данных (Prisma + PostgreSQL).
  - API Middleware (Express-vалидаторы и логгеры).

### 📂 Директории:
``` plaintext
/src                                <-- Исходный код проекта.
  ├── __tests__/                    <-- Тесты.
  ├── adapter/                      <-- Адаптеры (Репозитории и Шлюзы).
  ├── app/                          <-- Входная точка приложения.
  ├── config/                       <-- Конфигурации.
  ├── delivery/                     <-- REST API (Delivery Layer).
  ├── domain/                       <-- Бизнес-логика, модели, сценарии, сервисы.
  ├── lib/                          <-- Клиенты и вспомогательные утилиты (логгеры, обработчики ошибок).
```

## 📝 Swagger/OpenAPI
API-документация доступна по адресу:
```
  http://localhost:3000/api/v1/swagger
```

## 💻 Поддержка разработки
1. Линтинг:
``` bash
  npm run lint
```
1. Форматирование:
``` bash
  npm run format
```
## ✨ Особенности:
- **Чистая архитектура**: код легко поддерживать.
- **Поддержка Prod/Dev/Test окружений**: через Docker.
- **Масштабируемость**: архитектура позволяет добавлять новые сценарии.
