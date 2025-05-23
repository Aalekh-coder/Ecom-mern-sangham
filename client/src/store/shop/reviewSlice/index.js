import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isLoading:false,
    reviews:[]
}

export const addNewReview = createAsyncThunk(
    "/product/addNewReview",
    async (formData) => {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/shop/review/add`,formData
      );
  
      return response.data;
    }
  );

export const getReviews = createAsyncThunk(
    "/product/getReviews",
    async (productId) => {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/shop/review/${productId}`
      );
  
      return response.data;
    }
  );

const reviewSlice = createSlice({
    name: "reviewSlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getReviews.pending, (state) => {
            state.isLoading = true
        }).addCase(getReviews.fulfilled, (state,action) => {
            state.isLoading = false;
            state.reviews = action.payload.data
        }).addCase(getReviews.rejected, (state) => {
            state.isLoading = true
            state.reviews = []

        })
    }
})

export default reviewSlice.reducer