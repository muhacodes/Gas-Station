// src/rootReducer.ts
import { combineReducers } from '@reduxjs/toolkit';
import AuthSlice from './Slice/Auth';
import ProductSlice from './Slice/ProductSlice';
import TankSlice from './Slice/Tank';
import SalesSlice from './Slice/Sales';
import ClientSlice from './Slice/Client';
import notificationSlice from './Slice/Notification';
import ExpenseSlice from './Slice/Expenses';

// Combine your reducers
export const rootReducer = combineReducers({
  auth: AuthSlice,
  product: ProductSlice,
  tank: TankSlice,
  sales: SalesSlice,
  client: ClientSlice,
  notification: notificationSlice,
  expenses: ExpenseSlice,
});

// Export RootState type
export type RootState = ReturnType<typeof rootReducer>;
