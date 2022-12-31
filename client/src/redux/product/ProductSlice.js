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
        Product_Fail: (state, action) => {
            state.loading = false
            state.error= action.payload;
        },
        Product_Delete_Request: (state) => {
            state.loading = true;
            state.error= false;
        },
        Product_Delete_Success: (state, action) => {
            state.loading = false;
            state.error= false;
        },
        Product_Delete_Fail: (state, action) => {
            state.loading = false
            state.error= action.payload;
        },
        Product_Update_Request: (state) => {
            state.loading = true;
            state.error= false;
        },
        Product_Update_Success: (state, action) => {
            state.loading = false;
            state.product = action.payload.product;
            state.error= false;
        },
        Product_Update_Fail: (state, action) => {
            state.loading = false
            state.error= action.payload;
        },
        Clear_Error: (state) =>{
            state.error= null
        }

    }
})

export const { Product_Request, Product_Success, Product_Fail, Product_Delete_Fail, Product_Delete_Request, Product_Delete_Success ,Product_Update_Fail, Product_Update_Success, Product_Update_Request,Clear_Error} = ProductSlice.actions;
export default ProductSlice.reducer;