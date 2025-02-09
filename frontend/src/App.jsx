import { useState } from "react";
import "./App.css";
import Home from "./pages/Home/Home";
import Players from "./pages/Home/Players";
import { Route, Routes, Navigate } from "react-router-dom";
import Layout from "./layouts/Layout";
import PageNotFound from "./layouts/PageNotFound";

function App() {
  return (
    <>
      <Layout>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/players" element={<Players />} />
          <Route path="/api">
            <Route path="test" element={<Home />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Layout>
    </>
  );
}

export default App;
