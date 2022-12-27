import { configureStore} from '@reduxjs/toolkit';
import CartReducer from './cart/CartSlice';
import FeaturedProductReducer from './product/FeaturedProductSlice';
import ProductReducer from './product/ProductSlice';
import ProductsReducer from './product/ProductsSlice';

export default configureStore({
  reducer: {
    products: ProductsReducer,
    featuredProducts: FeaturedProductReducer,
    product: ProductReducer,
    cart: CartReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
});