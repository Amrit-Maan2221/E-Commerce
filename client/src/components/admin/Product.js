import './styles/Product.scss';
import { NavLink, useParams } from 'react-router-dom';
import Loader from '../common/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { getSingleProduct, updateProduct } from '../../redux/product/ApiCalls';
import { useEffect, useMemo, useState } from 'react';
import { axoisInstance } from '../../util/ApiBaseUrlInstance';
import Chart from './Chart';
import FormatPrice from '../../util/FormatPrice';
import { useToken } from '../../custom hooks/useToken';

function Product() {
    const dispatch = useDispatch();
    const { id } = useParams();
    const [token, setToken] = useToken();
    const MONTHS = useMemo(
        () => [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Agu",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
        ],
        []
    );
    const singleProduct = useSelector((state) => state.product);
    let { loading, error, product } = singleProduct;
    const [pStats, setPStats] = useState([]);
    const [images, setImages] = useState([]);
    const [featured, setFeatured] = useState(product.featured || false);


    useEffect(() => {
        getSingleProduct(dispatch, id);

        loading = singleProduct.loading;
        error = singleProduct.error;
        product = singleProduct.product;

        const getStats = async () => {
            try {
                const res = await axoisInstance.get("orders/income?pid=" + id);
                const list = res.data.sort((a, b) => {
                    return a._id - b._id
                })
                list.map((item) =>
                    setPStats((prev) => [
                        ...prev,
                        { name: MONTHS[item._id - 1], Sales: item.total },
                    ])
                );
            } catch (err) {
                console.log(err);
            }
        };
        getStats();


    }, [dispatch, id, MONTHS]);

    const createProductImagesChange = (e) => {
        const files = Array.from(e.target.files);

        setImages([]);

        files.forEach((file) => {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImages((old) => [...old, reader.result]);
                }
            };

            reader.readAsDataURL(file);
        });
    };

    
    const updateProductSubmitHandler = async (e) => {
        e.preventDefault();
        let data = {};

        if(e.target.name.value){data.name = e.target.name.value;}
        if(e.target.price.value){data.price = e.target.price.value;}
        if(e.target.description.value){data.description = e.target.description.value;}
        if(e.target.category.value){data.category = e.target.category.value;}
        if(e.target.stock.value){data.stock = e.target.stock.value;}
        if(e.target.company.value){data.company = e.target.company.value;}
        if(images.length){data.images = images;}
        data.featured = featured;
        updateProduct(dispatch, id, token, data);
    };


    if (loading || error) return (<div className='product admin'><Loader /></div>);
    return (
        <div className="product admin">
            <div className="productTitleContainer">
                <h1 className="productTitle">Product</h1>
                <NavLink to="/admin/newproduct">
                    <button className="productAddButton">Create</button>
                </NavLink>
            </div>
            <div className="productTop">
                <div className="productTopLeft">
                    <Chart data={pStats} dataKey="Sales" title="Sales Performance" />
                </div>
                <div className="productTopRight">
                    <div className="productInfoTop">
                        <div className='productImages'>
                            {product.images?.map((curElm, index) => {
                                return (<img
                                    src={curElm.url}
                                    alt=""
                                    className="productInfoImg"
                                    key={index}
                                />)
                            })}
                        </div>
                        <span className="productName">{product.name}</span>
                    </div>
                    <table className="productInfoBottom">
                        <tbody>
                            <tr className="productInfoItem">
                                <th className="productInfoKey">ID:</th>
                                <td className="productInfoValue">{product._id}</td>
                            </tr>

                            <tr className="productInfoItem">
                                <th className="productInfoKey">Price:</th>
                                <td className="productInfoValue"><FormatPrice price={product.price} /></td>
                            </tr>
                            <tr className="productInfoItem">
                                <th className="productInfoKey">Category:</th>
                                <td className="productInfoValue">{product.category?.toUpperCase()}</td>
                            </tr>
                            <tr className="productInfoItem">
                                <th className="productInfoKey">Stock Available:</th>
                                <td className="productInfoValue">{product.stock}</td>
                            </tr>
                            <tr className="productInfoItem">
                                <th className="productInfoKey">Colors Available:</th>
                                {product.colors?.map((curColor, index) => {
                                    return (
                                        <td
                                            key={index}
                                            className="productInfoValue productInfoValueRow">
                                            <div className='productInfoValueColor'
                                                style={{ backgroundColor: curColor }}></div>
                                        </td>
                                    );
                                })}
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="productBottom">
                <form className="productForm" encType="multipart/form-data"
                onSubmit={updateProductSubmitHandler}
                >
                    <div className="productFormLeft">
                        <label htmlFor='name'>Product Name</label>
                        <input type="text" id="name" name="name" placeholder={product.name} />

                        <label htmlFor='description'>Product Description</label>
                        <textarea type="text" name="description"  id="description" placeholder={product.description} />

                        <label htmlFor='price'>Price</label>
                        <input type="text" id='price' name="price" placeholder={product.price}/>

                        <label htmlFor='category'>Category</label>
                        <input type="text" id='category' name="category" placeholder={product.category} />

                        <label htmlFor='company'>Company</label>
                        <input type="text" id='company' name="company" placeholder={product.company}/>


                        <label htmlFor='stock'>Stock</label>
                        <input id='stock' name="stock"
                            type="number"
                            placeholder={product.stock}
                        />

                        <label htmlFor='featured'>
                            <input name='featured' id='featured'
                                type="checkbox"
                                checked={featured}
                                onChange={()=> setFeatured(!featured)}
                            />
                            Featured {product.featured && <span className='productFeaturedText'>(Currently Featured)</span>}
                        </label>
                    </div>
                    <div className="productFormRight">
                        <div className="productUpload">
                            <label htmlFor="file">
                                Change Images
                            </label>
                            <input
                                type="file"
                                name="images"
                                accept="image/*"
                                onChange={createProductImagesChange}
                                multiple
                            />
                        </div>
                        <button className="productButton" type="submit">Update</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Product