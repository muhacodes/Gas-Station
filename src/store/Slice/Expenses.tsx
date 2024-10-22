import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { handleAsyncThunk } from '../helpers/handleasyncthunk';
import { fetchWithTokenRefresh } from '../helpers/appUtils';
import { config } from '../../Config';
import { ExpenseType } from '../../types/finance';

interface ExpenseState {
  expenses: ExpenseType[];
  loading: boolean;
  error: string | null;
}

const initialState: ExpenseState = {
  expenses: [],
  error: null,
  loading: false,
};


export const addExpense = createAsyncThunk(
  'staff/add',
  async (postData: ExpenseType, thunkAPI) => {
    const url = `${config.appUrl}/api/expenses`;
    try {
      const response = await fetchWithTokenRefresh(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });
      if (!response.ok) {
        // If the response is not ok, throw an error with the response message
        const errorData = await response.json();
        return thunkAPI.rejectWithValue(errorData);
      }

      const data = await response.json();
      return data; // This will be the action.payload for the fulfilled action
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const getExpense = createAsyncThunk(
  'expense/fetch',
  async (_, thunkAPI) => {
    const url = `${config.appUrl}/api/expenses`;
    try {
      const response = await fetchWithTokenRefresh(url);
      if (!response.ok) {
        // If the response is not ok, throw an error with the response message
        const errorData = await response.json();
        return thunkAPI.rejectWithValue(errorData);
      }
      const data = await response.json();
      return data; // This will be the action.payload for the fulfilled action
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const ExpenseSlice = createSlice({
  name: 'expense',
  initialState,
  reducers: {
    // Implement additional reducers as needed
  },
  extraReducers: (builder) => {
    // Handle fetchProduct
    handleAsyncThunk<ExpenseState, ExpenseType[], void>(builder, getExpense, {
      dataKey: 'expenses',
      errorKey: 'error',
      loadingKey: 'loading',
    });

    handleAsyncThunk<ExpenseState, ExpenseType[], ExpenseType>(builder, addExpense, {
      dataKey: 'expenses',
      errorKey: 'error',
      loadingKey: 'loading',
      append: true,
    });

  },
});

export const ClientActions = ExpenseSlice.actions;
export default ExpenseSlice.reducer;
