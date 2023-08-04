// redux

import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { createWrapper } from "next-redux-wrapper";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

// reducers
import is18 from "./reducers/is18.rdc";
import scroll_position from "./reducers/scroll_position.rdc";
import hot_board from "./reducers/hot_board";
import board_data from "./reducers/board_data";

const reducer = combineReducers({
  is18,
  scroll_position,
  hot_board,
  board_data,
});

// persist
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["is18"],
};

const persistedReducer = persistReducer(persistConfig, reducer);

// middlewares
const middlewares = [thunk];

// store
export const store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(...middlewares))
);

const makeStore = () => store;

const wrapper = createWrapper(makeStore);
const persistor = persistStore(store);

export { wrapper, persistor };
