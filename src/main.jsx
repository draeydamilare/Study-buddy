import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from './app/store';
import { BrowserRouter } from "react-router";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <ToastContainer position='top-center' hideProgressBar />
        <App />
      </PersistGate>
    </Provider>
    </BrowserRouter>
  </StrictMode>,
)
