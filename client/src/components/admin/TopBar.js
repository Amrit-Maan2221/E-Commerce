import { NavLink } from "react-router-dom";
import "./styles/Topbar.scss";

export default function Topbar() {
  return (
    <div className="topbar admin">
      <div className="topbarWrapper">
        <div className="topLeft">
          <NavLink to='/'><span className="logo">APlus</span></NavLink>
        </div>
        <div className="topRight">
          <NavLink to='/profile'>
            <img src="https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif" alt="" className="topAvatar" />
          </NavLink>
        </div>
      </div>
    </div>
  );
}