import { useState } from "react";
import "./App.css";
import Home from "./pages/Home/Home";
import Players from "./pages/Home/Players";
import { Route, Routes, Navigate } from "react-router-dom";
import Layout from "./layouts/Layout";
import PageNotFound from "./layouts/PageNotFound";
import Login from "./pages/Login/Login";
import Signup from "./pages/SignUp/Signup";
import Logout from "./pages/Logout/Logout";
import Game from "./pages/Game";
import Series from "./pages/Series";
import GameData from "./pages/GameData";
import GameOwners from "./pages/GameOwners";

function App() {
  return (
    <>
      <Layout>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/players" element={<Players />} />
          <Route path="/logout" element={<Logout/>} />
          <Route path="/games/series/:seriesId" element={<Game/>}/>
          <Route path="/series" element={<Series/>}/>
          <Route path="/owners/:gameId" element={<GameOwners/>} />
          <Route path="/games/:gameId" element={<GameData/>} />
          <Route path="/admin">
            <Route path="getAllUsers" element={<Home />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Layout>
    </>
  );
}

export default App;
