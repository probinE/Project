import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import { store, Persistor } from './ReduxStore/Store';
import { Provider } from 'react-redux';
import Redux from "redux-thunk"
import { PersistGate } from 'redux-persist/integration/react';

const app = (<Provider store={store}>
  <PersistGate persistor={Persistor}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </PersistGate>
</Provider>);

ReactDOM.render(app, document.getElementById('root'));

serviceWorker.unregister();