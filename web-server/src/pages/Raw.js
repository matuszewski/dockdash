import React, { useEffect, useState } from "react";

// import config file
import config from "../config.json";

// import custom components
import Navigation from "../components/Navigation.js";
import Footer from "../components/Footer.js";

function Raw() {
   const [loaded, setLoaded] = useState(false);

   const [instances, setInstances] = useState([]);
   const [images, setImages] = useState([]);
   const [containers, setContainers] = useState([]); // TODO: change as now only single instace of docker data is added here

   useEffect(() => {
      const dataFetch = async () => {
         const instances_response = await (
            await fetch(
               `http://${config.API_SERVER_IP}:${config.API_SERVER_PORT}/api/instances`
            )
         ).json();
         const containers_response = await (
            await fetch(
               `http://${config.API_SERVER_IP}:${config.API_SERVER_PORT}/api/wyse/containers`
            )
         ).json();
         const instance_images_response = await await fetch(
            `http://${config.API_SERVER_IP}:${config.API_SERVER_PORT}/api/wyse/images`
         );
         const data = await instance_images_response.json();
         console.log("Dane zwrócone przez API:", data);

         // TODO: flow:
         // for instance
         // check if is accessible
         // if yes
         // get instace data and append to object array
         // if not
         // continue

         // SETUP INSTANCES
         setInstances(instances_response);

         // SETUP CONTAINERS
         setContainers(containers_response);

         // SETUP IMAGES
         if (Array.isArray(data)) {
            setImages(data); // set data as array
            //setImages(JSON.stringify(instance_response, null, 2)); // set data as string
         } else {
            console.error("array was expected, got:", data);
            setImages([]); // preventing rendering issues, setting empty array
         }

         //setImages(JSON.stringify(instance_images_response, null, 2));
         //setImages(instance_images_response);

         setLoaded(true);
      };
      dataFetch();
   }, []);

   if (!loaded)
      return (
         <div className="Raw" class="row m-0 m-sm-5">
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
      <section className="Raw">
         <Navigation />

         <div className="row m-5 p-5" />

         <div className="row m-5">

            {/* empty */}
            <div className="col-md-2 m-1 p-5 bg-dark rounded-3 text-light"></div>

            {/* images */}
            <div className="col-md-9 m-1 p-5 bg-dark rounded-3 text-light">
               <table class="table table-dark table-hover">
                  <thead>
                     <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Nazwa</th>
                        <th scope="col">Tag</th>
                        <th scope="col">Rozmiar</th>
                        <th scope="col">Utworzony</th>
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
                           <td>{image.size} MB</td>
                           <td>{image.created}</td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
            
            {/* containers */}
            <div className="col-md-9 m-1 p-5 bg-dark rounded-3 text-light">
               <table class="table table-dark table-hover">
                  <thead>
                     <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Nazwa</th>
                        <th scope="col">Tag</th>
                        <th scope="col">Rozmiar</th>
                        <th scope="col">Utworzony</th>
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
                           <td>{image.size} MB</td>
                           <td>{image.created}</td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>

         </div>

         <div className="row m-5">
            <div className="col-lg-4 col-md-6 col-12">
               <div className="p-5 bg-dark rounded-3 text-light">
                  <h1>Instancje</h1>
                  <pre>
                     <code>{JSON.stringify(instances, null, 2)}</code>
                  </pre>
               </div>
            </div>

            <div className="col-lg-4 col-md-6 col-12">
               <div className="p-5 bg-dark rounded-3 text-light">
                  <h1>Kontenery</h1>
                  <pre>
                     <code>{JSON.stringify(containers, null, 2)}</code>
                  </pre>
               </div>
            </div>


            <div className="col-lg-4 col-md-6 col-12">
               <div className="p-5 bg-dark rounded-3 text-light">
                  <h1>Obrazy</h1>
                  <pre>
                     <code>{JSON.stringify(images, null, 2)}</code>
                  </pre>
               </div>
            </div>

         </div>

         <Footer />
      </section>
   );
}

export default Raw;
