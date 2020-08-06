import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { Provider } from 'react-redux';
import { applyMiddleware, createStore, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from 'redux/reducers/reducers';

import loggerMiddleware from 'redux/middleware/logger';
import monitorReducerEnhancer from 'redux/enhancers/monitorReducer';

import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { persistReducer } from 'redux-persist';
import localStorage from 'redux-persist/lib/storage';

const middlewareEnhancer = applyMiddleware(loggerMiddleware, thunkMiddleware);
const composedEnhancers = compose(middlewareEnhancer, monitorReducerEnhancer);

const persistConfig = {
  key: 'root',
  storage: localStorage,
  whitelist: ['address']
}

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(persistedReducer, undefined, composedEnhancers);
const persistor = persistStore(store);

ReactDOM.render(
  <Provider store={store}>
    <PersistGate
      loading={null}
      persistor={persistor}
    >
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
