import { useSelector } from "react-redux";
import { axoisInstance } from "../../util/ApiBaseUrlInstance";
import { Featured_Product_Fail, Featured_Product_Request, Featured_Product_Success } from "./FeaturedProductSlice";
import { Products_Fail, Product_Request, Product_Success } from "./ProductSlice";
import { All_Products_Fail, All_Product_Request, All_Product_Success } from "./ProductsSlice";



export const getAllProducts = async (dispatch, filter = {}, sort = "") => {

  dispatch(All_Product_Request());
  console.log(sort);

  let query = "?";
  if (filter.keyword) {
    query += `name=${filter.keyword}&`
  }

  if (filter.category && filter.category !== "all") {
    query += `category=${filter.category}&`
  }

  if (filter.company && filter.company !== "all") {
    query += `company=${filter.company}&`
  }

  if (filter.color && filter.color !== "all") {
    let color = filter.color;

    let encodedColor = color.replace('#', "%23");
    query += `color=${encodedColor}&`
  }

  if (filter.price && filter.price !== 0) {
    query += `price=${filter.price}&`
  }

  if (sort == "lowest") {
    query += `sort=price&`
  } else if (sort == "highest") {
    query += `sort=-price&`
  } else if (sort == "a-z") {
    query += `sort=price,name&`
  } else if (sort == "z-a") {
    query += `sort=-price,-name&`
  }



  try {
    const options = {
      method: 'GET',
      url: `/product/products${query}`
    };
    const res = await axoisInstance.request(options);
    console.log(options)

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