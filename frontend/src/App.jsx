import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./components/home"
import Login from "./components/login"
import SignUp from './components/signup'
import PageNotFound from "./components/PageNotFound";

function App(){
  return(
    <div>
      <Routes>
        <Route path="/" element={ <Home/>}/>
        <Route path="/login" element={ <Login/>}/>
        <Route path="/signup" element={ <SignUp/>}/>
        <Route path="*" element={ <PageNotFound/>}/>
      </Routes>
    </div>
  )
}
export default App;