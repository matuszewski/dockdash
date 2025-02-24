import React from "react";
import { NavLink } from "react-router-dom";

// import MUI icons
import GridOnIcon from "@mui/icons-material/GridOn";
import ListAltIcon from "@mui/icons-material/ListAlt";
import AutoAwesomeMotionOutlinedIcon from "@mui/icons-material/AutoAwesomeMotionOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import GridViewIcon from "@mui/icons-material/GridView";

function Navigation() {
   return (
      <section id="navigation" className="Navigation">
         <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top m-3 rounded">
            <div className="container-fluid py-2">             

               {/* navigation */}
               <div className="collapse navbar-collapse" id="navbarResponsive">
          
                  <ul className="navbar-nav ml-auto">
                     <li className="nav-item active">
                        <NavLink
                           className="nav-link text-light"
                           to="/"
                           activeClassName="active"
                        >
                           <button type="button" className="btn btn-dark d-flex align-items-center">
                              <ListAltIcon />&nbsp;Kokpit
                           </button>
                        </NavLink>
                     </li>
                     <li className="nav-item active">
                        <NavLink
                           className="nav-link text-light"
                           to="/instances"
                           activeClassName="active"
                        >
                           <button type="button" className="btn btn-dark d-flex align-items-center">
                              <AutoAwesomeMotionOutlinedIcon />&nbsp;Instancje
                           </button>
                        </NavLink>
                     </li>
                     <li className="nav-item active">
                        <NavLink
                           className="nav-link text-light"
                           to="/images"
                           activeClassName="active"
                        >
                           <button type="button" className="btn btn-dark d-flex align-items-center">
                              <GridViewIcon />&nbsp;Obrazy
                           </button>
                        </NavLink>
                     </li>
                     <li className="nav-item active">
                        <NavLink
                           className="nav-link text-light"
                           to="/containers"
                           activeClassName="active"
                        >
                           <button type="button" className="btn btn-dark d-flex align-items-center">
                              <GridViewIcon />&nbsp;Kontenery
                           </button>
                        </NavLink>
                     </li>
                     <li className="nav-item active">
                        <NavLink
                           className="nav-link text-light"
                           to="/resources"
                           activeClassName="active"
                        >
                           <button type="button" className="btn btn-dark d-flex align-items-center">
                              <GridViewIcon />&nbsp;Zasoby
                           </button>
                        </NavLink>
                     </li>
                     <li className="nav-item active">
                        <NavLink
                           className="nav-link text-light"
                           to="/author"
                           activeClassName="active"
                        >
                           <button type="button" className="btn btn-dark d-flex align-items-center">
                              <GridViewIcon />&nbsp;Autor
                           </button>
                        </NavLink>
                     </li>
                  </ul>
               </div>

               {/* brand */}
               <h2 className="text-light ms-auto mx-5">dockdash</h2>

               {/* mobile toggler */}
               <button
                  className="navbar-toggler"
                  type="button"
                  data-toggle="collapse"
                  data-target="#navbarResponsive"
                  aria-controls="navbarResponsive"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
               >
                  <span className="navbar-toggler-icon"></span>
               </button>
            </div>
         </nav>
      </section>
   );
}

export default Navigation;
