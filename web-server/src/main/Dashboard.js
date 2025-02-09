import React, { useEffect, useState } from 'react';

// import navigation and footer components
import Navigation from "../components/Navigation.js"
import Footer from "../components/Footer.js"

// TODO: remove importing other componenets (other componenets should be )
import Banner from "../components/Banner.js"
import Instances from "../components/Instances.js"
import Images from "../components/Images.js"
import Containers from "../components/Containers.js"

// importing pages
import Raw from "../pages/Raw.js"

// import config file for getting API server settings // TODO: check if this is needed
import config from "../config.json";

export default function Main() {
    return (
      <section className="Dashboard">
         <Navigation/>

         {/* inserting desired page here */}
         <Raw/>

         <Footer/>
      </section>
   );
}
