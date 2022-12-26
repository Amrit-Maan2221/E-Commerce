import { createSlice } from '@reduxjs/toolkit';

const ProductsSlice = createSlice({
    name: 'product',
    initialState: {
        products: [],
        loading: true,
        error: false
    },
    reducers: {
        All_Product_Request: (state) => {
            state.loading = true;
            state.products = [];
            state.error= false;
        },
        All_Product_Success: (state, action) => {
            state.products = action.payload.Products;
            state.loading = false
        },
        All_Products_Fail: (state, action) => {
            state.loading = false
            state.error= action.payload;
        },
        Clear_Error: (state) =>{
            state.error= null
        }

    }
})

export const { All_Product_Request, All_Product_Success, All_Products_Fail, Clear_Error} = ProductsSlice.actions;
export default ProductsSlice.reducer;