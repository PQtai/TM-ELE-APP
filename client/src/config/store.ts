import { AnyAction, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import reducer from '~/shared/reducers';
import logger from 'redux-logger';

// const nonSerializableValueMiddleware: Middleware = (store) => (next) => (action) => {
//    const { files, ...rest } = action.payload || {};
//    const newPayload = files
//       ? { ...rest, files: files.map((file: File) => ({ name: file.name, size: file.size })) }
//       : action.payload;
//    return next({ ...action, payload: newPayload });
// };

// const serializableMiddleware: Middleware = (store) => (next) => (action) => {
//    if (typeof action === 'object') {
//       const serializable = Object.keys(action).every((key) => {
//          try {
//             JSON.stringify(action[key]);
//             return true;
//          } catch (err) {
//             return false;
//          }
//       });
//       if (!serializable) {
//          console.warn('Non-serializable value detected in action:', action);
//          return null;
//       }
//    }
//    return next(action);
// };
const store = configureStore({
   reducer,
   middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
         serializableCheck: false,
      }).concat(logger),
});

const getStore = () => {
   return store;
};

export type IRootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<IRootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, IRootState, unknown, AnyAction>;

export default getStore;
