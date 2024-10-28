import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthUser, userType } from '../../types/auth';
import { GasStation, staff_type } from '../../types/client';
import { handleAsyncThunk } from '../helpers/handleasyncthunk';
import { fetchWithTokenRefresh } from '../helpers/appUtils';
import { config } from '../../Config';
import { cash_book_type } from '../../types/finance';

interface ClientState {
  staff: staff_type[];
  GasStation: GasStation;
  loading: boolean;
  cash_book : cash_book_type[],
  error: string | null;
}

export type FilterByDateType = {
  StartDate : string;
  EndDate : string
}

const initialState: ClientState = {
  staff: [],
  GasStation: { created_at: '', id: '', location: '', name: '', tenant: null },
  cash_book : [],
  error: null,
  loading: false,
};

export const fetchStaff = createAsyncThunk(
  'staff/fetch',
  async (_, thunkAPI) => {
    const url = `${config.appUrl}/api/staff`;
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

export const fetchCashBook = createAsyncThunk(
  'cash_book/fetch',
  async ({ startDate, endDate }: { startDate?: string; endDate?: string }, thunkAPI) => {
    // Construct the base URL
    let url = `${config.appUrl}/api/cash-book`;
    // Append the date range query parameters if provided
    if (startDate && endDate) {
      url += `/?start_date=${startDate}&end_date=${endDate}`;
    }
    try {
      const response = await fetchWithTokenRefresh(url);
      if (!response.ok) {
        // If the response is not ok, throw an error with the response message
        const errorData = await response.json();
        return thunkAPI.rejectWithValue(errorData);
      }
      const data = await response.json();
      console.log('cash Book' , data)
      return data; // This will be the action.payload for the fulfilled action
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const FilterCashBookByDate = createAsyncThunk(
  'cash_book/filter',
  async (date : FilterByDateType, thunkAPI) => {
    // const url = `${config.appUrl}/api/cash-book`;
    const url = `${config.appUrl}/api/cash-book/?start_date=${date.StartDate}&end_date=${date.EndDate}`;
    try {
      const response = await fetchWithTokenRefresh(url);
      if (!response.ok) {
        // If the response is not ok, throw an error with the response message
        const errorData = await response.json();
        return thunkAPI.rejectWithValue(errorData);
      }
      const data = await response.json();
      console.log('cash Book' , data)
      return data; // This will be the action.payload for the fulfilled action
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);


export const AddStaff = createAsyncThunk(
  'staff/add',
  async (postData: staff_type, thunkAPI) => {
    const url = `${config.appUrl}/api/staff`;
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

export const GetStation = createAsyncThunk(
  'getStation/fetch',
  async (_, thunkAPI) => {
    const url = `${config.appUrl}/api/station/?email=${`admin@gmail.com`}`;
    try {
      const response = await fetchWithTokenRefresh(url);
      if (!response.ok) {
        // If the response is not ok, throw an error with the response message
        const errorData = await response.json();
        return thunkAPI.rejectWithValue(errorData);
      }
      const data = await response.json();
      console.log("Gas Station Data is ", data[0])
      return data[0]; // This will be the action.payload for the fulfilled action
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const ClientSlice = createSlice({
  name: 'client',
  initialState,
  reducers: {
    // Implement additional reducers as needed
  },
  extraReducers: (builder) => {
    // Handle fetchProduct
    handleAsyncThunk<ClientState, staff_type[], void>(builder, fetchStaff, {
      dataKey: 'staff',
      errorKey: 'error',
      loadingKey: 'loading',
    });

    handleAsyncThunk<ClientState, staff_type[], staff_type>(builder, AddStaff, {
      dataKey: 'staff',
      errorKey: 'error',
      loadingKey: 'loading',
      append: true,
    });

    handleAsyncThunk<ClientState, GasStation[], void>(builder, GetStation, {
      dataKey: 'GasStation',
      errorKey: 'error',
      loadingKey: 'loading',
    });

    handleAsyncThunk<ClientState, cash_book_type[], {}>(builder, fetchCashBook, {
      dataKey: 'cash_book',
      errorKey: 'error',
      loadingKey: 'loading',
    });

    handleAsyncThunk<ClientState, cash_book_type[], FilterByDateType>(builder, FilterCashBookByDate, {
      dataKey: 'cash_book',
      errorKey: 'error',
      loadingKey: 'loading',
    });
  },
});

export const ClientActions = ClientSlice.actions;
export default ClientSlice.reducer;
