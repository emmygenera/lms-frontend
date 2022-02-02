import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { Auth, Menu, General } from "./reducers";
import autoMergeLevel2 from "redux-persist/es/stateReconciler/autoMergeLevel2";
import globals from "./reducers/globals";

const Store = () => {
  const persistConfig = {
    key: "root",
    storage: storage,
    reconciliation: autoMergeLevel2,
    whitelist: ["auth", "menu"],
  };
  const pertReducer = persistReducer(
    persistConfig,
    combineReducers({ auth: Auth, menu: Menu, globals, general: General })
  );
  const middleWare = applyMiddleware(thunk);
  return createStore(pertReducer, middleWare);
};

export default Store;
