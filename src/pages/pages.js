import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import { Header } from "../components/Header";
import { ChtBot } from "../views/ChtBot";
import { BotVoice } from "../views/BotVoice";
import { BotImg } from "../views/BotImg";
const Pages = () => {
  return (
    <>
      <Header />
      <Routes>
        {/* <Route exact path="/" element={<Home />} /> */}
        <Route exact path="/" element={<BotVoice />} />
        <Route exact path="/BotVoice" element={<BotVoice />} />
        <Route exact path="/BotImg" element={<BotImg />} />
        <Route exact path="/ChtBot" element={<ChtBot />} />
      </Routes>

      {/* <Footer /> */}
    </>
  );
};

export default Pages;
