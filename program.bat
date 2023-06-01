@echo off
:restart
node -v > nul 2>&1
IF %ERRORLEVEL% EQU 0 (
    node app.js
) ELSE (
    echo Node.js is not installed. Please install Node.js and try again.
    pause
)
echo.
echo Press any key to restart the application...
pause > nul
goto restart
