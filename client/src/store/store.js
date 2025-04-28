import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice/index";
import adminProductSlice from "./admin/productSlice";
import adminOrderSlice from "./admin/orderSlice";

import shopProductsSlice from "./shop/ProductSlice";
import shoppingCartSlice from "./shop/cartSlice";
import shopAddressSlice from "./shop/addressSlice";
import shopOrderSlice from "./shop/orderSlice";
import shopSeachSlice from "./shop/searchSlice";
import shopReviewSlice from "./shop/reviewSlice";

import commonFeatureSlice from './commonSlice'

const store = configureStore({
  reducer: {
    auth: authReducer,

    adminProduct: adminProductSlice,
    adminOrder: adminOrderSlice,
    
    shopProducts: shopProductsSlice,
    shopCart: shoppingCartSlice,
    shopAddress: shopAddressSlice,
    shopOrder: shopOrderSlice,
    shopSearch: shopSeachSlice,
    shopReview: shopReviewSlice,
    commonFeatures: commonFeatureSlice
  },
});

export default store;
