# Moodsinger Backend

This repository contains the Django backend for the Moodsinger project.

## Requirements

- Python 3.10+
- PostgreSQL database
- Redis server (for Celery)

## Setup

1. Create and activate a virtual environment.
2. Install the dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Create a `.env` file in the project root and configure the environment variables described below.
4. Apply the database migrations:
   ```bash
   python manage.py migrate
   ```
5. (Optional) run a Celery worker for asynchronous tasks:
   ```bash
   celery -A moodsinger worker -l info
   ```
6. Start the development server:
   ```bash
   python manage.py runserver
   ```

## Environment variables

The application uses `python-decouple` to load configuration. Define the following variables in your `.env` file:

```
DEBUG=true
ALLOWED_HOSTS=localhost,127.0.0.1
DB_NAME=moodsinger_db
DB_USER=postgres
DB_PASSWORD=password
DB_HOST=localhost
DB_PORT=5432
REDIS_URL=redis://localhost:6379/0
```

Adjust the values to match your local setup.

## Project structure

- `apps/` – Django apps for authentication, music management and analysis.
- `moodsinger/` – project configuration and Celery setup.

## Running

After configuring the environment and installing dependencies, run migrations and start both the Celery worker and the Django development server as shown above.

