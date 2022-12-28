import { NavLink } from 'react-router-dom';
import FormatPrice from '../../util/FormatPrice';
import './styles/ProductsListView.scss'

function ProductsListView({ products }) {
  return (
    <section id='products-list-view' className="section">
            <div className="container grid">
        {products.map((curElem) => {
          const { _id, name, images, price, description } = curElem;
          return (
            <div key={_id} className="card grid grid-two-column">
              <figure>
                <img src={images[0].url} alt={name} />
              </figure>

              <div className="card-data">
                <h3>{name}</h3>
                <p>
                  <FormatPrice price={price} />
                </p>
                <p>{description.slice(0, 90)}...</p>

                <NavLink to={`/singleproduct/${_id}`} className="btn-main">
                  <button className="btn">View Product</button>
                </NavLink>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  )
}

export default ProductsListView;