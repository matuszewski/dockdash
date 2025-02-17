import React from "react";
import { NavLink } from "react-router-dom";

// import MUI icons
import GridOnIcon from "@mui/icons-material/GridOn";
import ListAltIcon from "@mui/icons-material/ListAlt";
import AutoAwesomeMotionOutlinedIcon from "@mui/icons-material/AutoAwesomeMotionOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";

function Navigation() {
   return (
      <section id="navigation" className="Navigation">
         <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top m-5 mt-5 rounded">
            <div className="container-fluid py-4">
               {/* buttons */}
               <div
                  className="btn-toolbar mx-5"
                  role="toolbar"
                  aria-label="Toolbar with button groups"
               >
                  <div
                     className="btn-group mr-2"
                     role="group"
                     aria-label="First group"
                  >
                     {/* <button
                        type="button"
                        className="btn btn-secondary"
                        alt="List"
                     >
                        <ListAltIcon />
                     </button>
                     <button type="button" className="btn btn-secondary">
                        <GridOnIcon />
                     </button>
                     <button type="button" className="btn btn-secondary">
                        <AutoAwesomeMotionOutlinedIcon />
                     </button>
                     <button type="button" className="btn btn-secondary">
                        <SettingsOutlinedIcon />
                     </button> */}
                  </div>
               </div>

               {/* navigation */}
               <div className="collapse navbar-collapse" id="navbarResponsive">
                  <ul className="navbar-nav ml-auto">
                     <li className="nav-item active">
                        <NavLink
                           className="nav-link text-light"
                           to="/"
                           activeClassName="active"
                        >
                           Kokpit
                        </NavLink>
                     </li>
                     <li className="nav-item">
                        <NavLink
                           className="nav-link text-light"
                           to="/instances"
                           activeClassName="active"
                        >
                           Instancje
                        </NavLink>
                     </li>
                     <li className="nav-item">
                        <NavLink
                           className="nav-link text-light"
                           to="/images"
                           activeClassName="active"
                        >
                           Obrazy
                        </NavLink>
                     </li>
                     <li className="nav-item">
                        <NavLink
                           className="nav-link text-light"
                           to="/containers"
                           activeClassName="active"
                        >
                           Kontenery
                        </NavLink>
                     </li>
                     <li className="nav-item">
                        <NavLink
                           className="nav-link text-light"
                           to="/resources"
                           activeClassName="active"
                        >
                           Zasoby
                        </NavLink>
                     </li>
                     <li className="nav-item">
                        <NavLink
                           className="nav-link text-light"
                           to="/author"
                           activeClassName="active"
                        >
                           Autor
                        </NavLink>
                     </li>
                  </ul>
               </div>

               {/* brand */}
               <h1 className="text-light ms-auto mx-5">dockdash</h1>

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
