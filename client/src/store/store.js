import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice/index";
import adminProductSlice from "./admin/productSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    adminProduct: adminProductSlice,
  },
});

export default store;
