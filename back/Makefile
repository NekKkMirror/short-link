# Development
run-dev:
	docker compose -f docker-compose.development.yml up -d --force-recreate

run-dev-logs:
	docker compose -f docker-compose.development.yml logs --follow --tail 500

run-dev-down:
	docker compose -f docker-compose.development.yml down -v

# Testing
run-test:
	docker compose -f docker-compose.testing.yml up --force-recreate
