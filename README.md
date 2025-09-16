# Project Setup Guide

This project contains a **Laravel backend** and a **React frontend**, fully containerized using **Docker**.

Follow the steps below to set up and run the project.

---

## 📦 Requirements
- [Docker](https://docs.docker.com/get-docker/) installed
- [Docker Compose](https://docs.docker.com/compose/install/) installed

---

## 🚀 Getting Started
---

### 1. Configure Environment Files

#### Laravel (`.env`)
In the project root, create a `.env` file for Laravel (or copy from `.env.example`):

```env
APP_NAME=Laravel
APP_ENV=local
APP_KEY=
APP_DEBUG=true
APP_URL=http://localhost:8000

LOG_CHANNEL=stack
LOG_LEVEL=debug

DB_CONNECTION=mysql
DB_HOST=mysql
DB_PORT=3306
DB_DATABASE=laravel_db
DB_USERNAME=laravel
DB_PASSWORD=laravel

BROADCAST_DRIVER=log
CACHE_DRIVER=file
FILESYSTEM_DISK=local
QUEUE_CONNECTION=sync
SESSION_DRIVER=file
SESSION_LIFETIME=120
```

#### React (`.env`)
Inside your React app directory (e.g., resources/js or frontend), create a .env file:

```VITE_API_URL=http://localhost:8000/api```

### 2. Start Docker Containers
From the project root, run:

```docker-compose up -d --build```
This will start the following containers:

- app → Laravel (PHP)
- nginx → Web server (accessible at http://localhost:8000)
- mysql → Database
- node → Node.js for frontend

### 3. Setup Frontend (React)

1. Enter the Node container:
    ```docker exec -it node bash```
2. Move into the frontend directory (if not already in root):
    ```cd /var/www/html```
3. Install dependencies:
    ```npm install```
4. Start Vite development server:
    ```npm run dev```
The React app will run on:
    ```http://localhost:5173/```

### 4. Setup Backend (Laravel)

1. Enter the Laravel container:
    ```docker exec -it laravel bash```
2. Install PHP dependencies:
    ```composer install```
3. Generate application key:
    ```php artisan key:generate```
4. Run database migrations:
    ```php artisan migrate```

### 5. Access the Application

Laravel API: http://localhost:8000
