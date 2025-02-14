import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router-dom";

// import custom components
import Author from "./pages/Author.js";
import Dashboard from "./pages/Dashboard.js";
import Resources from "./pages/Resources.js";
import Images from "./pages/Images.js";
import Instances from "./pages/Instances.js";
import Containers from "./pages/Containers.js";

export default function App() {
   return (
      <div className="App">
         <BrowserRouter>
            <main id="main">
               <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/author" element={<Author />} />
                  <Route path="/images" element={<Images />} />
                  <Route path="/instances" element={<Instances />} />
                  <Route path="/containers" element={<Containers />} />
                  <Route path="/resources" element={<Resources />} />
               </Routes>
            </main>
         </BrowserRouter>
      </div>
   );
}
