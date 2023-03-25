import React from "react";
import ReactDOM from 'react-dom/client';
import { Provider } from "react-redux";

import "./index.css";
import App from "./App";
import store from "./redux/store";
import { BrowserRouter } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <ChakraProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ChakraProvider>
    </Provider>
  </React.StrictMode>
);