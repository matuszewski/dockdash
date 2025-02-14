import React, { useEffect, useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";

// import config file
import config from "../config.json";

// import navigation and footer components
import Navigation from "../components/Navigation.js";
import Footer from "../components/Footer.js";
import Loading from "../components/Loading.js";

// import icons
import ViewInArIcon from "@mui/icons-material/ViewInAr";

function Containers() {
   const [loaded, setLoaded] = useState(false);
   const [copiedContainersJSON, setCopiedContainersJSON] = useState(false);
   const [containers, setContainers] = useState([]); // TODO: change as now only single instace of docker data is added here

   useEffect(() => {
      const dataFetch = async () => {
         const containers_response = await await fetch(
            `http://${config.API_SERVER_IP}:${config.API_SERVER_PORT}/api/wyse/containers`
         );

         const fetched_containers = await containers_response.json();

         if (Array.isArray(fetched_containers)) {
            setContainers(fetched_containers); // set fetched_containers as array
            //setImages(JSON.stringify(instance_response, null, 2)); // set fetched_containers as string
         } else {
            console.error(
               "fetching containers from API failed, array was expected but got:",
               fetched_containers
            );
            setContainers([]); // preventing rendering issues, setting empty array
         }

         setLoaded(true);
      };
      dataFetch();
   }, []);

   if (!loaded)
      return (
      <Loading/>
   );

   return (
      <div className="Containers">
         <Navigation />
         <div className="row m-5 p-5" /> {/* empty row just for margin */}
         <div className="row m-5">
            {/* containers */}
            <div className="col-lg-12 col-md-7 col-12">
               <div className="p-5  my-3 bg-dark rounded-3 text-light">
                  <h1 className="d-flex align-items-center">
                     <ViewInArIcon />
                     &nbsp;Kontenery
                  </h1>
               </div>

               <div className="p-5 bg-dark rounded-3 text-light">
                  <table class="table table-dark table-hover">
                     <thead>
                        <tr>
                           <th scope="col">ID</th>
                           <th scope="col">Nazwa</th>
                           <th scope="col">Obraz</th>
                           <th scope="col">Porty</th>
                           <th scope="col">Utworzony</th>
                           <th scope="col">Stan</th>
                        </tr>
                     </thead>
                     <tbody>
                        {containers.map((image, index) => (
                           <tr key={index}>
                              <td>{image.id}</td>
                              <td>{image.name}</td>
                              <td>{image.image}</td>
                              <td className="text-success">{image.ports}</td>
                              <td>{image.created}</td>
                              <td>{image.status}</td>
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

export default Containers;
