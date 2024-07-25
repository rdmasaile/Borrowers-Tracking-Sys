import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.bundle.min';

// import reportWebVitals from './reportWebVitals';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import { AuthProvider } from './context/authProvider';
import ScreenProvider from './components/ScreenProvider';

const root = createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
         <ScreenProvider>
            <Routes>
               <Route path="/*" element={<App />} />
            </Routes>
         </ScreenProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
