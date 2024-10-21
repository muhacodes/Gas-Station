import { createSlice, PayloadAction, Dispatch } from '@reduxjs/toolkit';

interface NotificationState {
  message: string;
  type: 'success' | 'error' | 'info' | null;
  isVisible: boolean;
  fadeout?: boolean;
}

const initialState: NotificationState = {
  message: '',
  type: null,
  isVisible: false,
  fadeout: false,
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    showNotification: (
      state,
      action: PayloadAction<{
        message: string;
        type: 'success' | 'error' | 'info';
      }>,
    ) => {
      state.message = action.payload.message;
      state.type = action.payload.type;
      state.isVisible = true;
      state.fadeout = false;
    },
    hideNotification: (state) => {
      state.message = '';
      state.type = null;
      state.isVisible = false;
      state.fadeout = true;
    },
    triggerFadeOut: (state) => {
      state.fadeout = true; // Apply the fade-out class after 4 seconds
    },
  },
});

// Export actions
export const { showNotification, hideNotification, triggerFadeOut } = notificationSlice.actions;

// Reducer
export default notificationSlice.reducer;

// Thunk action to show and automatically hide notification after 5 seconds
export const showNotificationWithTimeout = (
  message: string,
  type: 'success' | 'error' | 'info',
) => {
  return (dispatch: Dispatch) => {
    // Show the notification
    dispatch(showNotification({ message, type }));

    // Trigger the fade-out effect after 4 seconds
    setTimeout(() => {
      dispatch(triggerFadeOut());
    }, 4000); // Start fade-out after 4 seconds

    setTimeout(() => {
      dispatch(hideNotification());
    }, 5000);
  };
};
