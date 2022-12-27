import { createSlice } from '@reduxjs/toolkit';


const getLocalCartData = () => {
    let localCartData = localStorage.getItem("cartItems");

    const parsedData = JSON.parse(localCartData);
    if (!Array.isArray(parsedData)) return [];
  
    return parsedData;
  };
  

const CartSlice = createSlice({
    name: 'cart',
    initialState: {
        cartItems: getLocalCartData(),
        shippingInfo: {
            shippingFee: 500
        },
        total_item: 0,
        total_price: 0
    },
    reducers: {
        Add_to_Cart: (state, action) => {
            let { _id, color, amount, product } = action.payload;
            console.log(action.payload);
            // tackle the existing product
            let existingProduct = state.cartItems.find(
                (curItem) => curItem._id === _id + color
            );

            if (existingProduct) {
                console.log(`product is existing`)
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
                localStorage.setItem("cartItems", JSON.stringify(updatedProduct));
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
                localStorage.setItem("cartItems", JSON.stringify([...state.cartItems, cartProduct]));
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
            localStorage.setItem("cartItems", JSON.stringify(updatedProduct));
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
            localStorage.setItem("cartItems", JSON.stringify(updatedProduct));
            state.cartItems = updatedProduct;
        },
        RemoveItem: (state, action) => {
            let updatedCart = state.cartItems.filter(
                (curItem) => curItem._id !== action.payload
            );
            localStorage.setItem("cartItems", JSON.stringify(updatedCart));
            state.cartItems= updatedCart;
        },
        ClearCart: (state, action) => {
            localStorage.setItem("cartItems", JSON.stringify([]));
            state.cartItems= [];
        },
        Cart_Item_Price_Total: (state, action) => {
            let totalPrice = 0;
            let totalItems = 0;

            if(!(state.cartItems.length === 0)){
                state.cartItems.forEach(item => {
                    totalItems += item.amount;
                    totalPrice += item.amount * item.price;
                });
            }

            state.total_item = totalItems;
            state.total_price = totalPrice;
        }

    }
})

export const { Add_to_Cart, Set_Decrement, Set_Increment, RemoveItem, Cart_Item_Price_Total, ClearCart } = CartSlice.actions;
export default CartSlice.reducer;