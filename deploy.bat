@echo off
set REPO=C:\Users\PC\Desktop\Richter Digitals\Richter Digital
set PROJECT=%REPO%\richterdigital-website\richterdigital

echo.
echo ============================================
echo   Richter Digital Deploy
echo ============================================
echo.

echo [1/5] Cache loeschen (erzwingt frischen Build)...
if exist "%PROJECT%\dist" rmdir /s /q "%PROJECT%\dist"
if exist "%PROJECT%\node_modules\.vite" rmdir /s /q "%PROJECT%\node_modules\.vite"
if exist "%PROJECT%\tsconfig.app.tsbuildinfo" del /q "%PROJECT%\tsconfig.app.tsbuildinfo"
if exist "%PROJECT%\tsconfig.node.tsbuildinfo" del /q "%PROJECT%\tsconfig.node.tsbuildinfo"
echo   OK

echo.
echo [2/5] Bilder nach public\images kopieren...
if not exist "%PROJECT%\public\images" mkdir "%PROJECT%\public\images"
xcopy /Y /I "%REPO%\images\*" "%PROJECT%\public\images\" > nul
if exist "%REPO%\images\arthur.jpg" (
  xcopy /Y /I "%REPO%\images\arthur.jpg" "%PROJECT%\public\images\" > nul
  echo   OK - inkl. arthur.jpg
) else (
  echo   OK - HINWEIS: arthur.jpg fehlt noch in images\
)
echo   OK

echo.
echo [3/5] npm run build (bitte warten ~30-60 Sek)...
cd /d "%PROJECT%"
call npm run build
if not exist "%PROJECT%\dist\index.html" (
    echo.
    echo   FEHLER: Build fehlgeschlagen - dist\index.html fehlt!
    echo   Lies die Fehlermeldung oben.
    pause
    exit /b 1
)
echo   OK - Build erfolgreich

echo.
echo [4/5] dist nach Repo-Root kopieren...
robocopy "%PROJECT%\dist" "%REPO%" /E /NFL /NDL /NJH /NJS
if not exist "%REPO%\app-ads.txt" (
    echo google.com, pub-3806787756785352, DIRECT, f08c47fec0942fa0 > "%REPO%\app-ads.txt"
)
echo   OK

echo.
echo [5/5] Git commit und push...
cd /d "%REPO%"
git add -A
git commit -m "Redesign: new hero, fixed animations, clean layout"
git push -f origin HEAD:main
echo   OK

echo.
echo ============================================
echo   FERTIG! Warte 2 Minuten, dann reload.
echo   https://richterdigital.pro
echo ============================================
echo.
pause
