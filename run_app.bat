
@echo off
echo Installing dependencies...
call npm install
echo Starting application...
call npm run dev -- --open
pause
