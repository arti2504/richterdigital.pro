@echo off
setlocal
set REPO=C:\Users\PC\Desktop\Richter Digitals\Richter Digital
set PROJECT=%REPO%\richterdigital-website\richterdigital

set MELDUNG=%~1
if "%MELDUNG%"=="" set MELDUNG=Website aktualisiert

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
echo [2/5] Stand vom Server holen...
cd /d "%REPO%"
git pull --rebase origin main
if errorlevel 1 (
    echo.
    echo   FEHLER: git pull fehlgeschlagen. Erst aufloesen, dann neu starten.
    pause
    exit /b 1
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
echo [4/5] dist in die Repo-Wurzel spiegeln...
rem Die Quelle der Wahrheit fuer Bilder ist public\images im Projekt.
rem Frueher wurden hier die veroeffentlichten Bilder zurueckkopiert, dadurch
rem kamen geloeschte und unkomprimierte Dateien immer wieder zurueck.
rem /MIR raeumt alte Dateien mit weg, aber nur in diesen drei Ordnern,
rem niemals in der Wurzel selbst (dort liegen .git, Quellcode und Skripte).
robocopy "%PROJECT%\dist\assets" "%REPO%\assets" /MIR /NFL /NDL /NJH /NJS
robocopy "%PROJECT%\dist\fonts"  "%REPO%\fonts"  /MIR /NFL /NDL /NJH /NJS
robocopy "%PROJECT%\dist\images" "%REPO%\images" /MIR /NFL /NDL /NJH /NJS
copy /Y "%PROJECT%\dist\index.html"  "%REPO%\index.html"  > nul
copy /Y "%PROJECT%\dist\robots.txt"  "%REPO%\robots.txt"  > nul
copy /Y "%PROJECT%\dist\sitemap.xml" "%REPO%\sitemap.xml" > nul
copy /Y "%PROJECT%\dist\CNAME"       "%REPO%\CNAME"       > nul
if not exist "%REPO%\app-ads.txt" (
    echo google.com, pub-3806787756785352, DIRECT, f08c47fec0942fa0 > "%REPO%\app-ads.txt"
)
echo   OK

echo.
echo [5/5] Git commit und push...
cd /d "%REPO%"
git add -A
git commit -m "%MELDUNG%"
git push origin HEAD:main
if errorlevel 1 (
    echo.
    echo   FEHLER: push abgelehnt. Meist liegt ein neuerer Stand auf GitHub.
    echo   Loesung: git pull --rebase origin main, dann deploy.bat erneut.
    pause
    exit /b 1
)
echo   OK

echo.
echo ============================================
echo   FERTIG! Warte 2 Minuten, dann reload.
echo   https://richterdigital.pro
echo ============================================
echo.
pause
