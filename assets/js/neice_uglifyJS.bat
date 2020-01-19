
cd _neice
call uglifyjs index.js -m -o ../custom/index.min.js
call uglifyjs login.js -m -o ../custom/login.min.js
call uglifyjs room.js -m -o ../custom/room.min.js
call uglifyjs register.js -m -o ../custom/register.min.js
call uglifyjs loading.js -m -o ../custom/loading.min.js
pause