import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import { Header } from "../components/Header";
import { DetailNote } from "../views/DetailNote";
import { Home } from "../views/Home";
import { MyLink } from "../views/Link";
import { MyNote } from "../views/Note";
const Pages = () => {
  return (
    <>
    <Header/>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/Link" element={<MyLink />} />
        <Route exact path="/Note" element={<MyNote />} />
        <Route exact path="/DetailNote/:id" element={<DetailNote />} />
        <Route exact path="/NewNote" element={<DetailNote />} />
      </Routes>
      
      {/* <Footer /> */}
    </>
  );
};

export default Pages;
