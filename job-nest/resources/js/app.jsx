import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './pages/App';
import '../css/app.css'
import "@fortawesome/fontawesome-free/css/all.min.css";

const root = createRoot(document.getElementById('app'));
root.render(<App />);