FROM python:3.12-slim

RUN pip install poetry==2.1.3

ENV POETRY_VIRTUALENVS_CREATE=false

WORKDIR /app

COPY pyproject.toml poetry.lock ./
RUN touch README.md
COPY src ./src
RUN poetry install --no-interaction --no-ansi --no-root --no-cache

EXPOSE 5000

ENTRYPOINT ["poetry", "run", "flask", "--app", "./src/back_end/app.py", "run", "--host=0.0.0.0", "--port=5000"]
