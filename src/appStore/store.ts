import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import pluginsReducer from "@/appStore/reducers/pluginSlice";

export const store = configureStore({
    reducer: {
        tabs: pluginsReducer,
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
