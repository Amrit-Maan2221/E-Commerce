import { NavLink } from "react-router-dom";
import "./styles/Topbar.scss";

export default function Topbar() {
  return (
    <div className="topbar admin">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">APlus Admin</span>
        </div>
        <div className="topRight">
          <NavLink to='/profile'>
            <img src="https://images.unsplash.com/photo-1513789181297-6f2ec112c0bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1888&q=80" alt="" className="topAvatar" />
        </NavLink>
        </div>
      </div>
    </div>
  );
}