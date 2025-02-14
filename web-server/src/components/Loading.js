import React from "react";

function Loading() {
   return (
      <div className="Loading" class="row m-0 m-sm-5">
         <div className="col-6 col-xl-4 p-5">
            <div className="card card-body text-start border-0 p-5 mb-4"></div>
         </div>

         <div className="col-6 col-xl-4 p-5">
            <div className="card card-body shadow text-start text-dark border-0 p-5 mb-4">
               <h1 className="pb-3">
                  <b>Ładowanie</b>
               </h1>
               <p>
                  Jeśli ładowanie trwa zbyt długo sprawdź ustawienia adresu
                  serwera API oraz czy jest włączony.
               </p>
            </div>
         </div>

         <div className="col-6 col-xl-4 p-5">
            <div className="card card-body text-start border-0 p-5 mb-4"></div>
         </div>
      </div>
   );
}

export default Loading;
