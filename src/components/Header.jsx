import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

export const Header = () => {
  const location = useLocation();
  return (
    <>
      <div className="header m-0">
        <div className="container">
          <div className="row d-flex justify-content-center">
            <div className="col-md-7 py-2 bg-success">
              <div className="container">
                <div className="row">
                  <Link
                    style={{ fontSize: "0.9em" }}
                    to="/SuasanaHati"
                    className={`col p-1 fw-bold text-decoration-none text-light ${
                      location.pathname === "/SuasanaHati" ? "active" : ""
                    }`}
                  >
                    Mood
                  </Link>
                  <Link
                    style={{ fontSize: "0.9em" }}
                    to="/DrawBot"
                    className={`col p-1 fw-bold text-decoration-none text-light ${
                      location.pathname === "/DrawBot" ? "active" : ""
                    }`}
                  >
                    Draw Bot
                  </Link>
                  <Link
                    style={{ fontSize: "0.9em" }}
                    to="/"
                    className={`col p-1 fw-bold text-decoration-none text-light ${
                      location.pathname === "/" ? "active" : ""
                    }`}
                  >
                    Voice Bot
                  </Link>
                  <Link
                    style={{ fontSize: "0.9em" }}
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
