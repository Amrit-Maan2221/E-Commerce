import React from "react";
import { NavLink } from "react-router-dom";
import FormatPrice from "../../util/FormatPrice";

const Product = (curElem) => {
  const { _id, name, images, price, category } = curElem;
  const image = images[0].url;
  return (
    <NavLink to={`/singleproduct/${_id}`}>
      <div className="card">
        <figure>
          <img src={image} alt={name} />
          <figcaption className="caption">{category}</figcaption>
        </figure>

        <div className="card-data">
          <div className="card-data-flex">
            <h3>{name}</h3>
            <p className="card-data--price">{<FormatPrice price={price} />}</p>
          </div>
        </div>
      </div>
    </NavLink>
  );
};

export default Product;