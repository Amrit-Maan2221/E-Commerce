import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getFeaturedProducts } from '../../redux/product/ApiCalls';
import Product from '../product/Product';
import './styles/FeaturedProducts.scss'

function FeaturedProducts() {
    const dispatch = useDispatch();

    const featureProducts = useSelector((state) => state.featuredProducts);
    
    let {loading, error, featuredProducts} = featureProducts ;

    useEffect(() => {
        loading = featureProducts.loading;
        error = featureProducts.error;
        featuredProducts = featureProducts.featuredProducts;
        getFeaturedProducts(dispatch);
    }, [dispatch]);

    if(loading) return (<div>Loading Featured Products</div>);
    if(error) return (<div>Error Loading Featured Products</div>);
    return (
        <section id="featured-products" className="section">
            <div className="container">
                <div className="intro-data">Check Now!</div>
                <div className="common-heading">Our Feature Services</div>
                <div className="grid grid-three-column">
                    {featuredProducts.length == 0 ? <div> No Featured Products</div>: featuredProducts.map((curElem) => {
                        return <Product key={curElem._id} {...curElem} />;
                    }) }
                </div>
            </div>
        </section>
    )
}

export default FeaturedProducts