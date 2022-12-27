import { createSlice } from '@reduxjs/toolkit';

const CartSlice = createSlice({
    name: 'cart',
    initialState: {
        cartItems: [],
        shippingInfo: {},
        total_item: "",
        total_amount: ""
    },
    reducers: {
        Add_to_Cart: (state, action) => {
            let { _id, color, amount, product } = action.payload;

            // tackle the existing product
            let existingProduct = state.cartItems.find(
                (curItem) => curItem._id === _id + color
            );

            if (existingProduct) {
                let updatedProduct = state.cartItems.map((curElem) => {
                    if (curElem._id === _id + color) {
                        let newAmount = curElem.amount + amount;

                        if (newAmount >= curElem.max) {
                            newAmount = curElem.max;
                        }
                        return {
                            ...curElem,
                            amount: newAmount,
                        };
                    } else {
                        return curElem;
                    }
                });
                state.cartItems = updatedProduct
            } else {
                let cartProduct = {
                    _id: _id + color,
                    name: product.name,
                    color,
                    amount,
                    image: product.images[0].url,
                    price: product.price,
                    max: product.stock,
                };
                state.cartItems = [...state.cartItems, cartProduct]
            }
        },
        Set_Decrement: (state, action) => {
            let updatedProduct = state.cartItems.map((curElem) => {
                if (curElem._id === action.payload) {
                    let decAmount = curElem.amount - 1;

                    if (decAmount <= 1) {
                        decAmount = 1;
                    }

                    return {
                        ...curElem,
                        amount: decAmount,
                    };
                } else {
                    return curElem;
                }
            });
            state.cartItems = updatedProduct;
        },
        Set_Increment: (state, action) => {
            let updatedProduct = state.cartItems.map((curElem) => {
                if (curElem._id === action.payload) {
                    let incAmount = curElem.amount + 1;

                    if (incAmount >= curElem.max) {
                        incAmount = curElem.max;
                    }

                    return {
                        ...curElem,
                        amount: incAmount,
                    };
                } else {
                    return curElem;
                }
            });
            state.cartItems = updatedProduct;
        },
        RemoveItem: (state, action) => {
            let updatedCart = state.cartItems.filter(
                (curItem) => curItem._id !== action.payload
            );
            state.cartItems= updatedCart;
        },
        ClearCart: (state, action) => {
            state.cartItems= [];
        }

    }
})

export const { Add_to_Cart, Set_Decrement, Set_Increment, RemoveItem, ClearCart } = CartSlice.actions;
export default CartSlice.reducer;