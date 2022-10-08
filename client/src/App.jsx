import axios from "axios";
import {Grid} from "@mui/material";
import {BrowserRouter, Routes, Route, Outlet } from "react-router-dom"
import {useEffect, useState} from "react"
import Home from "./pages/home/Home";
import Login from "./pages/login/Login"
import MyPage from "./pages/myPage/MyPage"
import {useRecoilState } from "recoil";
import {userRecoil} from "./recoil";

import './App.css';

const Layout = () =>{
      return(
          <Grid>
            <Outlet />
          </Grid>
      )
}
function App() {
  const [user, setUser] = useState(undefined);
  // useEffect(()=>{
  //
  // })
  return (
    <BrowserRouter>
      <Routes>
          <Route path={"/"} element={<Layout/>}>
          <Route index element={<Login/>}/>
          <Route path = "user" element={<MyPage/>}/>
          {/*<Route path = "ranking" element={}/>*/}
        </Route>

          <Route path="*" element={<Login/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;