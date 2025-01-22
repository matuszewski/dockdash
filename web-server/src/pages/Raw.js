import React, { useEffect, useState } from 'react';

// import config file
import config from "../config.json";

// import custom components
import Navigation from "../components/Navigation.js"
import Footer from "../components/Footer.js"

function Raw() {
   const [loaded, setLoaded] = useState(false)
   const [results, setResults] = useState('');

   useEffect(() => {
      const dataFetch = async () => {
         const response = await(await fetch(`http://${config.API_SERVER_IP}:${config.API_SERVER_PORT}/api/instances`)).json();
         //console.log(response.local.ip)
         setResults(JSON.stringify(response, null, 2)); // convert to JSON string with formatting
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

         <div className="row m-3 mt-5">
            <div className='col my-5 rounded-3'>

               <div class="row">
                  <div class="col-md-10 p-5 bg-secondary rounded-3">
                     <h1><b>: :</b> dock<b>dash</b></h1>
                     <p>Część projektowa pracy magisterskiej</p>
                     <table class="table">
                        <tbody>
                           <tr>
                              <td>autor</td>
                              <td>Krzysztof Matuszewski</td>
                           </tr>
                           <tr>
                              <td>indeks</td>
                              <td>160802</td>
                           </tr>
                           <tr>
                              <td>email</td>
                              <td>krzysiekmatuszewski@outlook.com</td>
                           </tr>
                           <tr>
                              <td>github</td>
                              <td>@matuszewski</td>
                           </tr>
                        </tbody>
                     </table>
                  </div>
               </div>

            </div>


            <div className='col my-5 rounded-3'>
               <div class="row">
                  <div class="col-md-6 p-5 bg-secondary rounded-3 text-light">
                     <h1>Status API</h1>
                     <pre>
                        <code>
                           {results}
                        </code>
                     </pre>
                  </div>
               </div>
            </div>

         </div>

         <Footer />
      </section>
   );
}

export default Raw;
