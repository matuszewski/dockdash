import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router-dom";

// import custom components
import Author from "./pages/Author.js";
import Dashboard from "./main/Dashboard.js";
import Raw from "./pages/Raw.js";
import Resources from "./pages/Resources.js";
import Images from "./pages/Images.js";
import Containers from "./pages/Containers.js";

export default function App() {
   return (
      <div className="App">
         <BrowserRouter>
            <main id="main">
               <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/author" element={<Author />} />
                  <Route path="/raw" element={<Raw />} />
                  <Route path="/images" element={<Images />} />
                  <Route path="/containers" element={<Containers />} />
                  <Route path="/resources" element={<Resources />} />
               </Routes>
            </main>
         </BrowserRouter>
      </div>
   );
}
