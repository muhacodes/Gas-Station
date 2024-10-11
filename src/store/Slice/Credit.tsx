import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthUser, userType } from '../../types/auth';

interface CreditState {
 
}

const initialState: CreditState = {
  
};



export const CreditSlice = createSlice({
  name: 'credit',
  initialState,
  reducers: {
    
    // Implement additional reducers as needed
  },
});

export const AuthActions = CreditSlice.actions;
export default CreditSlice.reducer;
