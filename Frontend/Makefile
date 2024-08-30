

up :  build down
	sudo docker run -d -p 5173:5173 --name myapp -v .:/usr/src/app myapp \
	&& sudo docker exec -it myapp /bin/bash -c "npm run dev"

build :
	@if [ -z "$$(sudo docker images -q myapp)" ]; then \
			sudo docker build -t myapp .; \
		else \
			echo "Image already exists"; \
		fi

down : 
	@if [ -z "$$(sudo docker ps -q --filter name=myapp)" ]; then \
			echo "Container is not running"; \
		else \
			sudo docker stop myapp && sudo docker rm myapp; \
		fi
clean : down 
	sudo  docker rmi myapp