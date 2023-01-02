import React, { useState, useEffect } from "react";
import { getDatabase, ref, push, onValue, remove } from "firebase/database";
import firebase from "../config";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Link, useLocation } from "react-router-dom";
import Skeleton from "@mui/material/Skeleton";

export const MyNote = () => {
  let navigate = useNavigate();
  const params = useParams();
  const [datanote, setDataNote] = useState([]);

  const [loading, setLoading] = useState(true);

  //   read all cht
  useEffect(() => {
    const db = getDatabase();
    onValue(ref(db, "my-note"), (snapshot) => {
      const data = snapshot.val();
      setDataNote(data);
      setLoading(false);
    });
  }, []);

  const detailNote = (id) => {
    navigate("/DetailNote/" + id);
  };

  const deleteRow = (id) => {
    const db = getDatabase();
    remove(ref(db, "/my-note/" + id));
  };

  return (
    <>
      <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="col-md-7 content">
            <div className="m-3">
              <div className="text-end">
                <Link to="/NewNote" className="btn btnAdd">
                  Add Data
                </Link>
              </div>
            </div>
            <div className="row content2 p-3">
              {loading ? (
                <div className="row">
                  <Skeleton
                    variant="rectangular"
                    className="col-md-12 my-4 p-4"
                    height={190}
                    style={{ borderRadius: '20px' }}
                  />
                  <Skeleton
                    variant="rectangular"
                    className="col-md-12 my-4 p-4"
                    height={190}
                    style={{ borderRadius: '20px' }}
                  />
                  <Skeleton
                    variant="rectangular"
                    className="col-md-12 my-4 p-4"
                    height={190}
                    style={{ borderRadius: '20px' }}
                  />
                </div>
              ) : (
                datanote &&
                Object.entries(datanote)
                  .reverse()
                  .map(([key, data]) => (
                    <div
                      className="col-md-12 my-4 p-4 body-link text-start"
                      key={key}
                    >
                      <h2 className="fs-3">
                        {data.title}
                        <i
                          className="thisIcon mx-2 fa-solid fs-6 text-danger fa-trash-can"
                          onClick={() => deleteRow(key)}
                        ></i>
                      </h2>
                      <div>
                        <button
                          className="btn mx-2"
                          onClick={() => detailNote(key)}
                        >
                          Lihat
                        </button>
                      </div>
                    </div>
                  ))
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
