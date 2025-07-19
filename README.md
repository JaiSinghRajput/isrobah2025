🚀 Aditya-L1 CME Detection System
A comprehensive web application for detecting Halo Coronal Mass Ejection (CME) events using SWIS-ASPEX data from the Aditya-L1 mission. This system integrates Python-based data analysis with a modern React frontend to provide real-time CME detection and analysis capabilities.

📋 Table of Contents

🌟 Overview
✨ Features
🏗️ Architecture
📁 Project Structure
🚀 Installation
📖 Usage
🔌 API Documentation
📊 Data Sources
🤝 Contributing
📄 License
🙏 Acknowledgments
📞 Support


🌟 Overview
The Sun emits a continuous stream of charged particles known as the solar wind, which shapes the interplanetary environment. Occasionally, massive eruptions called Coronal Mass Ejections (CMEs), particularly halo CMEs, are launched from the Sun. These events can disrupt Earth's magnetosphere, impacting satellites, power grids, and communication systems.
This project leverages SWIS (Solar Wind Ion Spectrometer) Level-2 data from the ASPEX payload on Aditya-L1 to detect and characterize halo CME events. By analyzing variations in solar wind parameters like flux, density, temperature, and velocity, we provide an early warning system for space weather events.

✨ Features
🔬 Data Analysis

SWIS Data Processing: Load and preprocess SWIS Level-2 CDF files.
CME Detection: Advanced algorithms to identify halo CME events.
Threshold Optimization: Automatically optimize detection parameters.
Performance Validation: Comprehensive metrics for accuracy assessment.

📊 Real-time Monitoring

Live Data Visualization: Real-time charts for particle data trends.
CME Event Tracking: Monitor and track detected CME events.
System Health Monitoring: Real-time system status and data quality metrics.
Alert System: Automated alerts for significant CME events.

🎛️ Configuration Management

Threshold Configuration: Adjustable detection sensitivity parameters.
Analysis Settings: Configurable analysis windows and parameters.
Data Import/Export: Upload SWIS files and export analysis results.
Performance Tuning: Fine-tune detection algorithms for accuracy.

🌐 Web Interface

Modern UI: Responsive React-based interface with a space theme.
Interactive Charts: Real-time visualization using Chart.js.
Multi-tab Layout: Organized sections for data, detection, and configuration.
Mobile Responsive: Seamless experience on desktop and mobile devices.


🏗️ Architecture
The system follows a modern full-stack architecture:
graph TD
    A[React Frontend] -->|REST API| B[FastAPI Backend]
    B -->|Data Processing| C[Python Analysis]
    A -->|Real-time UI| D[Data Charts]
    A -->|Configuration| E[Export Tools]
    B -->|CORS Support| F[File Upload]
    C -->|SWIS Loader| G[CME Detector]
    C -->|CACTUS Scraper| H[Threshold Optimization]

Frontend (React + TypeScript)

Framework: React 18 with TypeScript
Styling: Tailwind CSS with a custom space theme
State Management: React Query for server-state synchronization
UI Components: Custom library with shadcn/ui
Charts: Chart.js for interactive data visualization

Backend (FastAPI + Python)

Framework: FastAPI for high-performance APIs
Data Processing: Pandas, NumPy, SciPy
Machine Learning: Scikit-learn for threshold optimization
CDF Support: SpacePy and cdflib for CDF file handling
Visualization: Matplotlib and Plotly for data plotting

Analysis Modules

SWIS Data Loader: Handles CDF file loading and preprocessing
CME Detector: Core algorithms for halo CME detection
CACTUS Scraper: Fetches CME catalog data for validation
Data Validator: Ensures data quality and integrity


📁 Project Structure
The project is organized for clarity and maintainability:
ISRO Hackathon/
├── 📁 frontend/                 # React/TypeScript Frontend
│   ├── 📁 src/                 # Source code and components
│   │   ├── 📁 components/      # UI components
│   │   ├── 📁 lib/            # Utilities and API
│   │   ├── 📁 pages/          # Page components
│   │   └── 📁 hooks/          # Custom React hooks
│   ├── 📁 public/             # Static assets
│   └── vite.config.ts         # Vite configuration
├── 📁 backend/                  # FastAPI Backend
│   ├── main.py                 # API server
│   └── requirements.txt        # Python dependencies
├── 📁 scripts/                  # Data Processing Scripts
│   ├── cactus_scraper.py       # CACTUS CME database scraper
│   ├── swis_data_loader.py     # SWIS data loading utilities
│   ├── halo_cme_detector.py    # Halo CME detection algorithms
│   ├── data_validator.py       # Data quality validation
│   ├── main.py                 # Main processing script
│   ├── config.yaml             # Configuration file
│   └── requirements.txt        # Script dependencies
├── 📁 data/                     # Processed data storage
├── 📁 docs/                     # Documentation
│   └── 📁 aditya-halo-alert/   # Project documentation
├── start.bat                   # Windows startup script
├── start.sh                    # Linux/Mac startup script
└── README.md                   # Main project README

