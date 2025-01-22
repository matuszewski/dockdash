import React from 'react'

// import mui icons
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import GitHubIcon from '@mui/icons-material/GitHub';

function Author() {
  return (
    <div className='Author'>
      <div class="row m-0 m-sm-5">
        <div class="col-12 col-xl-12">
          <div class="card card-body border-0 shadow mb-4 text-start p-5">
            <h4 class="h4 mb-4"><strong>Autor</strong></h4>
            <p class="h1 fw-bold">Krzysztof <text class="text-muted">Matuszewski</text></p>

            <div class="mt-1 mb-4">
              <button type="button" class="btn btn-dark me-2"><MailOutlineIcon/></button>
              <button type="button" class="btn btn-dark me-2"><GitHubIcon/></button>
            </div>

            <p class="text-muted mb-2">AHE Łódź 2025</p>
            <ol class="list-unstyled mb-0">
              <li class="m-0">
                <p class="m-0">kierunek: <text class="text-muted">informatyka</text></p>
              </li>
              <li class="m-0">
                <p class="m-0">specializacja: <text class="text-muted">sieci teleinformatyczne</text></p>
              </li>
              <li class="m-0">
                <p class="m-0">semestr: <text class="text-muted">3</text></p>
              </li>
              <li class="m-0">
                <p class="m-0">rok: <text class="text-muted">2</text></p>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Author;
