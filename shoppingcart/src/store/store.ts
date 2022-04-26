import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import { persistReducer } from 'redux-persist';
import sessionStorage from 'redux-persist/lib/storage';
import rootSaga from '../server/sagas/sagas';
import reducers from './reducers';

const persistConfig = {
    key: 'root',
    storage: sessionStorage,
};
const persistedReducer = persistReducer(persistConfig, reducers);

const sagaMiddleware = createSagaMiddleware();
const middlewares: any = [sagaMiddleware];

if (process.env.NODE_ENV === 'development') {
    middlewares.push(logger);
}

const initialState = {
    authentication: {},
    layout: {},
};
export const store = configureStore({ reducer: persistedReducer, middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middlewares), preloadedState: initialState});
sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
