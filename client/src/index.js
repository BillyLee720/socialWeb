import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import authReducer from './state';
import { configureStore } from '@reduxjs/toolkit'; //用於創建Redux Store的函數
import { Provider } from 'react-redux'; //將Redux Store用進React
import {
  persistStore, //創建持久化存儲的Redux Store
  persistReducer, //配置持久化存儲的reducer
  FLUSH, //FLUCH-REGISTER -> action types 用於控制持久化存儲的動作
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage'; //是 Redux Persist 使用的儲存引擎，默認使用localStorage
import { PersistGate } from 'redux-persist/integration/react'; //用於包裹React，確認數據恢復後才渲染

const persistConfig = { key: 'root', storage, version: 1 };
const persistReducer = persistReducer(persistConfig, authReducer);
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
