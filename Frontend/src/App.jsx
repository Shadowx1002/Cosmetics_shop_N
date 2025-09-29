import { useState } from "react";
import "./App.css";

import HomePage from "./pages/home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/login";
import Header from "./components/Header";
import NotFoundPage from "./pages/noFounfPage";
import AdminPage from "./pages/adminPage";
import TestPage from "./pages/testPage";
import { Toaster } from "react-hot-toast";
import RegisterPage from "./pages/register";


function App() {
  return (
    
    <BrowserRouter>
      <div >
        <Toaster position='top-right'/>
        
        <Header/>
        <Routes path="/*">
        <Route path="/login" element={<LoginPage/>}/>
          <Route path="/*" element={<HomePage/>}/>
          
          
          
          <Route path="/admin/*" element={<AdminPage/>}/>
          <Route path="/testpage" element={<TestPage/>}></Route>
          <Route path="/register" element={<RegisterPage/>}></Route>
        </Routes>

        




      </div>
    </BrowserRouter>
  )
}

export default App;
