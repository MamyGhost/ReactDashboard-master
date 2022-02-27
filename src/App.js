import "./App.css";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Container from "./components/Container/Container";
import Huhu from "./components/Container/Huhu";
import RightNavbar from "./components/RightNavbar/RightNavbar";
import Dashboard from "./components/Dashboard/Dashboard";
import Analytics from "./components/Analytics/Analytics";
import Campaings from "./components/Campaigns/Campaings";
import Team from "./components/Team/Team";
import UserLogin from "./components/Login/UserLogin";
import Details from "./components/Analytics/Details";
import NavContext from "./Context/NavContext";
import { useNavigate } from "react-router-dom";
import Access from './Access';

function App() {
  const [nav, setNav] = useState(false);
  const value = { nav, setNav };
  // const local=localStorage.getItem('test');
  let navigate = useNavigate();
 

const LoginContainer = () => (
  <div className="contenu">
    <Routes>
    {/* <Route exact path="/" render={() => <navigate to="/login" />} /> */}
    <Route path="/" element={<UserLogin/>} />
    </Routes>
  </div>
)


 const DefaultContainer = () => {
   return(
  <div className="App">
  <NavContext.Provider value={value} >
    <Navbar />
    <Container
      stickyNav={<RightNavbar />}
      content={
        <Routes>
         
          {/* <Route path="/" element={<Analytics />} /> */}
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
   return (

   
    <Routes>
    
      <Route exact path="/" element={<UserLogin/>}/>
      <Route exact path="/login" element={<UserLogin/>}/>
      <Route path="/accueil/*" element={<Access />}/>
  
   
    </Routes>
 




  //  <div>
  //   <div className="huhu">
  //     <Container
  //     content={
  //    <Routes>
  //         <Route path="/" element={<UserLogin />} />
  //      </Routes>
  //     }
  //     />
  //     </div>
  //      <div className="App">
  //     <NavContext.Provider value={value} >
  //       <Navbar />
  //       <Container
  //         stickyNav={<RightNavbar />}
  //         content={
  //           <Routes>
             
  //             {/* <Route path="/" element={<Analytics />} /> */}
  //             <Route path="/analytics" element={<Analytics />} />
  //             <Route path="/campaings" element={<Campaings />} />
  //             <Route path="/team" element={<Team />} />
  //           </Routes>
  //         }
  //       />
  //     </NavContext.Provider>
  //   </div>
  //   </div>
   );
}

export default App;
