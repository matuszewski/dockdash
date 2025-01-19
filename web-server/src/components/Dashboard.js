import React, { useEffect, useState } from 'react';

// import custom components
import Navigation from "./Navigation.js"
import Footer from "./Footer.js"

import Banner from "./Banner.js"
import Instances from "./Instances.js"
import Images from "./Images.js"
import Containers from "./Containers.js"

// import config file for getting API server settings
import config from "../config.json";

export default function Devices() {
    return (
      <section className="Dashboard p-5 m-5">
         <Navigation/>
         <Banner/>
         <Instances/>
         <Images/>
         <Containers/>
         <Footer/>
      </section>
   );
}
