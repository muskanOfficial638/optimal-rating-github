import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { auth, global } from "./reducers";

// Combine reducers
const reducer = combineReducers({ auth, global });

// Redux Persist configuration
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'],
};

// Persisted reducer
const persistedReducer = persistReducer(persistConfig, reducer);

// Redux DevTools extension configuration
const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose; 

// Create the store
let store;

// Apply middleware based on environment
if (process.env.NODE_ENV === "development") {
  store = createStore(
    persistedReducer,
    composeEnhancers(applyMiddleware(thunk, logger))
  );
} else {
  store = createStore(persistedReducer, applyMiddleware(thunk));
}

// Create the persistor
export const persistor = persistStore(store);
export default store;
