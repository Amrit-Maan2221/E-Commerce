import "./styles/ViewList.scss"
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, getAllProducts } from "../../redux/product/ApiCalls";
import Loader from "../common/Loader";
import ConfirmModal from "../common/ConfirmModal";


function ProductList() {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [currObjId, setCurrObjId] = useState(null);
  const [toogleDeleteState, setToogleDeleteState] = useState('no');
  let { error, loading, products } = useSelector((state) => state.products);

  useEffect(() => {
    getAllProducts(dispatch);
  }, [dispatch, toogleDeleteState]);

  const handleDelete = (id) => {
    deleteProduct(dispatch, id);
    toogleDeleteState === 'no' ? setToogleDeleteState('yes') : setToogleDeleteState('no');
  };



  function showConfirmModal(id) {
    setCurrObjId(id);
    setShowModal(true);
  }


  const handleConfirm = (id) => {
    handleDelete(currObjId);
    setShowModal(false);
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  if (loading || error) return <div className="viewList admin"><Loader /></div>


  const columns = [
    { field: "_id", headerName: "ID", width: 400 },
    {
      field: "product",
      headerName: "Product",
      width: 350,
      renderCell: (params) => {
        return (
          <div className="viewListItem">
            <img className="viewListImg" src={params.row.images[0].url} alt="" />
            {params.row.name}
          </div>
        );
      },
    },
    { field: "stock", headerName: "Stock", width: 200 },
    {
      field: "price",
      headerName: "Price",
      width: 200
    },
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <>
            <NavLink to={"/admin/product/" + params.row._id}>
              <button className="viewListEdit">Edit</button>
            </NavLink>
            <DeleteOutline
              className="viewListDelete"
              onClick={() => showConfirmModal(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <>
      <div className="viewList admin">
        <DataGrid
          style={{ fontSize: "2rem" }}
          rows={products}
          disableSelectionOnClick
          columns={columns}
          getRowId={(row) => row._id}
          pageSize={8}
          checkboxSelection
        />
      </div>
      <div>
        {showModal && (
          <ConfirmModal
            message="Are you sure you want to delete this Product?"
            onConfirm={handleConfirm}
            onCancel={handleCancel}
          />
        )}
      </div>
    </>
  )
}

export default ProductList