import React, { useState } from 'react'
import { BrowserRouter } from 'react-router-dom';
import { Route, Routes, Link} from "react-router-dom"

// import custom components
import Author from "./components/Author.js"
import Dashboard from "./components/Dashboard.js"

export default function App() {
   const [activePane, setActivePane] = useState('dashboard');

   return (
      <div className="App">
         <BrowserRouter>
            <main id="main" className="bg-light text-dark">
               {/* content */}
               <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/author" element={<Author />} />
               </Routes>
            </main>
         </BrowserRouter>
      </div>
   )
}
