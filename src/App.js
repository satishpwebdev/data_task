import "./App.css";
import Flavanoids from "./components/Flavanoids";
import Gamma from "./components/Gamma";
import React, { useState } from "react";

function App() {
   const [show, setShow] = useState("true");
  
   return (
      <div className="App">
         <header className="App-header">
            <div>
               {show ? <Flavanoids /> : <Gamma />}
               <button className="swapbutton" onClick={()=>{setShow(!show)}}>{show ? "Gamma":"Falvanoids"}</button>
            </div>
         </header>
      </div>
   );
}

export default App;
