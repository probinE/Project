import { createStore, applyMiddleware } from 'redux';
import { persistStore } from 'redux-persist';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import Redux from "redux-thunk"
import RootReducer from './RootReducer';

//  const middleware = [logger];
//  export const store = createStore(RootReducer, applyMiddleware(...middleware));
export const store = createStore(RootReducer, applyMiddleware(thunk, logger, Redux),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
// export const store = createStore(RootReducer);
export const Persistor = persistStore(store)
export default { store, Persistor };