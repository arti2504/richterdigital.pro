@echo off
setlocal EnableDelayedExpansion
set REPO_ROOT=C:\Users\PC\Desktop\Richter Digitals\Richter Digital
set PROJECT_DIR=%REPO_ROOT%\richterdigital-website\richterdigital

echo ============================================
echo   Richter Digital - Build ^& Deploy Script
echo ============================================
echo.

REM ---- Step 1: Copy images to public folder ----
echo [1/5] Copying images into Vite public folder...
if not exist "%PROJECT_DIR%\public\images" mkdir "%PROJECT_DIR%\public\images"
xcopy /Y /I "%REPO_ROOT%\images\*" "%PROJECT_DIR%\public\images\" >nul 2>&1
if %ERRORLEVEL% neq 0 (
  echo   ERROR: Could not copy images.
  pause
  exit /b 1
)
echo   OK - Images copied to public\images\

REM ---- Step 2: npm build ----
echo.
echo [2/5] Building website (npm run build)...
cd /d "%PROJECT_DIR%"
call npm run build
if %ERRORLEVEL% neq 0 (
  echo   BUILD FAILED. Fix TypeScript errors above and retry.
  pause
  exit /b 1
)
echo   OK - Build complete.

REM ---- Step 3: Copy dist to repo root ----
echo.
echo [3/5] Deploying dist\ to repo root...
robocopy "%PROJECT_DIR%\dist" "%REPO_ROOT%" /E /NFL /NDL /NJH /NJS /nc /ns /np >nul 2>&1
echo   OK - dist\ copied to repo root.

REM ---- Step 4: Verify app-ads.txt ----
echo.
echo [4/5] Checking app-ads.txt...
if not exist "%REPO_ROOT%\app-ads.txt" (
  echo   WARNING: app-ads.txt missing at repo root! Creating...
  echo google.com, pub-3806787756785352, DIRECT, f08c47fec0942fa0 > "%REPO_ROOT%\app-ads.txt"
)
echo   OK - app-ads.txt present.

REM ---- Step 5: Git commit and push ----
echo.
echo [5/5] Pushing to GitHub...
cd /d "%REPO_ROOT%"
git add -A
git commit -m "Fix website: images, hero, placeholders, UI"
git push -f origin master:main
if %ERRORLEVEL% neq 0 (
  echo   PUSH FAILED - check your git credentials or internet connection.
  pause
  exit /b 1
)

echo.
echo ============================================
echo   DONE! Website is deploying to GitHub.
echo   It will be live in ~1-2 minutes at:
echo   https://richterdigital.pro
echo ============================================
pause
