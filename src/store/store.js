import { compose, createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import thunk from 'redux-thunk'
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { rootReducer } from "./root-reducer";
import createSagaMiddleware from "@redux-saga/core";
import { rootSaga } from "./root-saga";
// const loggerMiddleware =(store)=> (next) =>(action)=>{
//     if(!action.type){
//         return next(action)
//     }
//     next(action)
// }

const persistConfig = {
  key: "root",
  storage: storage,
  whiteList: ["cart"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);


const sagaMiddleware= createSagaMiddleware();
const middlewares = [process.env.NODE_ENV !== "production" && logger, sagaMiddleware].filter(
  Boolean
);

const composeEnhancer =
(  process.env.NODE_ENV !== "production" &&
  window &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ )|| compose
const composedEnhancers = composeEnhancer(applyMiddleware(...middlewares));
export const store = createStore(
  persistedReducer,
  undefined,
  composedEnhancers
);



sagaMiddleware.run(rootSaga)
export const persistor = persistStore(store);

