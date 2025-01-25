import React from 'react'

// import MUI icons
import GridOnIcon from '@mui/icons-material/GridOn';
import ListAltIcon from '@mui/icons-material/ListAlt';
import AutoAwesomeMotionOutlinedIcon from '@mui/icons-material/AutoAwesomeMotionOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';

function Navigation() {
   return (
      <section id="navigation" className='Navigation'>
         <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top m-5 mt-5 rounded">
            <div className="container-fluid py-4">

               {/* buttons */}
               <div className="btn-toolbar mx-5" role="toolbar" aria-label="Toolbar with button groups">
                  <div className="btn-group mr-2" role="group" aria-label="First group">
                     <button type="button" className="btn btn-secondary" alt="List"><ListAltIcon/></button>
                     <button type="button" className="btn btn-secondary"><GridOnIcon/></button>
                     <button type="button" className="btn btn-secondary"><AutoAwesomeMotionOutlinedIcon/></button>
                     <button type="button" className="btn btn-secondary"><SettingsOutlinedIcon/></button>
                  </div>
               </div>

               {/* navigation */}
               <div className="collapse navbar-collapse" id="navbarResponsive">
                  <ul className="navbar-nav ml-auto">
                     <li className="nav-item active">
                        <a className="nav-link text-light" href="/">Kokpit</a>
                     </li>
                     <li className="nav-item">
                        <a className="nav-link text-light" href="/instances">Instancje</a>
                     </li>
                     <li className="nav-item">
                        <a className="nav-link text-light" href="/images">Obrazy</a>
                     </li>
                     <li className="nav-item">
                        <a className="nav-link text-light" href="/containers">Kontenery</a>
                     </li>
                     <li className="nav-item">
                        <a className="nav-link text-light" href="/raw">API</a>
                     </li>
                  </ul>
               </div>

               {/* brand */}
               <h1 className="text-light ms-auto mx-5">dockdash</h1>

               {/* mobile toggler */}
               <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
               </button>

            </div>
         </nav>
      </section>
   );
}

export default Navigation;
