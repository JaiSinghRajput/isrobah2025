# ISRO Hackathon Project Structure

This document outlines the organized structure of the ISRO Hackathon project for the Aditya Halo Alert system.

## 📁 Project Organization

```
ISRO Hackathon/
├── 📁 frontend/                 # React/TypeScript Frontend Application
│   ├── 📁 src/                  # Source code
│   │   ├── 📁 components/       # React components
│   │   ├── 📁 pages/           # Page components
│   │   ├── 📁 hooks/           # Custom React hooks
│   │   ├── 📁 lib/             # Utility libraries
│   │   ├── App.tsx             # Main App component
│   │   ├── App.css             # App styles
│   │   ├── main.tsx            # Entry point
│   │   └── index.css           # Global styles
│   ├── 📁 public/              # Static assets
│   ├── package.json            # Node.js dependencies
│   ├── package-lock.json       # Locked dependencies
│   ├── bun.lockb               # Bun lock file
│   ├── tsconfig.json           # TypeScript configuration
│   ├── vite.config.ts          # Vite build configuration
│   ├── tailwind.config.ts      # Tailwind CSS configuration
│   ├── postcss.config.js       # PostCSS configuration
│   ├── components.json         # UI components configuration
│   ├── eslint.config.js        # ESLint configuration
│   └── index.html              # HTML template
│
├── 📁 backend/                  # Python FastAPI Backend
│   ├── main.py                 # FastAPI application
│   ├── requirements.txt        # Python dependencies
│   └── 📁 venv/               # Virtual environment
│
├── 📁 scripts/                  # Python Data Processing Scripts
│   ├── cactus_scraper.py       # CACTUS CME database scraper
│   ├── swis_data_loader.py     # SWIS data loading utilities
│   ├── halo_cme_detector.py    # Halo CME detection algorithms
│   ├── data_validator.py       # Data validation utilities
│   ├── main.py                 # Main data processing script
│   ├── config.yaml             # Configuration file
│   └── requirements.txt        # Python dependencies for scripts
│
├── 📁 data/                     # Data Storage (Empty - for future use)
│   └── (Data files will be stored here)
│
├── 📁 docs/                     # Documentation
│   └── 📁 aditya-halo-alert/   # Project documentation
│       └── README.md           # Project overview
│
├── 📁 node_modules/             # Node.js dependencies (auto-generated)
├── 📁 __pycache__/             # Python cache (auto-generated)
├── 📁 .git/                    # Git repository
├── start.bat                   # Windows startup script
├── start.sh                    # Linux/Mac startup script
├── README.md                   # Main project README
└── .gitignore                  # Git ignore rules
```

## 🎯 Purpose of Each Directory

### Frontend (`/frontend`)
- **Purpose**: React/TypeScript web application for the user interface
- **Key Files**: 
  - `src/App.tsx` - Main application component
  - `src/components/` - Reusable UI components
  - `src/pages/` - Page-level components
  - `package.json` - Dependencies and scripts

### Backend (`/backend`)
- **Purpose**: FastAPI server providing REST API endpoints
- **Key Files**:
  - `main.py` - FastAPI application with endpoints
  - `requirements.txt` - Python dependencies

### Scripts (`/scripts`)
- **Purpose**: Data processing and analysis scripts
- **Key Files**:
  - `cactus_scraper.py` - Scrapes CME data from CACTUS database
  - `halo_cme_detector.py` - Detects halo CMEs using algorithms
  - `swis_data_loader.py` - Loads and processes SWIS data
  - `data_validator.py` - Validates data integrity
  - `config.yaml` - Configuration for all scripts

### Data (`/data`)
- **Purpose**: Storage for processed data files, datasets, and exports
- **Status**: Currently empty, ready for data storage

### Documentation (`/docs`)
- **Purpose**: Project documentation and guides
- **Contents**: 
  - `aditya-halo-alert/README.md` - Detailed project documentation

## 🚀 Getting Started

### Frontend Development
```bash
cd frontend
npm install
npm run dev
```

### Backend Development
```bash
cd backend
pip install -r requirements.txt
python main.py
```

### Data Processing Scripts
```bash
cd scripts
pip install -r requirements.txt
python main.py
```

## 📋 File Naming Conventions

- **Python files**: snake_case (e.g., `cactus_scraper.py`)
- **TypeScript/JavaScript files**: camelCase (e.g., `App.tsx`)
- **Configuration files**: kebab-case (e.g., `tailwind.config.ts`)
- **Directories**: kebab-case (e.g., `aditya-halo-alert`)

## 🔧 Configuration

- **Frontend**: Configured via `frontend/package.json` and various config files
- **Backend**: Configured via `backend/requirements.txt`
- **Scripts**: Configured via `scripts/config.yaml` and `scripts/requirements.txt`

## 📊 Data Flow

1. **Data Collection**: `scripts/cactus_scraper.py` → CACTUS database
2. **Data Processing**: `scripts/halo_cme_detector.py` → Analysis algorithms
3. **Data Validation**: `scripts/data_validator.py` → Quality checks
4. **API Serving**: `backend/main.py` → REST endpoints
5. **UI Display**: `frontend/src/` → User interface

This organization provides a clean separation of concerns, making the project easier to maintain, develop, and deploy. 