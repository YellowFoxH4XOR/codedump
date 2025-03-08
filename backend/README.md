# FastAPI Application

A well-structured FastAPI application following best practices.

## Features

- FastAPI framework with Python 3.8+
- PostgreSQL database
- SQLAlchemy ORM
- Alembic migrations
- Pydantic data validation
- CORS middleware
- API versioning
- Dependency injection
- CRUD operations example
- Clean architecture
- Poetry for dependency management

## Requirements

- Python 3.8+
- PostgreSQL
- Poetry

## Setup

1. Install Poetry (if not already installed):
   ```bash
   curl -sSL https://install.python-poetry.org | python3 -
   ```

2. Clone the repository and navigate to the project directory

3. Install dependencies using Poetry:
   ```bash
   poetry install
   ```

4. Create a `.env` file in the root directory with your database configuration:
   ```
   POSTGRES_SERVER=localhost
   POSTGRES_USER=postgres
   POSTGRES_PASSWORD=postgres
   POSTGRES_DB=app
   ```

## Running the Application

1. Start the PostgreSQL server

2. Activate the Poetry virtual environment:
   ```bash
   poetry shell
   ```

3. Run the application:
   ```bash
   uvicorn app.main:app --reload
   ```

4. Visit http://localhost:8000/docs for the interactive API documentation

## Development

- Format code:
  ```bash
  poetry run black .
  poetry run isort .
  ```

- Run linting:
  ```bash
  poetry run flake8
  ```

- Run tests:
  ```bash
  poetry run pytest
  ```

## API Endpoints

- `GET /api/v1/items`: List all items
- `POST /api/v1/items`: Create a new item
- `GET /api/v1/items/{item_id}`: Get a specific item
- `PUT /api/v1/items/{item_id}`: Update an item
- `DELETE /api/v1/items/{item_id}`: Delete an item

## Project Structure

```
.
├── app
│   ├── api
│   │   └── v1
│   │       ├── api.py
│   │       └── endpoints
│   │           └── items.py
│   ├── core
│   │   └── config.py
│   ├── crud
│   │   └── item.py
│   ├── db
│   │   └── session.py
│   ├── models
│   │   └── item.py
│   └── schemas
│       └── item.py
├── pyproject.toml
└── README.md
``` 