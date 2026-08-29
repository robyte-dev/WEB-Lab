# Web II - Public REST API Frontend & State Management Project

A React Web Application built for Web Technologies II. This project demonstrates frontend integration with public REST APIs, modular component architecture, and React state management.

---

## Features

### 1. Public REST API Showcase
- **Weather API (Open-Meteo)**: Real-time global weather forecast, hourly/daily metrics, and debounced city search without API keys.
- **Photo Gallery API (Picsum Photos)**: Curated photo gallery with pagination controls, author attributions, high-resolution preview lightbox, and direct image download actions.
- **Location & IP Geolocation API (IPAPI & OpenStreetMap Nominatim)**: Automatic client IP geolocation detection combined with global address geocoding.
- **API Documentation & Inspector**: Interactive slide-over drawer displaying live endpoint URLs, request parameters, sample JSON responses, and backend migration guides.

### 2. User Management & Authentication Practice
- Interactive login and registration forms with validation and state persistence.
- User management controls and role-based interface views.

### 3. Contact Information Cards
- Dynamic contact profile cards demonstrating component props passing and structured UI layouts.

---

## Technical Stack

- **Frontend Library**: React 19
- **Build Tool**: Vite
- **Styling**: Tailwind CSS v4
- **Icon Library**: Lucide React

---

## Project Structure

```text
my-app/
├── public/
├── src/
│   ├── assets/
│   ├── Components/
│   │   ├── ApiExplorer/
│   │   │   ├── Common/
│   │   │   │   ├── ApiDocsDrawer.jsx
│   │   │   │   ├── ErrorMessage.jsx
│   │   │   │   └── LoadingSpinner.jsx
│   │   │   ├── Location/
│   │   │   │   ├── IpLocationCard.jsx
│   │   │   │   ├── LocationMapCard.jsx
│   │   │   │   ├── LocationSearch.jsx
│   │   │   │   └── LocationWidget.jsx
│   │   │   ├── PhotoGallery/
│   │   │   │   ├── PhotoCard.jsx
│   │   │   │   ├── PhotoFilter.jsx
│   │   │   │   ├── PhotoGalleryWidget.jsx
│   │   │   │   ├── PhotoGrid.jsx
│   │   │   │   └── PhotoLightboxModal.jsx
│   │   │   ├── Weather/
│   │   │   │   ├── WeatherCurrentCard.jsx
│   │   │   │   ├── WeatherForecastList.jsx
│   │   │   │   ├── WeatherMetricsGrid.jsx
│   │   │   │   ├── WeatherSearch.jsx
│   │   │   │   └── WeatherWidget.jsx
│   │   │   └── ApiExplorerHub.jsx
│   │   ├── Contact.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   └── usermanagement.jsx
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── package.json
├── README.md
└── vite.config.js
```

---

## Getting Started

### Prerequisites

Ensure Node.js (version 18 or higher) and npm are installed on your machine.

### Installation

1. Navigate to the project directory:
   ```bash
   cd my-app
   ```

2. Install project dependencies:
   ```bash
   npm install
   ```

### Running the Development Server

Start the Vite development server:
```bash
npm run dev
```

Open your browser and navigate to `http://localhost:5173`.

### Available Scripts

- `npm run dev`: Starts the local development server with Hot Module Replacement (HMR).
- `npm run build`: Compiles the project assets for production deployment.
- `npm run preview`: Previews the compiled production build locally.
- `npm run lint`: Executes code linting using Oxlint.

---

## Modular Component Guidelines for Custom Backend Integration

Each API section is divided into modular, single-responsibility sub-components. When transitioning to custom private REST APIs in backend assignments:

1. Update the API endpoint URL in the corresponding Widget component (for example, `WeatherWidget.jsx`).
2. Map your backend JSON response fields to the existing sub-components.
3. The presentational sub-components remain unchanged due to decoupled component architecture.
