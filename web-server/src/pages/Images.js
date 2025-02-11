import React, { useEffect, useState } from "react";

// import config file
import config from "../config.json";

// import navigation and footer components
import Navigation from "../components/Navigation.js";
import Footer from "../components/Footer.js";

// import icons
import GridViewIcon from "@mui/icons-material/GridView";

function Images() {
   const [loaded, setLoaded] = useState(false);
   const [images, setImages] = useState([]);

   useEffect(() => {
      const dataFetch = async () => {
         const images_response = await await fetch(
            `http://${config.API_SERVER_IP}:${config.API_SERVER_PORT}/api/wyse/images`
         );

         const fetched_images = await images_response.json();

         if (Array.isArray(fetched_images)) {
            setImages(fetched_images); // set fetched_images as array
            //setImages(JSON.stringify(instance_response, null, 2)); // set fetched_images as string
         } else {
            console.error(
               "fetching images from API failed, array was expected but got:",
               fetched_images
            );
            setImages([]); // preventing rendering issues, setting empty array
         }

         setLoaded(true);
      };
      dataFetch();
   }, []);

   if (!loaded)
      return (
         <div className="Images" class="row m-0 m-sm-5">
            <div class="col-12 col-xl-4">
               <div class="card card-body shadow text-start border-0 p-4 mb-4">
                  <h5 class="h5 mb-2">
                     <strong>Ładowanie</strong>
                  </h5>
                  <table class="table">
                     <tbody>
                        <tr class="p-0 m-0">
                           <td class="border-0 p-0 m-0">
                              Jeśli ładowanie trwa zbyt długo sprawdź ustawienia
                              adresu serwera API oraz czy jest włączony.
                           </td>
                        </tr>
                     </tbody>
                  </table>
               </div>
            </div>
         </div>
      );

   return (
      <div className="Images">
         <Navigation />
         <div className="row m-5 p-5" /> {/* empty row just for margin */}
         <div className="row m-5">
            {/* images */}
            <div className="col-lg-12 col-md-12 col-12">
               <div className="p-5 my-3 bg-dark rounded-3 text-light">
                  <h1 className="d-flex align-items-center">
                     <GridViewIcon />
                     &nbsp;Obrazy
                  </h1>
               </div>

               <div className="p-5 bg-dark rounded-3 text-light">
                  <table class="table table-dark table-hover">
                     <thead>
                        <tr>
                           <th scope="col">ID</th>
                           <th scope="col">Nazwa</th>
                           <th scope="col">Tag</th>
                           <th scope="col" className="text-end">
                              Rozmiar
                           </th>
                           <th scope="col" className="text-end">
                              Utworzony
                           </th>
                        </tr>
                     </thead>
                     <tbody>
                        {images.map((image, index) => (
                           <tr key={index}>
                              <td>{image.id_short}</td>
                              <td>{image.name}</td>
                              <td>
                                 <a
                                    href={image.tag}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                 >
                                    {image.tag}
                                 </a>
                              </td>
                              <td className="text-end">{image.size} MB</td>
                              <td className="text-end">{image.created}</td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               </div>
            </div>
         </div>
         <Footer />
      </div>
   );
}

export default Images;
