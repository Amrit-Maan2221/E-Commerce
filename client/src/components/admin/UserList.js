import "./styles/ViewList.scss";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import Loader from "../common/Loader";
import { axoisInstance } from "../../util/ApiBaseUrlInstance";

function UserList() {
  const [users, setUsers] = useState([]);
  const [toogleDeleteState, setToogleDeleteState] = useState('no');

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await axoisInstance.get("users");
        setUsers(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUsers();
    console.log(users)
  }, [toogleDeleteState]);

  const handleDelete = async (id) => {
    try {
      const res = await axoisInstance.delete(`/users/delete/${id}`);
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
    toogleDeleteState === 'no' ? setToogleDeleteState('yes') : setToogleDeleteState('no');
  };


  const columns = [
    { field: "_id", headerName: "ID", width: 350 },
    {
      field: "email",
      headerName: "Email",
      width: 350,
      renderCell: (params) => {
        return (
          <div className="viewListItem">
            <img className="viewListImg"
              src={
                params.row.img ||
                "https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif"
              }
              alt="" />
            {params.row.email}
          </div>
        );
      },
    },
    { field: "username", headerName: "User Name", width: 350 },
    { field: "isVerified", headerName: "Is Verified?", width: 200 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <NavLink to={"/product/" + params.row._id}>
              <button className="viewListEdit">Edit</button>
            </NavLink>
            <DeleteOutline
              className="viewListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];


  return (
    <div className="viewList admin">
      <DataGrid
        style={{ fontSize: "1.5rem" }}
        rows={users}
        disableSelectionOnClick
        columns={columns}
        getRowId={(row) => row._id}
        pageSize={10}
        checkboxSelection
      />
    </div>
  )
}

export default UserList