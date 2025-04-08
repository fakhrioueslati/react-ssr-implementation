import React from "react";
import { Route, Routes } from "react-router-dom";
import Nav from "./layout/NavMenu";
import About from "./components/About";
import Home from "./components/Home";

function App(){
    return(
            <Routes>
            <Route path="/" element={<Nav/>}/>
            <Route path="/about" element={<About/>}/>
            <Route path="/home" element={<Home/>}/>

            </Routes>
    )
}
export default App;