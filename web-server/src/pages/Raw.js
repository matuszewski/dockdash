import React, { useEffect, useState } from 'react';

// import config file
import config from "../config.json";

// import custom components
import Navigation from "../components/Navigation.js"
import Footer from "../components/Footer.js"

function Raw() {
   const [loaded, setLoaded] = useState(false)

   const [instances, setInstances] = useState('');
   const [images, setImages] = useState({});
   const [containers, setContainers] = useState({}); // TODO: change as now only single instace of docker data is added here

   useEffect(() => {
      const dataFetch = async () => {
         const instances_response = await(await fetch(`http://${config.API_SERVER_IP}:${config.API_SERVER_PORT}/api/instances`)).json();
         const instance_response = await(await fetch(`http://${config.API_SERVER_IP}:${config.API_SERVER_PORT}/api/wyse/containers`)).json();
         const instance_images_response = await(await fetch(`http://${config.API_SERVER_IP}:${config.API_SERVER_PORT}/api/wyse/images`)).json();

         // TODO: flow:
         // for instance
            // check if is accessible
               // if yes
                  // get instace data and append to object array
               // if not
                  // continue

         setInstances(JSON.stringify(instances_response, null, 2));
         setContainers(JSON.stringify(instance_response, null, 2));

         setImages(JSON.stringify(instance_images_response, null, 2));

         setLoaded(true);
     };
     dataFetch();
   }, [])

   if (!loaded) return (
      <div className="Raw" class="row m-0 m-sm-5">
         <div class="col-12 col-xl-4">
            <div class="card card-body shadow text-start border-0 p-4 mb-4">
            <h5 class="h5 mb-2"><strong>Ładowanie</strong></h5>
               <table class="table">
                  <tbody>
                     <tr class="p-0 m-0">
                        <td class="border-0 p-0 m-0">Jeśli ładowanie trwa zbyt długo sprawdź ustawienia adresu serwera API oraz czy jest włączony.</td>
                     </tr>
                  </tbody>
               </table>
            </div>
         </div>
      </div>
   );

   return (
      <section className='Raw'>
         
         <Navigation/>
         
         <div className="row m-5 p-5" />
         
         <div className="row m-5">
           

            <div className='col-md-3 m-1 p-5 bg-dark rounded-3 text-light'>
               <h1>Status API</h1>
               <pre>
                  <code>
                     {instances}
                  </code>
               </pre>
            </div>

            <div className='col-md-8 m-1 p-5 bg-success rounded-3 text-light'>
               <h1>Kontenery</h1>
               <pre>
                  <code>
                     {containers}
                  </code>
               </pre>
            </div>


            <div className='col-md-8 m-1 p-5 bg-success rounded-3 text-light'>
               <h1>Obrazy</h1>
               <pre>
                  <code>
                     {images}
                  </code>
               </pre>
            </div>

         </div>

         <Footer />

      </section>
   );
}

export default Raw;