For details, see PROJECT_STRUCTURE.md.

🚀 Installation
Prerequisites

Node.js 18+ and npm
Python 3.8+
Git

Frontend Setup
# Clone the repository
git clone https://github.com/Karann1101/Identifying-HALO-CME-Events-based-on-Particle-Data.git
cd Identifying-HALO-CME-Events-based-on-Particle-Data

# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev

Backend Setup
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Start FastAPI server
python main.py

Data Processing Scripts Setup
# Navigate to scripts directory
cd scripts

# Install dependencies
pip install -r requirements.txt

# Run data processing (optional)
python main.py

Environment Configuration
Create a .env file in the root directory:
VITE_API_URL=http://localhost:8000

Quick Start

Windows: Run start.bat
Linux/Mac: Run ./start.sh


📖 Usage
1. Data Import

Navigate to the Data tab.
Upload SWIS Level-2 CDF files using the drag-and-drop interface.
Monitor upload progress and data quality metrics.

2. CME Detection

Go to the CME Detection tab.
Set the analysis date range and parameters.
Click Start Analysis to run detection algorithms.
Review detected CME events and performance metrics.

3. Threshold Configuration

Access the Thresholds tab.
Adjust detection sensitivity parameters.
Use Optimize Thresholds for automatic tuning.
Save configuration for future use.

4. Data Visualization

Visit the Particle Data tab.
Select parameters (velocity, density, temperature, flux).
Choose the time range for analysis.
Monitor real-time data trends and anomalies.


🔌 API Documentation
Core Endpoints
Health Check
GET /health

Returns system health status and component availability.
Data Summary
GET /api/data/summary

Provides an overview of data coverage and system status.
CME Analysis
POST /api/analyze
Content-Type: application/json

{
  "start_date": "2024-08-01",
  "end_date": "2024-12-31",
  "analysis_type": "full"
}

Threshold Optimization
POST /api/thresholds/optimize
Content-Type: application/json

{
  "velocity_enhancement": 2.5,
  "density_enhancement": 2.0,
  "temperature_anomaly": 2.0,
  "combined_score_threshold": 2.0
}

File Upload
POST /api/data/upload
Content-Type: multipart/form-data

file: [CDF file]

Particle Data
GET /api/charts/particle-data

Returns time-series data for visualization.
Response Formats
Analysis Result
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


📊 Data Sources
SWIS-ASPEX Data

Source: Aditya-L1 mission, ASPEX payload
Format: CDF (Common Data Format) files
Parameters: Particle flux, density, temperature, velocity
Availability: From August 2024 onwards
Access: ISSDC (Indian Space Science Data Centre)

CACTUS CME Database

Source: SIDC (Solar Influences Data Analysis Center)
Content: Halo CME event catalog
Parameters: Speed, angular width, source location
URL: CACTUS Database

Data Processing Pipeline

Data Loading: Load CDF files using SpacePy/cdflib.
Preprocessing: Filter quality issues, remove outliers, and interpolate data.
Feature Extraction: Compute moving averages, gradients, and derived parameters.
CME Detection: Apply statistical analysis and machine learning.
Validation: Cross-reference with CACTUS database.


🤝 Contributing
We welcome contributions! Follow these steps:

Fork the repository.
Create a feature branch (git checkout -b feature/amazing-feature).
Commit your changes (git commit -m 'Add amazing feature').
Push to the branch (git push origin feature/amazing-feature).
Open a Pull Request.

Development Guidelines

Follow existing code style and patterns.
Add tests for new functionality.
Update documentation for API changes.
Ensure mobile responsiveness.
Test with real SWIS data when possible.


📄 License
This project is licensed under the MIT License - see the LICENSE file for details.

🙏 Acknowledgments

ISRO for the Aditya-L1 mission and SWIS-ASPEX data.
SIDC for the CACTUS CME database.
NASA SPDF for CDF library tools.
Open Source Community for amazing tools and libraries.


📞 Support
For questions, issues, or contributions:

Email: jaisinghmitrc@gmail.com
GitHub Issues: Submit an Issue


Built with ❤️ for space weather research and early warning systems
