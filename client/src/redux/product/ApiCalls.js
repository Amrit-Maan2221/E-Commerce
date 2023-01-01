import { axoisInstance } from "../../util/ApiBaseUrlInstance";
import { Featured_Product_Fail, Featured_Product_Request, Featured_Product_Success } from "./FeaturedProductSlice";
import { Product_Delete_Fail, Product_Delete_Request, Product_Delete_Success, Product_Fail, Product_Request, Product_Success, Product_Update_Fail, Product_Update_Request, Product_Update_Success } from "./ProductSlice";
import { All_Products_Fail, All_Product_Request, All_Product_Success } from "./ProductsSlice";



export const getAllProducts = async (dispatch, filter = {}, sort = "") => {

  dispatch(All_Product_Request());

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

  if (sort === "lowest") {
    query += `sort=price&`
  } else if (sort === "highest") {
    query += `sort=-price&`
  } else if (sort === "a-z") {
    query += `sort=price,name&`
  } else if (sort === "z-a") {
    query += `sort=-price,-name&`
  }

  try {
    const options = {
      method: 'GET',
      url: `/product/products${query}`
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
    dispatch(Product_Fail(err));
  }
};



export const updateProduct = async (dispatch, id, token, formData) => {
  dispatch(Product_Update_Request);
  
  try {
    const options = {
      method: 'PUT',
      url: `/product/update/${id}`,
      headers: {'Content-Type': 'application/json', Authorization: `Bearer ${token}`},
      data: formData
    };
    const res = await axoisInstance.request(options);
    console.log(res.data)
    dispatch(Product_Update_Success(res.data));
  } catch (err) {
    dispatch(Product_Update_Fail(err));
  }
};


export const deleteProduct = async (dispatch, id) => {
  dispatch(Product_Delete_Request());
  try {
    const options = {
      method: 'delete',
      url: `/product/delete/${id}`
    };
    const res = await axoisInstance.request(options);
    dispatch(Product_Delete_Success());
  } catch (err) {
    dispatch(Product_Delete_Fail(err));
  }
};