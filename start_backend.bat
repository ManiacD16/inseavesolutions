@echo off
title PHP Backend Server (Port 8001)
echo =======================================================
echo           STARTING INSEAVESOLUTIONS BACKEND             
echo =======================================================
echo.
echo PHP Path: C:\xampp\php\php.exe
echo Address:  http://localhost:8001
echo.
echo Press Ctrl+C in this window to stop the server.
echo.
echo -------------------------------------------------------

"C:\xampp\php\php.exe" -S localhost:8001 -t server_php server_php/router.php

pause
