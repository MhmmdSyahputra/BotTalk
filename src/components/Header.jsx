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
                    to="/BotImg"
                    className={`col p-1 fw-bold text-decoration-none text-light ${
                      location.pathname === "/BotImg" ? "active" : ""
                    }`}
                  >
                    Bot Img
                  </Link>
                  <Link
                    to="/"
                    className={`col p-1 fw-bold text-decoration-none text-light ${
                      location.pathname === "/" ? "active" : ""
                    }`}
                  >
                    Bot Voice
                  </Link>
                  {/* <Link
                    to="/"
                    className={`col p-1 fw-bold text-decoration-none text-light ${
                      location.pathname === "/" ? "active" : ""
                    }`}
                  >
                    Chat
                  </Link> */}
                  <Link
                    to="/ChtBot"
                    className={`col p-1 fw-bold text-decoration-none text-light ${
                      location.pathname === "/ChtBot" ? "active" : ""
                    }`}
                  >
                    Bot Chat
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
