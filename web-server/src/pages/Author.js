import React from "react";

// import navigation and footer components
import Navigation from "../components/Navigation.js";
import Footer from "../components/Footer.js";

// import icons
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import GitHubIcon from "@mui/icons-material/GitHub";
import AccountBoxIcon from "@mui/icons-material/AccountBox";

function Author() {
   return (
      <div className="Author">
         <Navigation />
         <div className="row m-5 p-5" /> {/* empty row just for margin */}
         <div className="row m-5">
            <div className="col-lg-12 col-md-7 col-12">
               <div className="row">
                
                <div className="col-3 p-5 bg-light rounded-3">

               <h1 className="d-flex align-items-center">
                     <AccountBoxIcon />
                     &nbsp;Autor
                  </h1>

                  <p class="h1 fw-bold">
                     Krzysztof <text class="text-muted">Matuszewski</text>
                  </p>

                  <div class="mt-1 mb-4">
                     <button type="button" class="btn btn-dark me-2">
                        <MailOutlineIcon />&nbsp;&nbsp; Email
                     </button>
                     <button type="button" class="btn btn-dark me-2">
                        <GitHubIcon /> &nbsp;&nbsp; GitHub {/* TODO: add link here and above */}
                     </button>
                  </div>

                  <p class="text-dark mb-2">AHE Łódź 2024/2025</p>
                  <p class="text-dark mb-2">Część projektowa pracy magisterskiej.</p>


</div>




                  <div className="col-3 p-5 bg-light rounded-3">
                     <table class="table table-light table-hover">
                        <tbody>
                           <tr>
                              <th className="p-3" scope="row">stopień</th>
                              <td className="p-3">II</td>
                           </tr>
                           <tr>
                              <th className="p-3" scope="row">kierunek</th>
                              <td className="p-3">informatyka</td>
                           </tr>
                           <tr>
                              <th className="p-3" scope="row">specializacja</th>
                              <td className="p-3">sieci teleinformatyczne</td>
                           </tr>
                           <tr>
                              <th className="p-3" scope="row">rok</th>
                              <td className="p-3">II</td>
                           </tr>
                           <tr>
                              <th className="p-3" scope="row">semestr</th>
                              <td className="p-3">3</td>
                           </tr>
                           <tr>
                              <th className="p-3" scope="row">numer indeksu</th>
                              <td className="p-3">160802</td>
                           </tr>
                        </tbody>
                     </table>
                  </div>

               </div>
            </div>
         </div>
         <Footer />
      </div>
   );
}

export default Author;
