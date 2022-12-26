import { axoisInstance } from "../../util/ApiBaseUrlInstance";
import { Featured_Product_Fail, Featured_Product_Request, Featured_Product_Success } from "./FeaturedProductSlice";
import { Products_Fail, Product_Request, Product_Success } from "./ProductSlice";
import { All_Products_Fail, All_Product_Request, All_Product_Success } from "./ProductsSlice";


export const getAllProducts = async (dispatch) => {
  dispatch(All_Product_Request());
  try {
    const options = {
        method: 'GET',
        url: '/product/products'
      };
    const res = await axoisInstance.request(options);
    dispatch(All_Product_Success(res.data));
  } catch (err) {
    dispatch(All_Products_Fail(err));
  }
};

export const getFeaturedProducts = async (dispatch) => {
    dispatch(Featured_Product_Request());
    try {
      const options = {
          method: 'GET',
          url: '/product/products?featured=true'
        };
      const res = await axoisInstance.request(options);
      console.log(res);
      dispatch(Featured_Product_Success(res.data));
    } catch (err) {
      dispatch(Featured_Product_Fail(err));
    }
  };


  export const getSingleProduct = async (dispatch, id) => {
    dispatch(Product_Request());
    try {
      const options = {
          method: 'GET',
          url: `/product/products?id=${id}`
        };
      const res = await axoisInstance.request(options);
      dispatch(Product_Success(res.data));
    } catch (err) {
      dispatch(Products_Fail(err));
    }
  };