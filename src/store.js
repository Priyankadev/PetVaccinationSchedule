import { createStore, applyMiddleware } from "redux";

import thunk from "redux-thunk";
import getRootReducer from "./reducers";

export default function getStore(navReducer) {
    const store = createStore(
        getRootReducer(navReducer),
        applyMiddleware(thunk)
    );

    return store;
}