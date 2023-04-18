import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

export const Header = () => {
  const location = useLocation();
  return (
    <>
      <div className="header m-0">
        <div className="container">
          <div className="row d-flex justify-content-center">
            <div className="col-md-7 p-2 pb-0 bg-success">
              <div className="container">
                <div className="row px-1">
                  <Link
                    to="/SuasanaHati"
                    className={`col p-1 fw-bold text-decoration-none text-light ${
                      location.pathname === "/SusanaHati" ? "active" : ""
                    }`}
                  >
                    Mood
                  </Link>
                  <Link
                    to="/DrawBot"
                    className={`col p-1 fw-bold text-decoration-none text-light ${
                      location.pathname === "/DrawBot" ? "active" : ""
                    }`}
                  >
                    Draw Bot
                  </Link>
                  <Link
                    to="/"
                    className={`col p-1 fw-bold text-decoration-none text-light ${
                      location.pathname === "/" ? "active" : ""
                    }`}
                  >
                    Voice Bot
                  </Link>
                  <Link
                    to="/ChatBot"
                    className={`col p-1 fw-bold text-decoration-none text-light ${
                      location.pathname === "/ChatBot" ? "active" : ""
                    }`}
                  >
                    Chat Bot
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
