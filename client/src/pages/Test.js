import React, { useEffect, useState } from "react";
import "./style/Test.scss";
import { useSelector, useDispatch } from "react-redux";
import { getAllProducts } from "../redux/product/ApiCalls";

const Test = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    getAllProducts(dispatch);
  }, []);

  return (
  <></>
  );
};

export default Test;