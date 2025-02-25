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
         <div className="row m-0 p-5" /> {/* empty row just for margin */}
         <div className="row m-5">
            <div className="col-lg-12 col-md-7 col-12 rounded">
               <div className="row">
                  <div className="col-5 p-5 bg-warning rounded-3">
                     <h3 className="d-flex align-items-center">
                        <AccountBoxIcon />
                        &nbsp;Autor
                     </h3>

                     <p className="h3 fw-bold">
                        Krzysztof{" "}
                        <text className="text-muted">Matuszewski</text>
                     </p>

                     <div className="mt-1 mb-4">
                        <a
                           href="mailto:krzysiekmatuszewski@outlook.com"
                           className="btn btn-dark me-2"
                        >
                           <MailOutlineIcon />
                           &nbsp;&nbsp; Email
                        </a>

                        <a
                           href="https://github.com/matuszewski"
                           target="_blank"
                           rel="noopener noreferrer"
                           className="btn btn-dark me-2"
                        >
                           <GitHubIcon />
                           &nbsp;&nbsp; GitHub
                        </a>
                     </div>

                     <p className="text-dark mb-2">AHE Łódź 2024/2025</p>
                     <p className="text-dark mb-2">
                        Część projektowa pracy magisterskiej
                     </p>
                  </div>

                  <div className="col-4 p-5 bg-light rounded-3">
                     <table className="table table-light table-hover">
                        <tbody>
                           <tr>
                              <th className="p-2 small" scope="row">
                                 stopień
                              </th>
                              <td className="p-2 small">II</td>
                           </tr>
                           <tr>
                              <th className="p-2 small" scope="row">
                                 kierunek
                              </th>
                              <td className="p-2 small">informatyka</td>
                           </tr>
                           <tr>
                              <th className="p-2 small" scope="row">
                                 specializacja
                              </th>
                              <td className="p-2 small">
                                 sieci teleinformatyczne
                              </td>
                           </tr>
                           <tr>
                              <th className="p-2 small" scope="row">
                                 rok
                              </th>
                              <td className="p-2 small">II</td>
                           </tr>
                           <tr>
                              <th className="p-2 small" scope="row">
                                 semestr
                              </th>
                              <td className="p-2 small">3</td>
                           </tr>
                           <tr>
                              <th className="p-2 small" scope="row">
                                 numer indeksu
                              </th>
                              <td className="p-2 small">160802</td>
                           </tr>

                           <tr>
                              <th className="p-2 small" scope="row">
                                 promotor
                              </th>
                              <td className="p-2 small">
                                 dr inż. Mateusz Zieliński
                              </td>
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
