#!/bin/bash

# Aditya-L1 CME Detection System Startup Script
# This script starts both the React frontend and FastAPI backend

echo "🚀 Starting Aditya-L1 CME Detection System..."

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is not installed. Please install Python 3.8+ first."
    exit 1
fi

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ Prerequisites check passed"

# Create backend directory if it doesn't exist
if [ ! -d "backend" ]; then
    echo "📁 Creating backend directory..."
    mkdir -p backend
fi

# Check if backend requirements are installed
if [ ! -f "backend/venv/bin/activate" ]; then
    echo "🐍 Setting up Python virtual environment..."
    cd backend
    python3 -m venv venv
    source venv/bin/activate
    pip install -r requirements.txt
    cd ..
else
    echo "✅ Python virtual environment already exists"
fi

# Install frontend dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "📦 Installing frontend dependencies..."
    npm install
else
    echo "✅ Frontend dependencies already installed"
fi

# Create .env file if it doesn't exist
if [ ! -f ".env" ]; then
    echo "⚙️ Creating environment configuration..."
    echo "VITE_API_URL=http://localhost:8000" > .env
    echo "✅ Environment file created"
fi

echo ""
echo "🎯 Starting services..."
echo ""

# Start backend in background
echo "🔧 Starting FastAPI backend..."
cd backend
source venv/bin/activate
python main.py &
BACKEND_PID=$!
cd ..

# Wait a moment for backend to start
sleep 3

# Start frontend
echo "🌐 Starting React frontend..."
npm run dev &
FRONTEND_PID=$!

echo ""
echo "✅ Services started successfully!"
echo ""
echo "📊 Frontend: http://localhost:5173"
echo "🔌 Backend API: http://localhost:8000"
echo "📚 API Docs: http://localhost:8000/docs"
echo ""
echo "Press Ctrl+C to stop all services"

# Function to cleanup on exit
cleanup() {
    echo ""
    echo "🛑 Stopping services..."
    kill $BACKEND_PID 2>/dev/null
    kill $FRONTEND_PID 2>/dev/null
    echo "✅ Services stopped"
    exit 0
}

# Set up signal handlers
trap cleanup SIGINT SIGTERM

# Wait for background processes
wait 