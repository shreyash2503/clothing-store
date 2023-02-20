import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
//import { UserProvider } from './context/user.context';
//import { CartDropdownProvider } from './context/cart-dropdown.context';
//import { CategoriesProvider } from './context/categories.context';
import { store, persistor } from './store/store';

import { PersistGate } from 'redux-persist/integration/react';


// !Category preview is same as dynamic Shop -----> Please Note



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store} >
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter >
          {/* <UserProvider> */}
          {/* <CategoriesProvider> */}
          {/* <CartDropdownProvider> */}
          <App />
          {/* </CartDropdownProvider> */}
          {/* </CategoriesProvider> */}
          {/* </UserProvider> */}
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
