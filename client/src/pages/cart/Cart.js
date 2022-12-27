import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { useUser } from '../../auth/useUser';
import CartItem from '../../components/CartItem';
import { Cart_Item_Price_Total, ClearCart } from '../../redux/cart/CartSlice';
import FormatPrice from '../../util/FormatPrice';
import './styles/Cart.scss'

function Cart() {
    const user = useUser();
    const dispatch = useDispatch();
    const { cartItems, shippingInfo, total_price, total_item } = useSelector((state) => state.cart);

    dispatch(Cart_Item_Price_Total());

    return (
        <section id="cart">
            <div className="container">
                {user && (
                    <div className="cart-user--profile">
                        <img src={user.profile} alt={user.name} />
                        <h2 className="cart-user--name">{user.firstname}</h2>
                    </div>
                )}

                <div className="cart_heading grid grid-five-column">
                    <p>Item</p>
                    <p className="cart-hide">Price</p>
                    <p>Quantity</p>
                    <p className="cart-hide">Subtotal</p>
                    <p>Remove</p>
                </div>
                <hr />

                <div className="cart-item">
                    {cartItems.length === 0 ?
                        <div className='msg-div'>
                            <h3>No Cart in Item </h3>
                        </div>
                        :
                        cartItems.map((curElem) => {
                            return <CartItem key={curElem.id} {...curElem} />;
                        })
                    }
                </div>
                <hr />

                <div className="cart-two-button">
                    <NavLink to="/products">
                        <button className="btn"> continue Shopping </button>
                    </NavLink>
                    <button className="btn btn-clear" onClick={() => dispatch(ClearCart())}>
                        clear cart
                    </button>
                </div>
                
                 {/* order total_amount */}
                <div className="order-total--amount">
                <div className="order-total--subdata">
                    <div>
                    <p>subtotal:</p>
                    <p>
                        <FormatPrice price={total_price} />
                    </p>
                    </div>
                    <div>
                    <p>shipping fee:</p>
                    <p>
                        <FormatPrice price={shippingInfo.shippingFee} />
                    </p>
                    </div>
                    <hr />
                    <div>
                    <p>order total:</p>
                    <p>
                        <FormatPrice price={shippingInfo.shippingFee + total_price} />
                    </p>
                    </div>
                </div>
                </div>

            </div>
        </section>
    )
}

export default Cart