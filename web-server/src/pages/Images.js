import React, { useEffect, useState } from "react";

// import config file
import config from "../config.json";

// import navigation and footer components
import Navigation from "../components/Navigation.js";
import Footer from "../components/Footer.js";
import Loading from "../components/Loading.js";

// import icons
import GridViewIcon from "@mui/icons-material/GridView";

function Images() {
   const [loaded, setLoaded] = useState(false);
   const [images, setImages] = useState([]);

   useEffect(() => {
      const dataFetch = async () => {
         const images_response = await await fetch(
            `http://${config.API_SERVER_IP}:${config.API_SERVER_PORT}/api/local/images`
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
         <Loading />
      );

   return (
      <div className="Images">
         <Navigation />
         <div className="row m-0 p-5" /> {/* empty row just for margin */}
         <div className="row m-5">
            {/* images */}
            <div className="col-lg-12 col-md-12 col-12">
               <div className="p-4 my-3 bg-dark rounded-3 text-light">
                  <h3 className="d-flex align-items-center">
                     <GridViewIcon />
                     &nbsp;Obrazy
                  </h3>
               </div>

               <div className="p-4 bg-dark rounded-3 text-light">
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
