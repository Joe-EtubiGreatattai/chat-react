import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './firebase/firebase';
import { ChakraProvider } from '@chakra-ui/react';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <ChakraProvider>
    <App />
  </ChakraProvider>
);

reportWebVitals();
