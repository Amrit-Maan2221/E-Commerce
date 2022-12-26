import { configureStore} from '@reduxjs/toolkit';
import FeaturedProductReducer from './product/FeaturedProductSlice';
import ProductReducer from './product/ProductSlice';
import ProductsReducer from './product/ProductsSlice';

export default configureStore({
  reducer: {
    products: ProductsReducer,
    featuredProducts: FeaturedProductReducer,
    product: ProductReducer
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
});