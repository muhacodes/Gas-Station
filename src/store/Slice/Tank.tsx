import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { config } from '../../Config';
import { fetchWithTokenRefresh } from '../helpers/appUtils';
import {
  fuelDelivery,
  Meter,
  Tank,
  TankDipping,
} from '../../types/productType';
import { handleAsyncThunk } from '../helpers/handleasyncthunk';

// interface TankState {
//   products: Product[];
//   stocks: Stock[];
//   loadingProducts: boolean;
//   loadingStocks: boolean;
//   errorProducts: string | null;
//   errorStocks: string | null;
// }
interface TankState {
  Tank: Tank[];
  TankDipping: TankDipping[];
  fuelDelivery: fuelDelivery[];
  Meter: Meter[];
  Loading: boolean;
  error: string | null;
}

const initialState: TankState = {
  Meter: [],
  Tank: [],
  TankDipping: [],
  fuelDelivery: [],
  Loading: false,
  error: null,
};

export const fetchTank = createAsyncThunk('tank/fetch', async (_, thunkAPI) => {
  const url = `${config.appUrl}/api/tank/`;
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
});

export const addTank = createAsyncThunk(
  'tank/add',
  async (newTank: Tank, thunkAPI) => {
    const url = `${config.appUrl}/api/tank`;
    try {
      const response = await fetchWithTokenRefresh(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTank),
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

export const fetchMeter = createAsyncThunk(
  'meter/fetch',
  async (_, thunkAPI) => {
    const url = `${config.appUrl}/api/meter`;
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

export const addMeter = createAsyncThunk(
  'meter/add',
  async (newMeter: Meter, thunkAPI) => {
    const url = `${config.appUrl}/api/meter`;
    try {
      const response = await fetchWithTokenRefresh(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newMeter),
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

export const fetchDipping = createAsyncThunk(
  'dipping/fetch',
  async (_, thunkAPI) => {
    const url = `${config.appUrl}/api/tankdipping`;
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

export const addDipping = createAsyncThunk(
  'dipping/add',
  async (newDipping: TankDipping, thunkAPI) => {
    const url = `${config.appUrl}/api/tankdipping`;
    try {
      const response = await fetchWithTokenRefresh(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newDipping),
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

export const fetchFuelDelivery = createAsyncThunk(
  'FuelDelivery/fetch',
  async (_, thunkAPI) => {
    const url = `${config.appUrl}/api/fueldelivery`;
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

export const addFuelDelivery = createAsyncThunk(
  'FuelDelivery/add',
  async (newFuelDelivery: fuelDelivery, thunkAPI) => {
    const url = `${config.appUrl}/api/fueldelivery`;
    try {
      const response = await fetchWithTokenRefresh(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newFuelDelivery),
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

export const TankSlice = createSlice({
  name: 'Tank',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Handle fetchProduct
    handleAsyncThunk<TankState, Tank[], void>(builder, fetchTank, {
      dataKey: 'Tank',
      loadingKey: 'Loading',
      errorKey: 'error',
    });
    // Handle addProduct
    handleAsyncThunk<TankState, Tank, Tank>(builder, addTank, {
      dataKey: 'Tank',
      loadingKey: 'Loading',
      errorKey: 'error',
      append: true,
    });
    handleAsyncThunk<TankState, Meter[], void>(builder, fetchMeter, {
      dataKey: 'Meter',
      loadingKey: 'Loading',
      errorKey: 'error',
    });
    // Handle addProduct
    handleAsyncThunk<TankState, Meter, Meter>(builder, addMeter, {
      dataKey: 'Meter',
      loadingKey: 'Loading',
      errorKey: 'error',
      append: true,
    });
    handleAsyncThunk<TankState, TankDipping[], void>(builder, fetchDipping, {
      dataKey: 'TankDipping',
      loadingKey: 'Loading',
      errorKey: 'error',
    });
    // Handle addProduct
    handleAsyncThunk<TankState, TankDipping, TankDipping>(builder, addDipping, {
      dataKey: 'TankDipping',
      loadingKey: 'Loading',
      errorKey: 'error',
      append: true,
    });
    handleAsyncThunk<TankState, fuelDelivery[], void>(
      builder,
      fetchFuelDelivery,
      {
        dataKey: 'fuelDelivery',
        loadingKey: 'Loading',
        errorKey: 'error',
      },
    );
    // Handle addProduct
    handleAsyncThunk<TankState, fuelDelivery, fuelDelivery>(
      builder,
      addFuelDelivery,
      {
        dataKey: 'fuelDelivery',
        loadingKey: 'Loading',
        errorKey: 'error',
        append: true,
      },
    );
  },
});

// export const { departmentAdded } = departmentSlice.actions;
export const TankActions = TankSlice.actions;
export default TankSlice.reducer;
