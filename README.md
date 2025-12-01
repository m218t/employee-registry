Назначение

Приложение для учёта сотрудников: хранение данных, фильтрация, поиск, создание, редактирование, пометка об увольнении.

Стек

Backend: Node.js (NestJS)
DB: PostgreSQL
Frontend: HTML/CSS/JavaScript 
Docker / Docker Compose

Структура репозитория

api/         — backend  
web/         — frontend  
migrations/  — SQL схема и начальные данные  
docker/      — конфигурации контейнеров  

Запуск

docker-compose up --build
API - http://localhost:3000
Web - http://localhost:5173