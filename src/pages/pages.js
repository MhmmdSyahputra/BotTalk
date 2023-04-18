import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import { Header } from "../components/Header";
import { ChtBot } from "../views/ChtBot";
import { BotVoice } from "../views/BotVoice";
import { BotImg } from "../views/BotImg";
import { SuasanaHati } from "../views/SuasanaHati";
const Pages = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route exact path="/" element={<BotVoice />} />
        <Route exact path="/SuasanaHati" element={<SuasanaHati />} />
        <Route exact path="/DrawBot" element={<BotImg />} />
        <Route exact path="/ChatBot" element={<ChtBot />} />
      </Routes>

      {/* <Footer /> */}
    </>
  );
};

export default Pages;
