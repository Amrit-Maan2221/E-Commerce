import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Change_filter} from '../redux/product/ProductsSlice';
import { FaCheck } from "react-icons/fa";
import './styles/FilterSection.scss'
import FormatPrice from '../util/FormatPrice';

function FilterSection() {
  const dispatch = useDispatch();
  let {filter, products, sort} = useSelector((state) => state.products);
  const [keyword, setKeyword] = useState(filter.keyword);
  const [category, setCategory] = useState(filter.category);
  const [company, setCompany] = useState(filter.company);
  const [color, setColor] =  useState(filter.color);
  const [price, setPrice] = useState(filter.price);

  console.log(sort);

  function clearFilters(){
    setKeyword("");
    setCategory("all");
    setCategory("all");
    setColor("all");
    setPrice(0);
  }

  useEffect(() => {
    dispatch(Change_filter({...filter, keyword, category, company, color, price}));
  }, [keyword, category, company, color, price]);

    // get the unique values of each property
    const getUniqueData = (data, attr) => {
      let newVal = data.map((curElem) => {
        return curElem[attr];
      });
      if (attr === "colors") {
        newVal = newVal.flat();
      }
      return (newVal = ["all", ...new Set(newVal)]);
    };

      // we need to have the individual data of each in an array format
    const categoryData = getUniqueData(products, "category");
    const companyData = getUniqueData(products, "company");
    const colorsData = getUniqueData(products, "colors");


  return (
    <section id="products-filter-section">
            <div className="filter-search">
        <form onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            name="text"
            placeholder="Search"
            value={keyword}
            onChange={e => setKeyword(e.target.value)}
          />
        </form>
      </div>

      <div className="filter-category">
        <h3>Category</h3>
        <div>
          {categoryData.map((curElem, index) => {
            return (
              <button
                key={index}
                type="button"
                name="category"
                value={curElem}
                className={curElem === category ? "active" : ""}
                onClick={e => setCategory(e.target.value)}>
                {curElem}
              </button>
            );
          })}
        </div>
      </div>

      <div className="filter-company">
        <h3>Company</h3>

        <form action="#">
          <select value={company}
            name="company"
            id="company"
            className="filter-company--select"
            onChange={(e) => setCompany(e.target.value)}>
            {companyData.map((curElem, index) => {
              return (
                <option  key={index} value={curElem} name="company">
                  {curElem}
                </option>
              );
            })}
          </select>
        </form>
      </div>

      <div className="filter-colors colors">
        <h3>Colors</h3>

        <div className="filter-color-style">
          {colorsData.map((curColor, index) => {
            if (curColor === "all") {
              return (
                <button
                  key={index}
                  type="button"
                  value={curColor}
                  name="color"
                  className="color-all--style"
                  onClick={e => setColor(e.target.value)}>
                  all
                </button>
              );
            }
            return (
              <button
                key={index}
                type="button"
                value={curColor}
                name="color"
                style={{ backgroundColor: curColor }}
                className={color === curColor ? "btnStyle active" : "btnStyle"}
                onClick={e => setColor(e.target.value)}>
                {color === curColor ? <FaCheck className="checkStyle" /> : null}
              </button>
            );
          })}
        </div>
      </div>


      <div className="filter_price">
        <h3>Price</h3>
        <p>
          <FormatPrice price={price} />
        </p>
        <input
          type="range"
          name="price"
          min={0}
          max={100000}
          value={price}
          onChange={e => setPrice(e.target.value)}
        />
      </div>
      <div className="filter-clear">
        <button className="btn" onClick={clearFilters}>
          Clear Filters
        </button>
      </div>
    </section>
  )
}

export default FilterSection