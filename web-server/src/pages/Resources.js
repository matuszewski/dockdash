import React from 'react'

// import navigation and footer components
import Navigation from "../components/Navigation.js"
import Footer from "../components/Footer.js"

// import mui icons
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import GitHubIcon from '@mui/icons-material/GitHub';

function Resources() {
  return (
    <div className='Resources'>

      <Navigation/>

      <div class="row m-0 m-sm-5">
        <div class="col-12 col-xl-12">
          <div class="card card-body border-0 shadow mb-4 text-start p-5">
            <h4 class="h4 mb-4"><strong>Zasoby</strong></h4>
            <p class="h1 fw-bold">Krzysztof <text class="text-muted">Matuszewski</text></p>
          </div>
        </div>
      </div>

      <Footer/>


    </div>
  );
}

export default Resources;
