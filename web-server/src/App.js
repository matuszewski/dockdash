import React, { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { Route, Routes, Link } from "react-router-dom";

// import custom components
import Author from "./pages/Author.js";
import Dashboard from "./main/Dashboard.js";
import Raw from "./pages/Raw.js";
import Resources from "./pages/Resources.js";

export default function App() {
   // TODO: fix it up
   const [activePane, setActivePane] = useState("dashboard");

   return (
      <div className="App">
         <BrowserRouter>
            <main id="main">
               <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/author" element={<Author />} />
                  <Route path="/raw" element={<Raw />} />
                  <Route path="/resources" element={<Resources />} />
               </Routes>
            </main>
         </BrowserRouter>
      </div>
   );
}
