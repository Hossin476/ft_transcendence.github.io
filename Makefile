DOCKER_COMPOSE_FILE = docker-compose.yaml

all:
	@docker-compose -f ${DOCKER_COMPOSE_FILE} up -d

backend:
	@docker exec -it backend bash

frontend:
	@docker exec -it frontend bash

down:
	@docker-compose -f ${DOCKER_COMPOSE_FILE} down

.PHONY: backend
