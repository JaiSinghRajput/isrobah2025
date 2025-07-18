# 🚀 Aditya-L1 CME Detection System

A comprehensive web application for detecting Halo Coronal Mass Ejection (CME) events using SWIS-ASPEX data from the Aditya-L1 mission. This system integrates Python-based data analysis with a modern React frontend to provide real-time CME detection and analysis capabilities.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Data Sources](#data-sources)
- [Contributing](#contributing)
- [License](#license)

## 🌟 Overview

The Sun emits a continuous stream of charged particles known as the solar wind, which significantly influences the interplanetary environment. Occasionally, massive eruptions called **Coronal Mass Ejections (CMEs)** — particularly **halo CMEs** — are launched from the Sun and can disrupt Earth's magnetosphere, affecting satellites, power grids, and communication systems.

This project leverages **SWIS (Solar Wind Ion Spectrometer)** Level-2 data from the **ASPEX payload onboard Aditya-L1** to detect and characterize halo CME events. By analyzing variations in solar wind parameters such as flux, density, temperature, and velocity, we aim to build a reliable detection model to serve as an early warning system.

## ✨ Features

### 🔬 Data Analysis
- **SWIS Data Processing**: Load and preprocess SWIS Level-2 CDF files
- **CME Detection**: Advanced algorithms for identifying halo CME events
- **Threshold Optimization**: Automatic optimization of detection parameters
- **Performance Validation**: Comprehensive validation metrics and accuracy assessment

### 📊 Real-time Monitoring
- **Live Data Visualization**: Real-time particle data charts and trends
- **CME Event Tracking**: Monitor and track detected CME events
- **System Health Monitoring**: Real-time system status and data quality metrics
- **Alert System**: Automated alerts for significant CME events

### 🎛️ Configuration Management
- **Threshold Configuration**: Adjustable detection sensitivity parameters
- **Analysis Settings**: Configurable analysis windows and parameters
- **Data Import/Export**: Upload SWIS files and export analysis results
- **Performance Tuning**: Fine-tune detection algorithms

### 🌐 Web Interface
- **Modern UI**: Beautiful, responsive React-based interface
- **Interactive Charts**: Real-time data visualization with Chart.js
- **Multi-tab Layout**: Organized sections for different functionalities
- **Mobile Responsive**: Works seamlessly on desktop and mobile devices

## 🏗️ Architecture

The system is built with a modern full-stack architecture:

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   React Frontend │    │  FastAPI Backend │    │  Python Analysis │
│                 │    │                 │    │                 │
│ • Real-time UI  │◄──►│ • REST API      │◄──►│ • SWIS Loader   │
│ • Data Charts   │    │ • CORS Support  │    │ • CME Detector  │
│ • Configuration │    │ • File Upload   │    │ • CACTUS Scraper│
│ • Export Tools  │    │ • Data Processing│   │ • Threshold Opt │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### Frontend (React + TypeScript)
- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom space theme
- **State Management**: React Query for server state
- **UI Components**: Custom component library with shadcn/ui
- **Charts**: Chart.js for data visualization

### Backend (FastAPI + Python)
- **Framework**: FastAPI for high-performance API
- **Data Processing**: Pandas, NumPy, SciPy
- **Machine Learning**: Scikit-learn for threshold optimization
- **CDF Support**: SpacePy and cdflib for CDF file handling
- **Visualization**: Matplotlib, Plotly for data plotting

### Analysis Modules
- **SWIS Data Loader**: Handles CDF file loading and preprocessing
- **CME Detector**: Core detection algorithms and analysis
- **CACTUS Scraper**: Fetches CME catalog data
- **Data Validator**: Ensures data quality and integrity

## 📁 Project Structure

The project is organized into logical directories for better maintainability:

```
ISRO Hackathon/
├── 📁 frontend/                 # React/TypeScript Frontend Application
│   ├── 📁 src/                  # Source code and components
│   ├── 📁 public/              # Static assets
│   └── [config files]          # Build and dependency configuration
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
├── 📁 data/                     # Data Storage (for processed data)
├── 📁 docs/                     # Documentation
│   └── 📁 aditya-halo-alert/   # Project documentation
│
├── start.bat                   # Windows startup script
├── start.sh                    # Linux/Mac startup script
└── README.md                   # Main project README
```

For detailed information about the project structure, see [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md).

## 🚀 Installation

### Prerequisites
- Node.js 18+ and npm
- Python 3.8+
- Git

### Frontend Setup
```bash
# Clone the repository
git clone https://github.com/Karann1101/Identifying-HALO-CME-Events-based-on-Particle-Data.git
cd Identifying-HALO-CME-Events-based-on-Particle-Data

# Navigate to frontend directory
cd frontend

# Install frontend dependencies
npm install

# Start development server
npm run dev
```

### Backend Setup
```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install Python dependencies
pip install -r requirements.txt

# Start FastAPI server
python main.py
```

### Data Processing Scripts Setup
```bash
# Navigate to scripts directory
cd scripts

# Install Python dependencies for scripts
pip install -r requirements.txt

# Run data processing (optional)
python main.py
```

### Environment Configuration
Create a `.env` file in the root directory:
```env
VITE_API_URL=http://localhost:8000
```

### Quick Start
Use the provided startup scripts:
- **Windows**: Run `start.bat`
- **Linux/Mac**: Run `./start.sh`

## 📖 Usage

### 1. Data Import
1. Navigate to the "Data" tab
2. Upload SWIS Level-2 CDF files using the drag-and-drop interface
3. Monitor upload progress and data quality metrics

### 2. CME Detection
1. Go to the "CME Detection" tab
2. Set analysis date range and parameters
3. Click "Start Analysis" to run detection algorithms
4. Review detected CME events and performance metrics

### 3. Threshold Configuration
1. Access the "Thresholds" tab
2. Adjust detection sensitivity parameters
3. Use "Optimize Thresholds" for automatic parameter tuning
4. Save configuration for future use

### 4. Data Visualization
1. Visit the "Particle Data" tab
2. Select parameters to visualize (velocity, density, temperature, flux)
3. Choose time range for analysis
4. Monitor real-time data trends and anomalies

## 🔌 API Documentation

### Core Endpoints

#### Health Check
```http
GET /health
```
Returns system health status and component availability.

#### Data Summary
```http
GET /api/data/summary
```
Returns overview of data coverage and system status.

#### CME Analysis
```http
POST /api/analyze
Content-Type: application/json

{
  "start_date": "2024-08-01",
  "end_date": "2024-12-31",
  "analysis_type": "full"
}
```

#### Threshold Optimization
```http
POST /api/thresholds/optimize
Content-Type: application/json

{
  "velocity_enhancement": 2.5,
  "density_enhancement": 2.0,
  "temperature_anomaly": 2.0,
  "combined_score_threshold": 2.0
}
```

#### File Upload
```http
POST /api/data/upload
Content-Type: multipart/form-data

file: [CDF file]
```

#### Particle Data
```http
GET /api/charts/particle-data
```
Returns time-series data for visualization.

### Response Formats

#### Analysis Result
```json
{
  "cme_events": [
    {
      "datetime": "2024-12-25T14:30:00Z",
      "speed": 1200,
      "angular_width": 360,
      "source_location": "N15W45",
      "estimated_arrival": "2024-12-26T08:15:00Z",
      "confidence": 0.85
    }
  ],
  "thresholds": {
    "velocity_enhancement": 2.5,
    "density_enhancement": 2.0,
    "temperature_anomaly": 2.0,
    "combined_score_threshold": 2.0
  },
  "performance_metrics": {
    "accuracy": 0.925,
    "precision": 0.89,
    "recall": 0.94
  },
  "data_summary": {
    "total_records": 10000,
    "date_range": "2024-08-01 to 2024-12-31",
    "cme_events_count": 5,
    "data_coverage": "98.7%"
  }
}
```

## 📊 Data Sources

### SWIS-ASPEX Data
- **Source**: Aditya-L1 mission, ASPEX payload
- **Format**: CDF (Common Data Format) files
- **Parameters**: Particle flux, density, temperature, velocity
- **Availability**: From August 2024 onwards
- **Access**: ISSDC (Indian Space Science Data Centre)

### CACTUS CME Database
- **Source**: SIDC (Solar Influences Data Analysis Center)
- **Content**: Halo CME event catalog
- **Parameters**: Speed, angular width, source location
- **URL**: http://sidc.oma.be/cactus/

### Data Processing Pipeline
1. **Data Loading**: CDF files loaded using SpacePy/cdflib
2. **Preprocessing**: Quality filtering, outlier removal, interpolation
3. **Feature Extraction**: Moving averages, gradients, derived parameters
4. **CME Detection**: Statistical analysis and machine learning
5. **Validation**: Cross-reference with CACTUS database

## 🔧 Development

### Project Structure
```
├── frontend/              # React/TypeScript Frontend
│   ├── src/              # Source code
│   │   ├── components/   # UI components
│   │   ├── lib/         # Utilities and API
│   │   ├── pages/       # Page components
│   │   └── hooks/       # Custom React hooks
│   ├── public/          # Static assets
│   └── [config files]   # Build configuration
├── backend/              # FastAPI Backend
│   ├── main.py          # API server
│   └── requirements.txt # Python dependencies
├── scripts/              # Data Processing Scripts
│   ├── swis_data_loader.py   # SWIS data processing
│   ├── halo_cme_detector.py  # CME detection algorithms
│   ├── cactus_scraper.py     # CACTUS data fetching
│   ├── data_validator.py     # Data quality validation
│   ├── main.py               # Main processing script
│   ├── config.yaml           # Configuration file
│   └── requirements.txt      # Script dependencies
├── data/                 # Data storage
├── docs/                 # Documentation
└── [startup scripts]     # Quick start scripts
```

### Adding New Features
1. **Frontend**: Add components in `frontend/src/components/`
2. **Backend**: Extend API endpoints in `backend/main.py`
3. **Analysis**: Implement algorithms in `scripts/` modules
4. **Testing**: Add tests for new functionality

### Code Style
- **Frontend**: ESLint + Prettier configuration
- **Backend**: Black + isort for Python formatting
- **TypeScript**: Strict type checking enabled
- **Documentation**: JSDoc for functions and components

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Development Guidelines
- Follow existing code style and patterns
- Add tests for new functionality
- Update documentation for API changes
- Ensure mobile responsiveness
- Test with real SWIS data when possible

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **ISRO** for the Aditya-L1 mission and SWIS-ASPEX data
- **SIDC** for providing the CACTUS CME database
- **NASA SPDF** for CDF library tools
- **Open Source Community** for the amazing tools and libraries

## 📞 Support

For questions, issues, or contributions:
- **Issues**: [GitHub Issues](https://github.com/Karann1101/Identifying-HALO-CME-Events-based-on-Particle-Data/issues)
- **Discussions**: [GitHub Discussions](https://github.com/Karann1101/Identifying-HALO-CME-Events-based-on-Particle-Data/discussions)
- **Email**: [Your Email]

---

**Built with ❤️ for space weather research and early warning systems**#   A d i t y a _ L 1  
 