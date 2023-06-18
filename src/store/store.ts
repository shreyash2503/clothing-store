import {
  compose,
  legacy_createStore,
  applyMiddleware,
  Middleware,
} from "redux";
import logger from "redux-logger";
import { rootReducer } from "./root-reducer";
//! redux Persist
import { persistStore, persistReducer, PersistConfig } from "redux-persist";
import storage from "redux-persist/lib/storage";
//import thunk from "redux-thunk";
import createSagaMiddleware from "redux-saga";
import { rootSaga } from "./root-saga";

//! root-reducers ----> One big Reducer
export type RootState = ReturnType<typeof rootReducer>;

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

type ExtendedPersistConfig = PersistConfig<RootState> & {
  whitelist?: (keyof RootState)[];
};
const persistConfig: ExtendedPersistConfig = {
  key: "root", //& root means we want to persist the whole store
  storage,
  blacklist: ["user"], //& Things we dont want to persist here user as we are already using firebase onAuthStateChangeListener
};
const sagaMiddleware = createSagaMiddleware();

const middleWares = [
  process.env.NODE_ENV === "development" && logger,
  sagaMiddleware,
].filter((middleware): middleware is Middleware => Boolean(middleware)); //* little library helpers that run before an action hits the reducer

const persistedReducer = persistReducer(persistConfig, rootReducer);

const composeEnchancers =
  (process.env.NODE_ENV !== "production" &&
    window &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;
const composedEnchancers = composeEnchancers(applyMiddleware(...middleWares));
export const store = legacy_createStore(
  persistedReducer,
  undefined,
  composedEnchancers
);
sagaMiddleware.run(rootSaga);
export const persistor = persistStore(store);
