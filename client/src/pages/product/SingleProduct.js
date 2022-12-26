import React, { useEffect } from 'react'
import { getSingleProduct } from '../../redux/product/ApiCalls';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import './styles/SingleProduct.scss'
import ProductImages from '../../components/ProductImages';
import FormatPrice from '../../util/FormatPrice';
import { MdSecurity } from "react-icons/md";
import { TbTruckDelivery, TbReplace } from "react-icons/tb";
import Star from '../../components/Star';
import AddToCart from '../../components/AddToCart';

function SingleProduct() {

    const dispatch = useDispatch();
    const { id } = useParams();

    const singleProduct = useSelector((state) => state.product);
    let { loading, error, product } = singleProduct;

    console.log(product);

    useEffect(() => {
        loading = singleProduct.loading;
        error = singleProduct.error;
        product = singleProduct.product;
        getSingleProduct(dispatch, id);
    }, [dispatch, id]);

    if (loading) return (<div>Loading the Product</div>);
    if (error) return (<div>Error Loading Featured Products</div>);


    return (
        <section id="single-product">
            <div className="container cnt">
                <div className="grid grid-two-column">
                    <div className="product_images">
                        <ProductImages imgs={product.images} />
                    </div>
                    <div className="product-data">
                        <h2>{product.name}</h2>
                        <Star rating={product.rating} reviews={5} />

                        <p className="product-data-price">
                            MRP: &nbsp;
                            <del>
                                <FormatPrice price={product.price + 20} />
                            </del>
                        </p>
                        <p className="product-data-price product-data-real-price">
                            Deal of the Day: <FormatPrice price={product.price} />
                        </p>
                        <p>{product.description}</p>
                        <div className="product-data-warranty">
                            <div className="product-warranty-data">
                                <TbTruckDelivery className="warranty-icon" />
                                <p>Free Delivery</p>
                            </div>

                            <div className="product-warranty-data">
                                <TbReplace className="warranty-icon" />
                                <p>30 Days Replacement</p>
                            </div>

                            <div className="product-warranty-data">
                                <TbTruckDelivery className="warranty-icon" />
                                <p>A+ Delivery</p>
                            </div>

                            <div className="product-warranty-data">
                                <MdSecurity className="warranty-icon" />
                                <p>2 Year Warranty </p>
                            </div>
                        </div>

                        <div className="product-data-info">
                            <p>
                                Available:
                                <span> {product.stock > 0 ? "In Stock" : "Not Available"}</span>
                            </p>
                            <p>
                                Brand :<span> {product.company} </span>
                            </p>
                        </div>
                        <hr />
                        {product.stock > 0 && <AddToCart product={product} />}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SingleProduct