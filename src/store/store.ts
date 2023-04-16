import { compose, legacy_createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import { rootReducer } from "./root-reducer";
//! redux Persist
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
//import thunk from "redux-thunk";
import createSagaMiddleware from "redux-saga"
import { rootSaga } from "./root-saga";

//! root-reducers ----> One big Reducer
const sagaMiddleware = createSagaMiddleware();
const middleWares = [process.env.NODE_ENV === 'development' && logger, sagaMiddleware].filter(Boolean) //* little library helpers that run before an action hits the reducer

const persistConfig = {
    key: 'root',  //& root means we want to persist the whole store
    storage,
    blacklist: ['user'] //& Things we dont want to persist here user as we are already using firebase onAuthStateChangeListener
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

const composeEnchancers = (process.env.NODE_ENV !== 'production' && window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
const composedEnchancers = composeEnchancers(applyMiddleware(...middleWares));
export const store = legacy_createStore(persistedReducer, undefined, composedEnchancers);
sagaMiddleware.run(rootSaga);
export const persistor = persistStore(store);