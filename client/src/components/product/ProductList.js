import ProductsGridView from './ProductsGridView';
import { useSelector, useDispatch } from "react-redux";
import ProductsListView from './ProductsListView';
import { getAllProducts } from '../../redux/product/ApiCalls';
import { useEffect } from 'react';
import Loader from '../common/Loader';

function ProductList({ gridView}) {
    const dispatch = useDispatch();
    let { error, loading, products, filter, sort, filteredProducts } = useSelector((state) => state.products);

    useEffect(() => {
        getAllProducts(dispatch, filter, sort);  
    }, [dispatch, filter, sort]);

    if (loading) return (<Loader/>);
    if (error) return (<div>Error Loading Featured Products</div>);
    if(filteredProducts.length == 0){
        return (<div style={{margin: "2rem"}}>No Products</div>)
    }
    if (gridView[0] === true) {
        return <ProductsGridView products={filteredProducts} />;
    }

    if (gridView[0] === false) {
        return <ProductsListView products={filteredProducts} />;
    }
}

export default ProductList