// redux

import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { createWrapper } from "next-redux-wrapper";

// reducers
import { setHotBoards } from "./reducers/setHotBoards.rdc";
const reducers = combineReducers({
  setHotBoards,
});

// middlewares
const middlewares = [thunk];

// store
export const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(...middlewares))
);

const makeStore = () => store;

export const wrapper = createWrapper(makeStore);
