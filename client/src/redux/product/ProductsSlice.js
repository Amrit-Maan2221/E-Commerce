import { createSlice } from '@reduxjs/toolkit';

const ProductsSlice = createSlice({
    name: 'product',
    initialState: {
        products: [],
        filteredProducts:[],
        loading: true,
        error: false,
        filter: {
            category: "all",
            keyword: "",
            color:"all",
            company:"all",
            price:0,
        },
        sort: ""
    },
    reducers: {
        All_Product_Request: (state) => {
            state.loading = true;
            state.products = [];
            state.error= false;
            state.filteredProducts = [];
        },
        All_Product_Success: (state, action) => {
            state.products = action.payload.Products;
            state.filteredProducts = action.payload.filteredProducts;
            state.loading = false;
        },
        All_Products_Fail: (state, action) => {
            state.loading = false;
            state.error= action.payload;
        },
        Clear_Error: (state) =>{
            state.error= null
        },
        Change_filter: (state, action) =>{
            state.filter= action.payload;
        },
        Set_Sort:(state, action) =>{
            state.sort= action.payload;
        }
    }
})

export const { All_Product_Request, All_Product_Success, All_Products_Fail, Clear_Error,Set_Sort, Change_filter} = ProductsSlice.actions;
export default ProductsSlice.reducer;