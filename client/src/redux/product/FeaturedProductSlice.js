import { createSlice } from '@reduxjs/toolkit';

const FeaturedProductSlice = createSlice({
    name: 'product',
    initialState: {
        loading: true,
        error: false,
        featuredProducts: []
    },
    reducers: {
        Featured_Product_Request: (state) => {
            state.loading = true;
            state.featuredProducts = [];
            state.error= false;
        },
        Featured_Product_Success: (state, action) => {
            state.loading = false;
            state.featuredProducts = action.payload.filteredProducts;
            state.error= false;
        },
        Featured_Product_Fail: (state, action) => {
            state.loading = false;
            state.featuredProducts = [];
            state.error= action.payload;
        },
        Clear_Error: (state) =>{
            state.error= null
        }

    }
})

export const {Featured_Product_Request, Featured_Product_Success, Featured_Product_Fail, Clear_Error} = FeaturedProductSlice.actions;
export default FeaturedProductSlice.reducer;