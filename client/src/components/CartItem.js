import CartAmountToggle from "./CartAmountToggle";
import { FaTrash } from "react-icons/fa";
import FormatPrice from "../util/FormatPrice";
import { useDispatch } from "react-redux";
import { RemoveItem, Set_Decrement, Set_Increment } from "../redux/cart/CartSlice";

const CartItem = ({ _id, name, image, color, price, amount }) => {
  const dispatch = useDispatch();

  return (
    <div className="cart_heading grid grid-five-column">
      <div className="cart-image--name">
        <div>
          <figure>
            <img src={image} alt={name} />
          </figure>
        </div>
        <div>
          <p>{name}</p>
          <div className="color-div">
            <p>color:</p>
            <div
              className="color-style"
              style={{ backgroundColor: color, border: "1px solid black" , color: color }}></div>
          </div>
        </div>
      </div>
      {/* price   */}
      <div className="cart-hide">
        <p>
          <FormatPrice price={price} />
        </p>
      </div>

      {/* Quantity  */}
      <CartAmountToggle
        amount={amount}
        setDecrease={() => dispatch(Set_Decrement(_id))}
        setIncrease={() => dispatch(Set_Increment(_id))}
      />

      {/* //Subtotal */}
      <div className="cart-hide">
        <p>
          <FormatPrice price={price * amount} />
        </p>
      </div>

      <div>
        <FaTrash className="remove_icon" onClick={() => dispatch(RemoveItem(_id))} />
      </div>
    </div>
  );
};

export default CartItem;