


python manage.py makemigrations --empty users 
python manage.py makemigrations --empty notifications tournament pingpong chat tictactoe

python manage.py makemigrations users
python manage.py makemigrations notifications tournament pingpong chat tictactoe
while ! nc -z postgres 5432; do sleep 1; done;


python manage.py makemigrations
python manage.py migrate users
python manage.py migrate
python manage.py runserver 0.0.0.0:8000