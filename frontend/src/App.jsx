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
import AuctionPage from "./pages/AuctionPage";
import CalculateMatchPoint from "./pages/CalculateMatchPoint";
import FantasyLandingPage from "./pages/v2/FantasyLandingPage";
import PrivacyPolicy from "./pages/v2/PrivacyPolicy";
import TermsAndConditions from './pages/v2/TermsAndConditions'
import ContactUs from "./pages/v2/ContactUs";
import SeriesRules from "./pages/v2/SeriesRules";
import RulesPage from "./pages/v2/RuleEditForAdmin";
import LoginPage from "./pages/v2/LoginPage";
import SignupPage from "./pages/v2/SignupPage";
import MatchListPage from "./pages/v2/MatchesList";
import LogoutPage from "./pages/v2/LogoutPage";
import SeriesListPage from "./pages/v2/SeriesListPage";
import SocketPage from "./pages/v2/socket";
import CricketBiddingPage from "./pages/v2/CricketBiddingPage";

function App() {
  return (
    <>
      <Layout>
        <Routes>
          <Route exact path="/v1" element={<Home />} />
          <Route exact path="/" element={<FantasyLandingPage/>} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsAndConditions />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/rules" element={<SeriesRules />} />
          <Route path="/admin/rules" element={<RulesPage/>} />
          <Route path="/auth/login" element={<LoginPage/>} />
          <Route path="/auth/signup" element={<SignupPage/>} />
          <Route path="/matches" element={<MatchListPage/>} />
          <Route path="/auth/logout" element={<LogoutPage/>} />
          <Route path="/seriesX/series" element={<SeriesListPage/>} />

          <Route path="/socket/:room" element={<SocketPage />} />
          <Route path="/cricket-bidding/:room" element={<CricketBiddingPage />} />


          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/players" element={<Players />} />
          <Route path="/logout" element={<Logout/>} />
          <Route path="/games/series/:seriesId" element={<Game/>}/>
          <Route path="/series" element={<Series/>}/>
          <Route path="/owners/:gameId" element={<GameOwners/>} />
          <Route path="/games/:gameId" element={<GameData/>} />
          <Route path="/auction/:gameId" element={<AuctionPage/>} />
          <Route path="/match-points/:seriesId/:gameId" element={<CalculateMatchPoint/>} />
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
