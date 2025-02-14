import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";

// load Bootstrap JS
import "bootstrap/dist/js/bootstrap.bundle.min";

// load Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";

// load custom CSS files
import "./custom.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

// render main application
root.render(<App />);
