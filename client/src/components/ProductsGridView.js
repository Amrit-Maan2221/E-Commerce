import Product from './Product';
import './styles/ProductsGridView.scss'

function ProductsGridView({ products }) {

  return (
    <section id='products-grid-view' className="section">
    <div className="container grid grid-three-column">
      {products.map((curElem) => {
        return <Product key={curElem._id} {...curElem} />;
      })}
    </div>
  </section>
  )
}

export default ProductsGridView