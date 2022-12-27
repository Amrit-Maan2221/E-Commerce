import { createSlice } from '@reduxjs/toolkit';

const ProductSlice = createSlice({
    name: 'product',
    initialState: {
        product: {},
        loading: true,
        error: false
    },
    reducers: {
        Product_Request: (state) => {
            state.loading = true;
            state.product = {};
            state.error= false;
        },
        Product_Success: (state, action) => {
            state.product = action.payload.filteredProducts[0];
            state.loading = false
        },
        Products_Fail: (state, action) => {
            state.loading = false
            state.error= action.payload;
        },
        Clear_Error: (state) =>{
            state.error= null
        }

    }
})

export const { Product_Request, Product_Success, Products_Fail, Clear_Error} = ProductSlice.actions;
export default ProductSlice.reducer;