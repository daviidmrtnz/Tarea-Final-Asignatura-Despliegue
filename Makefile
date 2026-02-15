.PHONY: up down migrate install logs

up:
	docker compose up -d

down:
	docker compose down

migrate:
	docker compose exec backend php bin/console doctrine:migrations:migrate --no-interaction

install:
	docker compose exec backend composer install

logs:
	docker compose logs -f
