import { createSlice } from '@reduxjs/toolkit';

const ProductSlice = createSlice({
    name: 'product',
    initialState: {
        products: [],
        loading: true
    },
    reducers: {
        All_Product_Success: (state, action) => {
            state.products = action.payload.products;
            state.loading = false
        }
    }
})


export default ProductSlice.reducer;