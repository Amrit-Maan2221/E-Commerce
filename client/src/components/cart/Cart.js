import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { useUser } from '../../custom hooks/useUser';
import CartItem from './CartItem';
import { Cart_Item_Price_Total, ClearCart } from '../../redux/cart/CartSlice';
import FormatPrice from '../../util/FormatPrice';
import StripeCheckout from "react-stripe-checkout";
import { useNavigate } from 'react-router-dom';
import './styles/Cart.scss';
import { useEffect, useState } from 'react';
import { axoisInstance } from '../../util/ApiBaseUrlInstance';

function Cart() {
    const [stripeToken, setStripeToken] = useState(null);
    const user = useUser();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { cartItems, shippingInfo, total_price, total_item } = useSelector((state) => state.cart);


    dispatch(Cart_Item_Price_Total());

    const onToken = (token) => {
        setStripeToken(token);
    };

    useEffect(() => {
        const makeRequest = async () => {
            try {
                const res = await axoisInstance.post("/stripe/payment", {
                    tokenId: stripeToken.id,
                    amount: (shippingInfo.shippingFee + total_price) / 100
                });
                console.log(res);
                navigate("/success");
            } catch (err) {
                console.log(err);
            }
        };
        stripeToken && makeRequest();
    }, [stripeToken]);

    return (
        <section id="cart">
            <div className="container">
                {user && (
                    <div className="cart-user--profile">
                        <img src="https://images.unsplash.com/photo-1513789181297-6f2ec112c0bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1888&q=80" alt={user.name} />
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
                    {(total_price > 0) &&
                        <button className="btn btn-clear" onClick={() => dispatch(ClearCart())}>
                            clear cart
                        </button>
                    }
                </div>
                {(total_price > 0) &&
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
                }
                {(total_price > 0) &&
                    <div className='btn-checkout'>
                        <StripeCheckout
                            name="A-Plus"
                            image="https://images.unsplash.com/photo-1513789181297-6f2ec112c0bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1888&q=80"
                            billingAddress
                            shippingAddress
                            description={`Your total is ${(shippingInfo.shippingFee + total_price) / 100}`}
                            amount={shippingInfo.shippingFee + total_price}
                            token={onToken}
                            stripeKey="pk_test_51MK2kjE0gaXUvxYfoI3ZkgHQdWQq9t1I4vlvgtu7NrFKcEgWdyRrNDA9CMnYbiFOjnV9c9Tqsrw8bceQq9xW6myL002aMKpc62"
                        >
                            <button className="btn" onClick={() => dispatch(ClearCart())}>
                                Checkout
                            </button>
                        </StripeCheckout>
                    </div>
                }


            </div>
        </section>
    )
}

export default Cart