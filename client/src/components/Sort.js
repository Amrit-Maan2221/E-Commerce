import './styles/Sort.scss';
import { BsFillGridFill, BsList } from "react-icons/bs";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Set_Sort } from '../redux/product/ProductsSlice';

const Sort = ({ gridView }) => {
  const dispatch = useDispatch();

  let { error, loading, filteredProducts, sort} = useSelector((state) => state.products);
  const [sorting, setSorting] = useState(sort);

  useEffect(() => {
    dispatch(Set_Sort(sorting))
  }, [sorting])
  

  function setGridView() {
    gridView[1](true);
  }

  function setListView() {
    gridView[1](false);
  }

  return (
    <section id="sort-section" className="sort-section">
      {/* 1st column  */}
      <div className="sorting-list--grid">
        <button
          className={gridView[0] ? "active sort-btn" : "sort-btn"}
          onClick={setGridView}>
          <BsFillGridFill className="icon" />
        </button>

        <button
          className={!gridView[0] ? "active sort-btn" : " sort-btn"}
          onClick={setListView}>
          <BsList className="icon" />
        </button>
      </div>

      {/* 2nd column  */}
      <div className="product-data">
        <p>{`${filteredProducts.length} Products Available`}</p>
      </div>

       {/* 3rd column  */}
       <div className="sort-selection">
        <form action="#">
          <label htmlFor="sort"></label>
          <select
            name="sort"
            id="sort"
            className="sort-selection--style"
            onChange={(e) => setSorting(e.target.value)} value={sorting}>
            <option value="">Sort on Price</option>
            <option value="#" disabled></option>
            <option value="lowest">Price(lowest)</option>
            <option value="#" disabled></option>
            <option value="highest">Price(highest)</option>
            <option value="#" disabled></option>
            <option value="a-z">Price(a-z)</option>
            <option value="#" disabled></option>
            <option value="z-a">Price(z-a)</option>
          </select>
        </form>
      </div>
    </section>
  );
};

export default Sort;