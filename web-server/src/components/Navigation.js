import React from 'react'

// import MUI icons
import GridOnIcon from '@mui/icons-material/GridOn';
import ListAltIcon from '@mui/icons-material/ListAlt';
import AutoAwesomeMotionOutlinedIcon from '@mui/icons-material/AutoAwesomeMotionOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';

function Navigation() {
  return (
    <section id="navigation" className='Navigation'>

        {/* navigation */}
        <nav class="navbar navbar-expand-lg navbar-light bg-light fixed-bottom m-5 mt-4 mb-4 rounded">
            <div class="container">
                <div class="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
                <div class="btn-group mr-2" role="group" aria-label="First group">
                    <button type="button" class="btn btn-secondary" alt="List"><ListAltIcon/></button>
                    <button type="button" class="btn btn-secondary"><GridOnIcon/></button>
                    <button type="button" class="btn btn-secondary"><AutoAwesomeMotionOutlinedIcon/></button>
                    <button type="button" class="btn btn-secondary"><SettingsOutlinedIcon/></button>
                </div>
            </div>

            <a class="navbar-brand" href="#">dockdash</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
            </button>
                <div class="collapse navbar-collapse" id="navbarResponsive">
                    <ul class="navbar-nav ml-auto">
                        <li class="nav-item active">
                            <a class="nav-link" href="#">
                                dockdash<span class="sr-only">(obecne)</span>
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Kontenery</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Sieci</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">API</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </section>
  );
}

export default Navigation;
