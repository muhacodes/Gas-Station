import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { config } from '../../Config';
import { fetchWithTokenRefresh } from '../helpers/appUtils';
import { Product, Pump, Stock } from '../../types/productType';
import { handleAsyncThunk } from '../helpers/handleasyncthunk';
import { RootState } from '../store';

interface ProductState {
  products: Product[];
  stocks: Stock[];
  pump : Pump[],
  loading : boolean,
  error : string | null
  // loadingProducts: boolean;
  // loadingStocks: boolean;
  // errorProducts: string | null;
  // errorStocks: string | null;
}

const initialState: ProductState = {
  products: [],
  stocks: [],
  pump : [],
  // loadingProducts: false,
  // loadingStocks: false,
  // errorProducts: null,
  // errorStocks: null,
  error : null,
  loading : false,
};

export const fetchProduct = createAsyncThunk(
  'product/fetch',
  async (_, thunkAPI) => {
    const url = `${config.appUrl}/api/product/`;
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

export const addProduct = createAsyncThunk(
  'product/add',
  async (newProduct: Product, thunkAPI) => {
    const url = `${config.appUrl}/api/product`;
    try {
      const response = await fetchWithTokenRefresh(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProduct),
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

export const updateProduct = createAsyncThunk(
  'product/update',
  async ({id, unit_price}: Product, thunkAPI) => {
    const url = `${config.appUrl}/api/product/${id}/`;
    try {
      const response = await fetchWithTokenRefresh(url, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ unit_price }),
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

export const fetchStock = createAsyncThunk(
  'stock/fetch',
  async (_, thunkAPI) => {
    const url = `${config.appUrl}/api/stock`;
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

export const addStock = createAsyncThunk(
  'stock/add',
  async (newStock: Stock, thunkAPI) => {
    const url = `${config.appUrl}/api/stock`;
    try {
      const response = await fetchWithTokenRefresh(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newStock),
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

export const fetchPump = createAsyncThunk(
  'pump/fetch',
  async (_, thunkAPI) => {
    const url = `${config.appUrl}/api/pump/`;
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

export const addPump = createAsyncThunk(
  'pump/add',
  async (postData: Pump, thunkAPI) => {
    const url = `${config.appUrl}/api/pump`;
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



export const ProductSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    UpdateProduct: (state, action: PayloadAction<Product>) => {
      // console.log(action.payload);
      const productIndex = state.products.findIndex((product) => product.id === action.payload.id);
      state.products[productIndex].unit_price = action.payload.unit_price;
      // state.list = [...state.list, action.payload];
    },
  },
  extraReducers: (builder) => {
    // Handle fetchProduct
    handleAsyncThunk<ProductState, Product[], void>(builder, fetchProduct, {
      dataKey: 'products',
      errorKey : 'error',
      loadingKey : 'loading',
      // loadingKey: 'loadingProducts',
      // errorKey: 'errorProducts',
    });
    // Handle addProduct
    handleAsyncThunk<ProductState, Product, Product>(builder, addProduct, {
      dataKey: 'products',
      append: true,
      errorKey : 'error',
      loadingKey : 'loading',
    });

    // Handle fetchStock
    handleAsyncThunk<ProductState, Stock[], void>(builder, fetchStock, {
      dataKey: 'stocks',
      errorKey : 'error',
      loadingKey : 'loading',
    });

    // Handle addStock
    handleAsyncThunk<ProductState, Stock, Stock>(builder, addStock, {
      dataKey: 'stocks',
      append: true,
      errorKey : 'error',
      loadingKey : 'loading',
    });

    // Handle fetchStock
    handleAsyncThunk<ProductState, Pump[], void>(builder, fetchPump, {
      dataKey: 'pump',
      errorKey : 'error',
      loadingKey : 'loading',
    });

    // Handle addStock
    handleAsyncThunk<ProductState, Pump, Pump>(builder, addPump, {
      dataKey: 'pump',
      append: true,
      errorKey : 'error',
      loadingKey : 'loading',
    });
  },
});

// export const { departmentAdded } = departmentSlice.actions;
export const ProductActions = ProductSlice.actions;
// export const productsData = (state: RootState) => state.product.products;
export default ProductSlice.reducer;
