import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice/index";
import adminProductSlice from "./admin/productSlice";
import shopProductsSlice from "./shop/ProductSlice";
import shoppingCartSlice from "./shop/cartSlice";
import shopAddressSlice from "./shop/addressSlice";
import shopOrderSlice from "./shop/orderSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    adminProduct: adminProductSlice,
    shopProducts: shopProductsSlice,
    shopCart: shoppingCartSlice,
    shopAddress: shopAddressSlice,
    shopOrder: shopOrderSlice,
  },
});

export default store;
