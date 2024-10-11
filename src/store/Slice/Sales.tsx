import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { config } from '../../Config';
import { fetchWithTokenRefresh } from '../helpers/appUtils';
import { Product, Pump, Stock } from '../../types/productType';
import { handleAsyncThunk } from '../helpers/handleasyncthunk';
import { RootState } from '../store';
import { sales } from '../../types/sales';
import { Creditor, CreditSale, Discount } from '../../types/finance';

interface SalesState {
  sales: sales[];
  creditors: Creditor[];
  creditSales : CreditSale[],
  discount: Discount[];
  loading: boolean;
  error: string | null;
}

const initialState: SalesState = {
  sales: [],
  discount: [],
  creditors: [],
  creditSales : [],
  error: null,
  loading: false,
};

export const fetchSales = createAsyncThunk(
  'sales/fetch',
  async (_, thunkAPI) => {
    const url = `${config.appUrl}/api/sales`;
    try {
      const response = await fetchWithTokenRefresh(url);
      if (!response.ok) {
        // If the response is not ok, throw an error with the response message
        const errorData = await response.json();
        return thunkAPI.rejectWithValue(errorData);
      }
      const data = await response.json();
      console.log(data);
      return data; // This will be the action.payload for the fulfilled action
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const addSales = createAsyncThunk(
  'sales/add',
  async (newSale: sales, thunkAPI) => {
    const url = `${config.appUrl}/api/sales`;
    try {
      const response = await fetchWithTokenRefresh(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newSale),
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

export const fetchCreditors = createAsyncThunk(
  'creditors/fetch',
  async (_, thunkAPI) => {
    const url = `${config.appUrl}/api/creditors`;
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

export const addCreditors = createAsyncThunk(
  'creditor/add',
  async (newCreditor: Creditor, thunkAPI) => {
    const url = `${config.appUrl}/api/creditors`;
    try {
      const response = await fetchWithTokenRefresh(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCreditor),
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

export const fetchCreditSales = createAsyncThunk(
  'creditSales/fetch',
  async (_, thunkAPI) => {
    const url = `${config.appUrl}/api/credit_sales`;
    try {
      const response = await fetchWithTokenRefresh(url);
      if (!response.ok) {
        // If the response is not ok, throw an error with the response message
        const errorData = await response.json();
        return thunkAPI.rejectWithValue(errorData);
      }
      const data = await response.json();
      console.log(data);
      return data; // This will be the action.payload for the fulfilled action
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const addCreditSales = createAsyncThunk(
  'CreditSales/add',
  async (postData: CreditSale, thunkAPI) => {
    const url = `${config.appUrl}/api/credit_sales`;
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

export const fetchDiscount = createAsyncThunk(
  'discount/fetch',
  async (_, thunkAPI) => {
    const url = `${config.appUrl}/api/discounts`;
    try {
      const response = await fetchWithTokenRefresh(url);
      if (!response.ok) {
        // If the response is not ok, throw an error with the response message
        const errorData = await response.json();
        return thunkAPI.rejectWithValue(errorData);
      }
      const data = await response.json();
      console.log(data);
      return data; // This will be the action.payload for the fulfilled action
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const addDiscount = createAsyncThunk(
  'discount/add',
  async (postData: Discount, thunkAPI) => {
    const url = `${config.appUrl}/api/discounts`;
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



export const SalesSlice = createSlice({
  name: 'sales',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Handle fetchProduct
    handleAsyncThunk<SalesState, sales[], void>(builder, fetchSales, {
      dataKey: 'sales',
      errorKey: 'error',
      loadingKey: 'loading',
    });
    // Handle addProduct
    handleAsyncThunk<SalesState, sales, sales>(builder, addSales, {
      dataKey: 'sales',
      append: true,
      errorKey: 'error',
      loadingKey: 'loading',
    });

    // Handle fetchStock
    handleAsyncThunk<SalesState, Creditor[], void>(builder, fetchCreditors, {
      dataKey: 'creditors',
      errorKey: 'error',
      loadingKey: 'loading',
    });

    // Handle addStock
    handleAsyncThunk<SalesState, Creditor, Creditor>(builder, addCreditors, {
      dataKey: 'creditors',
      append: true,
      errorKey: 'error',
      loadingKey: 'loading',
    });

    handleAsyncThunk<SalesState, CreditSale[], void>(builder, fetchCreditSales, {
      dataKey: 'creditSales',
      errorKey: 'error',
      loadingKey: 'loading',
    });

    // Handle addStock
    handleAsyncThunk<SalesState, CreditSale, CreditSale>(builder, addCreditSales, {
      dataKey: 'creditSales',
      append: true,
      errorKey: 'error',
      loadingKey: 'loading',
    });

    // Handle fetchStock
    handleAsyncThunk<SalesState, Discount[], void>(builder, fetchDiscount, {
      dataKey: 'discount',
      errorKey: 'error',
      loadingKey: 'loading',
    });

    // Handle addStock
    handleAsyncThunk<SalesState, Discount, Discount>(builder, addDiscount, {
      dataKey: 'discount',
      append: true,
      errorKey: 'error',
      loadingKey: 'loading',
    });
  },
});

// export const { departmentAdded } = departmentSlice.actions;
export const SalesActions = SalesSlice.actions;
// export const productsData = (state: RootState) => state.product.products;
export default SalesSlice.reducer;
