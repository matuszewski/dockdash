import React, { useEffect, useState } from 'react';

// importing pages
import Raw from "../pages/Raw.js"

// import config file for getting API server settings // TODO: check if this is needed
import config from "../config.json";

export default function Main() {
    return (
      <section className="Dashboard">

         {/* inserting desired page here */}
         <Raw/>

      </section>
   );
}
