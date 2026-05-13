import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import PrivacyNotice from './components/PrivacyNotice.jsx'
import MZTestimonialCarousel from './components/MZTestimonialCarousel.jsx'
import BlendedStatsSection from './components/BlendedStatsSection.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    <BlendedStatsSection />
    <MZTestimonialCarousel />
    <PrivacyNotice />
  </React.StrictMode>,
)