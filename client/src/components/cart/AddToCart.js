import { useState } from "react";
import { FaCheck } from "react-icons/fa";
import CartAmountToggle from "./CartAmountToggle";
import { NavLink } from "react-router-dom";
import "./styles/AddToCart.scss"
import { useDispatch } from "react-redux";
import { Add_to_Cart } from "../../redux/cart/CartSlice";

const AddToCart = ({ product }) => {
  //   const { addToCart } = useCartContext();
  const dispatch = useDispatch();
  const { _id, colors, stock } = product;

  const [color, setColor] = useState(colors[0]);
  const [amount, setAmount] = useState(1);

  const setDecrease = () => {
    amount > 1 ? setAmount(amount - 1) : setAmount(1);
  };

  const setIncrease = () => {
    amount < stock ? setAmount(amount + 1) : setAmount(stock);
  };

  function addToCart(_id, color, amount, product) {
    dispatch(Add_to_Cart({_id, color, amount, product}));
  }

  console.log('Product in Add to Cart Component is ', product)


  return (
    <section id="add-to-cart">
      <div className="colors">
        <p>
          Color:
          {colors.map((curColor, index) => {
            return (
              <button
                key={index}
                style={{ backgroundColor: curColor }}
                className={color === curColor ? "btnStyle active" : "btnStyle"}
                onClick={() => setColor(curColor)}>
                {color === curColor ? <FaCheck className="checkStyle" /> : null}
              </button>
            );
          })}
        </p>
      </div>

      {/* add to cart  */}
      <CartAmountToggle
        amount={amount}
        setDecrease={setDecrease}
        setIncrease={setIncrease}
      />

      <NavLink to="/cart"
        onClick={() => addToCart(_id, color, amount, product)}
      >
        <button className="btn">Add To Cart</button>
      </NavLink>
    </section>
  );
};

export default AddToCart;