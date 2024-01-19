//import react into the bundle
import React from "react";
import createRoot from 'react-dom';

//include your index.scss file into the bundle
import "../../styles/main.scss";

//import your own components
import Layout from "./layout";

//render your react application
const rootElement = document.getElementById("app");
createRoot.render(<Layout />, rootElement);
