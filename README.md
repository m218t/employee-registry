## Frontend
- Чистый **HTML/CSS/JS**
- Адаптивный интерфейс
- Работа с API через **Fetch**

## Инфраструктура
- **Docker + Docker Compose**
- Готовая схема БД

## 📋 Функционал
- ✅ Просмотр всех сотрудников  
- ✅ Фильтрация по отделу и должности  
- ✅ Поиск по ФИО (real time)  
- ✅ Добавление новых сотрудников  
- ✅ Редактирование информации  
- ✅ Увольнение с блокировкой редактирования  
- ✅ Валидация данных на стороне сервера  

## 🗂️ Структура проекта

```text
api/                    # Backend (NestJS + TypeORM)
├── src/
│   ├── employees/      # Модуль сотрудников
│   │   ├── controller.ts
│   │   ├── service.ts
│   │   └── dto/
│   ├── employee.entity.ts
│   └── main.ts
├── public/             # Frontend
│   └── index.html
└── package.json
docker/                 # Docker-окружение
├── docker-compose.yml
└── .env.example
```


## 📡 API Endpoints
| Метод | Endpoint | Описание |
|-------|----------|----------|
| GET | `/api/employees` | Все сотрудники |
| GET | `/api/employees/search?name=...` | Поиск по ФИО |
| POST | `/api/employees` | Добавить сотрудника |
| PUT | `/api/employees/:id` | Обновить данные |
| PATCH | `/api/employees/:id/dismiss` | Уволить |

## 🐳 Запуск без Docker
```bash
# 1. Запустить PostgreSQL
docker run -d --name employees-db \
  -p 5432:5432 \
  -e POSTGRES_DB=employees \
  -e POSTGRES_USER=app \
  -e POSTGRES_PASSWORD=secret \
  postgres:15

# 2. Запустить сервер
cd api
npm install
npm run start:dev
