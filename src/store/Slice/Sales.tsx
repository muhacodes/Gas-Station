import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { config } from '../../Config';
import { fetchWithTokenRefresh } from '../helpers/appUtils';
import { Product, Pump, Stock } from '../../types/productType';
import { handleAsyncThunk } from '../helpers/handleasyncthunk';
import { RootState } from '../store';
import { payment_drop_type, pump_sales_type, sales, sales_payment_type } from '../../types/sales';
import { Creditor, CreditSale, Discount } from '../../types/finance';

interface SalesCreditState {
  sales: sales[];
  creditors: Creditor[];
  creditSales : CreditSale[],
  sales_payment : sales_payment_type[],
  pump_sales : pump_sales_type[],
  drop: payment_drop_type[],
  discount: Discount[];
  loading: boolean;
  error: string | null;
}

const initialState: SalesCreditState = {
  sales: [],
  discount: [],
  creditors: [],
  creditSales : [],
  sales_payment : [],
  pump_sales : [],
  drop : [],
  error: null,
  loading: false,
};

export const fetchSales = createAsyncThunk(
  'sales/fetch',
  async ({ startDate, endDate }: { startDate?: string; endDate?: string }, thunkAPI) => {
    // Construct the base URL
    let url = `${config.appUrl}/api/sales`;
    // Append the date range query parameters if provided
    if (startDate && endDate) {
      url += `/?start_date=${startDate}&end_date=${endDate}`;
    }
    // const url = `${config.appUrl}/api/sales`;
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

export const DeleteCreditors = createAsyncThunk(
  'creditor/delete',
  async (newCreditor: Creditor, thunkAPI) => {
    const url = `${config.appUrl}/api/creditors/${newCreditor.id}`;
    try {
      const response = await fetchWithTokenRefresh(url, {
        method: 'Delete',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCreditor),
      });
    
      if(!response.ok){
        return thunkAPI.rejectWithValue({'error' : 'something went wrong'});
      }
      return newCreditor;
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
  async ({ startDate, endDate }: { startDate?: string; endDate?: string }, thunkAPI) => {
    // Construct the base URL
    let url = `${config.appUrl}/api/credit_sales`;
    // Append the date range query parameters if provided
    if (startDate && endDate) {
      url += `/?start_date=${startDate}&end_date=${endDate}`;
    }
    // const url = `${config.appUrl}/api/credit_sales`;
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


export const fetchDrop = createAsyncThunk(
  'drop/fetch',
  async ({ startDate, endDate }: { startDate?: string; endDate?: string }, thunkAPI) => {
    // Construct the base URL
    let url = `${config.appUrl}/api/sales_drop`;
    // Append the date range query parameters if provided
    if (startDate && endDate) {
      url += `/?start_date=${startDate}&end_date=${endDate}`;
    }
    // const url = `${config.appUrl}/api/sales_drop`;
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


export const addDrop = createAsyncThunk(
  'drop/add',
  async (postData: payment_drop_type, thunkAPI) => {
    const url = `${config.appUrl}/api/sales_drop`;
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

export const fetchPumpSummary = createAsyncThunk(
  'pump/summary',
  async ({ startDate, endDate }: { startDate?: string; endDate?: string }, thunkAPI) => {
    // Construct the base URL
    let url = `${config.appUrl}/api/pump/summary`;
    // Append the date range query parameters if provided
    if (startDate && endDate) {
      url += `/?start_date=${startDate}&end_date=${endDate}`;
    }
    // const url = `${config.appUrl}/api/pump/summary`;
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


export const fetchSalesPayment = createAsyncThunk(
  'salesPayment/fetch',
  async (_, thunkAPI) => {
    const url = `${config.appUrl}/api/sales_payment`;
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

export const addSalesPayment = createAsyncThunk(
  'salesPayment/add',
  async (postData: sales_payment_type, thunkAPI) => {
    const url = `${config.appUrl}/api/sales_payment`;
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
    handleAsyncThunk<SalesCreditState, sales[], {}>(builder, fetchSales, {
      dataKey: 'sales',
      errorKey: 'error',
      loadingKey: 'loading',
    });
    // Handle addProduct
    handleAsyncThunk<SalesCreditState, sales, sales>(builder, addSales, {
      dataKey: 'sales',
      append: true,
      errorKey: 'error',
      loadingKey: 'loading',
    });

    // Handle fetchStock
    handleAsyncThunk<SalesCreditState, Creditor[], void>(builder, fetchCreditors, {
      dataKey: 'creditors',
      errorKey: 'error',
      loadingKey: 'loading',
    });

    // Handle addStock
    handleAsyncThunk<SalesCreditState, Creditor, Creditor>(builder, addCreditors, {
      dataKey: 'creditors',
      append: true,
      errorKey: 'error',
      loadingKey: 'loading',
    });

    handleAsyncThunk<SalesCreditState, Creditor, Creditor>(builder, DeleteCreditors, {
      dataKey: 'creditors',
      // append: true,
      onDelete : true,
      errorKey: 'error',
      loadingKey: 'loading',
    });

    handleAsyncThunk<SalesCreditState, CreditSale[], {}>(builder, fetchCreditSales, {
      dataKey: 'creditSales',
      errorKey: 'error',
      loadingKey: 'loading',
    });

    // Handle addStock
    handleAsyncThunk<SalesCreditState, CreditSale, CreditSale>(builder, addCreditSales, {
      dataKey: 'creditSales',
      append: true,
      errorKey: 'error',
      loadingKey: 'loading',
    });

    // Handle fetchStock
    handleAsyncThunk<SalesCreditState, Discount[], void>(builder, fetchDiscount, {
      dataKey: 'discount',
      errorKey: 'error',
      loadingKey: 'loading',
    });

    // Handle addStock
    handleAsyncThunk<SalesCreditState, Discount, Discount>(builder, addDiscount, {
      dataKey: 'discount',
      append: true,
      errorKey: 'error',
      loadingKey: 'loading',
    });

    handleAsyncThunk<SalesCreditState, sales_payment_type[], void>(builder, fetchSalesPayment, {
      dataKey: 'sales_payment',
      errorKey: 'error',
      loadingKey: 'loading',
    });

    handleAsyncThunk<SalesCreditState, sales_payment_type, sales_payment_type>(builder, addSalesPayment, {
      dataKey: 'sales_payment',
      append: true,
      errorKey: 'error',
      loadingKey: 'loading',
    });

    handleAsyncThunk<SalesCreditState, payment_drop_type[], {}>(builder, fetchDrop, {
      dataKey: 'drop',
      errorKey: 'error',
      loadingKey: 'loading',
    });

    handleAsyncThunk<SalesCreditState, payment_drop_type, payment_drop_type>(builder, addDrop, {
      dataKey: 'drop',
      append: true,
      errorKey: 'error',
      loadingKey: 'loading',
    });


    handleAsyncThunk<SalesCreditState, pump_sales_type[], {}>(builder, fetchPumpSummary, {
      dataKey: 'pump_sales',
      errorKey: 'error',
      loadingKey: 'loading',
    });
  },
});

// export const { departmentAdded } = departmentSlice.actions;
export const SalesActions = SalesSlice.actions;
// export const productsData = (state: RootState) => state.product.products;
export default SalesSlice.reducer;
