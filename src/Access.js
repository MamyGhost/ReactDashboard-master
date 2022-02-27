import "./App.css";
import { useState } from "react";
import {BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Container from "./components/Container/Container";
import RightNavbar from "./components/RightNavbar/RightNavbar";
import Dashboard from "./components/Dashboard/Dashboard";
import Analytics from "./components/Analytics/Analytics";
import Campaings from "./components/Campaigns/Campaings";
import Team from "./components/Team/Team";
import UserLogin from "./components/Login/UserLogin";
import Details from "./components/Analytics/Details";
import NavContext from "./Context/NavContext";
import App from "./App";


function Access() {
    const [nav, setNav] = useState(false);
    const value = { nav, setNav };
 
  return (
    
    // <div className="Access">
       
    //     <Routes>
    //           {/* <Route path="/" element={<UserLogin />} /> */}
    //           <Route path="/" element={<UserLogin />} />
    //           <Route path="/app" element={<App />} />
    //           <Route path="/app/analytics" element={<Analytics />} />
    //           <Route path="/app/campaings" element={<Campaings />} />
    //           <Route path="/app/team" element={<Team />} />
    //         </Routes>
            
  
            
    // </div>

    <div className="App">
         <NavContext.Provider value={value} >
           <Navbar />
           <Container
             stickyNav={<RightNavbar />}
             content={
               <Routes>
               
                 <Route path="/" element={<Analytics />} />
                 <Route path="/analytics" element={<Analytics />} />
                 <Route path="/campaings" element={<Campaings />} />
                 <Route path="/team" element={<Team />} />
               </Routes>
             }
           />
         </NavContext.Provider>
       </div>

  );
}

export default Access;
