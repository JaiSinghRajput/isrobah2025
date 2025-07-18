@echo off
REM Aditya-L1 CME Detection System Startup Script for Windows
REM This script starts both the React frontend and FastAPI backend

echo 🚀 Starting Aditya-L1 CME Detection System...

REM Check if Python is installed
python --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Python is not installed. Please install Python 3.8+ first.
    pause
    exit /b 1
)

REM Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js is not installed. Please install Node.js 18+ first.
    pause
    exit /b 1
)

REM Check if npm is installed
npm --version >nul 2>&1
if errorlevel 1 (
    echo ❌ npm is not installed. Please install npm first.
    pause
    exit /b 1
)

echo ✅ Prerequisites check passed

REM Create backend directory if it doesn't exist
if not exist "backend" (
    echo 📁 Creating backend directory...
    mkdir backend
)

REM Check if backend requirements are installed
if not exist "backend\venv\Scripts\activate.bat" (
    echo 🐍 Setting up Python virtual environment...
    cd backend
    python -m venv venv
    call venv\Scripts\activate.bat
    pip install -r requirements.txt
    cd ..
) else (
    echo ✅ Python virtual environment already exists
)

REM Install frontend dependencies if node_modules doesn't exist
if not exist "node_modules" (
    echo 📦 Installing frontend dependencies...
    npm install
) else (
    echo ✅ Frontend dependencies already installed
)

REM Create .env file if it doesn't exist
if not exist ".env" (
    echo ⚙️ Creating environment configuration...
    echo VITE_API_URL=http://localhost:8000 > .env
    echo ✅ Environment file created
)

echo.
echo 🎯 Starting services...
echo.

REM Start backend in background
echo 🔧 Starting FastAPI backend...
cd backend
start "Backend" cmd /k "venv\Scripts\activate.bat && python main.py"
cd ..

REM Wait a moment for backend to start
timeout /t 3 /nobreak >nul

REM Start frontend
echo 🌐 Starting React frontend...
start "Frontend" cmd /k "npm run dev"

echo.
echo ✅ Services started successfully!
echo.
echo 📊 Frontend: http://localhost:5173
echo 🔌 Backend API: http://localhost:8000
echo 📚 API Docs: http://localhost:8000/docs
echo.
echo Press any key to close this window...
pause >nul 