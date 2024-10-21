// handleAsyncThunk.ts
import { ActionReducerMapBuilder, AsyncThunk } from '@reduxjs/toolkit';

interface HandleAsyncThunkOptions<State> {
  loadingKey: keyof State;
  errorKey: keyof State;
  dataKey: keyof State;
  append?: boolean;
  onDelete?: boolean;
}

// export function handleAsyncThunk<State, Returned, ThunkArg>(
//   builder: ActionReducerMapBuilder<State>,
//   thunk: AsyncThunk<Returned, ThunkArg, {}>,
//   options: HandleAsyncThunkOptions<State>,
// ) {
//   const { loadingKey, errorKey, dataKey, append = false } = options;

//   builder
//     .addCase(thunk.pending, (state) => {
//       (state as any)[loadingKey] = true;
//       (state as any)[errorKey] = null;
//     })
//     .addCase(thunk.fulfilled, (state, action) => {
//       (state as any)[loadingKey] = false;
//       if (append && Array.isArray((state as any)[dataKey])) {
//         ((state as any)[dataKey] as any[]).push(action.payload);
//       } else {
//         (state as any)[dataKey] = action.payload;
//       }
//     })
//     .addCase(thunk.rejected, (state, action) => {
//       //   (state as any)[loadingKey] = false;
//       //   (state as any)[errorKey] = action.payload as string;
//       (state as any)[loadingKey] = false;
//       // Use action.payload if available, otherwise fallback to action.error.message
//       (state as any)[errorKey] =
//         (action.payload as string) || action.error.message;
//     });
// }
export function handleAsyncThunk<State, Returned, ThunkArg>(
  builder: ActionReducerMapBuilder<State>,
  thunk: AsyncThunk<Returned, ThunkArg, {}>,
  options: HandleAsyncThunkOptions<State>,
) {
  const {
    onDelete = false,
    loadingKey,
    errorKey,
    dataKey,
    append = false,
  } = options;

  builder
    .addCase(thunk.pending, (state) => {
      (state as any)[loadingKey] = true;
      (state as any)[errorKey] = null;
    })
    .addCase(thunk.fulfilled, (state, action) => {
      (state as any)[loadingKey] = false;
      if (append && Array.isArray((state as any)[dataKey])) {
        ((state as any)[dataKey] as any[]).push(action.payload);
      } else if (onDelete) {
        const payload = action.payload as { id: string };

        // Logging for verification
        console.log('Deleted item ID:', payload.id);

        // Filter out the deleted item by ID
        (state as any)[dataKey] = (state as any)[dataKey].filter(
          (item: any) => item.id !== payload.id,
        );
      } else {
        (state as any)[dataKey] = action.payload;
      }
    })
    .addCase(thunk.rejected, (state, action) => {
      (state as any)[loadingKey] = false;

      // If action.payload exists, it is a server-side error.
      if (action.payload) {
        (state as any)[errorKey] =
          (action.payload as any).message || action.payload;
      } else {
        // Otherwise, it might be a client-side or network error.
        (state as any)[errorKey] = action.error.message;
      }
    });
}
