import React from "react";

// import icons
import HourglassEmptyRoundedIcon from "@mui/icons-material/HourglassEmptyRounded";

function LoadingAlert() {
   return (
      <div className="card card-body shadow text-start bg-success blinking text-light border-0 m-1 mt-4 pt-4">
         <h4 className="d-flex align-items-center">
            <HourglassEmptyRoundedIcon/>
            &nbsp;<b>Ładowanie</b>
         </h4>
      </div>
   );
}

export default LoadingAlert;
