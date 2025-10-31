import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";

import {
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'


import storage from 'redux-persist/lib/storage'
import postSlice from "./postSlice";
import socketSlice from "./messageSlice/socketSlice";
import chatSlice from "./messageSlice/chatSlice";
import RTNotification from "./notification/RTNotification";

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
}



const rootReducer = combineReducers({
    auth: authSlice,
    post:postSlice,
    socketio:socketSlice,
    chat:chatSlice,
    realTimeNotification:RTNotification,
})
const persistedReducer = persistReducer(persistConfig, rootReducer)
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
})

export default store;