import { useState } from "react";
import FilterSection from "../../components/FilterSection";
import ProductList from "../../components/ProductList";
import Sort from "../../components/Sort";
import './styles/Products.scss'

const Products = () => {
  
  const gridView = useState(true);

  return (
    <section id="products-data">
      <div className="container grid grid-filter-column">
        <div>
          <FilterSection />
        </div>

        <section className="product-view--sort">
          <div className="sort-filter">
            <Sort gridView={gridView}/>
          </div>
          <div className="main-product">
            <ProductList gridView={gridView} />
          </div>
        </section>
      </div>
    </section>
  );
};

export default Products;