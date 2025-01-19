import React from 'react'

// import MUI icons
import GridOnIcon from '@mui/icons-material/GridOn';
import ListAltIcon from '@mui/icons-material/ListAlt';
import AutoAwesomeMotionOutlinedIcon from '@mui/icons-material/AutoAwesomeMotionOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';

function Navigation() {
   return (
      <section id="navigation" className='Navigation'>
         <nav className="navbar navbar-expand-lg navbar-light bg-dark fixed-top m-5 mt-5 rounded">
            <div className="container-fluid bg-danger px-4">

               {/* buttons */}
               <div className="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
                  <div className="btn-group mr-2" role="group" aria-label="First group">
                     <button type="button" className="btn btn-secondary" alt="List"><ListAltIcon/></button>
                     <button type="button" className="btn btn-secondary"><GridOnIcon/></button>
                     <button type="button" className="btn btn-secondary"><AutoAwesomeMotionOutlinedIcon/></button>
                     <button type="button" className="btn btn-secondary"><SettingsOutlinedIcon/></button>
                  </div>
               </div>

               {/* brand */}
               <a className="navbar-brand" href="#">dockdash</a>

               {/* mobile toggler */}
               <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
               </button>

               {/* navigation links */}
               <div className="collapse navbar-collapse" id="navbarResponsive">
                  <ul className="navbar-nav ml-auto">
                     <li className="nav-item active">
                        <a className="nav-link" href="#">Kokpit</a>
                     </li>
                     <li className="nav-item">
                        <a className="nav-link" href="#">Instancje</a>
                     </li>
                     <li className="nav-item">
                        <a className="nav-link" href="#">Obrazy</a>
                     </li>
                     <li className="nav-item">
                        <a className="nav-link" href="#">Kontenery</a>
                     </li>
                     <li className="nav-item">
                        <a className="nav-link" href="#">API</a>
                     </li>
                  </ul>
               </div>

            </div>
         </nav>
      </section>
   );
}

export default Navigation;
