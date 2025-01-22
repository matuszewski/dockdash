import React, { useEffect, useState } from 'react';

// import custom components
import Navigation from "../components/Navigation.js"
import Footer from "../components/Footer.js"

import Banner from "../components/Banner.js"
import Instances from "../components/Instances.js"
import Images from "../components/Images.js"
import Containers from "../components/Containers.js"

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
