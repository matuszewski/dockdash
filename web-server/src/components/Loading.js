import React from "react";

// import icons
import HourglassEmptyRoundedIcon from "@mui/icons-material/HourglassEmptyRounded";

function Loading() {
   return (
      <div className="Loading" class="row m-0 m-sm-5">
         <div className="col-6 col-sm-1 col-md-1 col-xl-4 p-5">
            <div className="card card-body text-start border-0 p-5 mb-4"></div>
         </div>

         <div className="col-6 col-sm-10 col-md-10 col-xl-4 p-5">
            <div className="card card-body shadow text-start text-dark border-0 p-5 mb-4">
               <h1 className="pb-3 d-flex align-items-center">
                  <HourglassEmptyRoundedIcon />
                  &nbsp;<b>Ładowanie</b>
               </h1>
               <p>
                  Jeśli ładowanie trwa zbyt długo sprawdź ustawienia adresu
                  serwera API oraz czy jest włączony.
               </p>
            </div>
         </div>

         <div className="col-6 col-sm-1 col-md-1 col-xl-4 p-5">
            <div className="card card-body text-start border-0 p-5 mb-4"></div>
         </div>
      </div>
   );
}

export default Loading;
