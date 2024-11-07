import time

x = 20

while 1:
    print(f'\r\33[K{x}', end='')
    x -= 1
    time.sleep(0.5)