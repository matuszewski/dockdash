import React, { useState } from 'react'
import { BrowserRouter } from 'react-router-dom';
import { Route, Routes, Link} from "react-router-dom"

// import custom components
import Author from "./pages/Author.js"
import Dashboard from "./pages/Dashboard.js"
import Raw from "./pages/Raw.js"

export default function App() {
   const [activePane, setActivePane] = useState('dashboard');

   return (
      <div className="App">
         <BrowserRouter>
            <main id="main">
               <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/author" element={<Author />} />
                  <Route path="/raw" element={<Raw />} />

               </Routes>
            </main>
         </BrowserRouter>
      </div>
   )
}
