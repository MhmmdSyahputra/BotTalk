import { Configuration, OpenAIApi } from "openai";
import React, { useState, useEffect, useRef } from "react";
import Swal from "sweetalert2";
import "animate.css";

export const SuasanaHati = () => {
  const listSuasanaHati = [
    { color: "success", suasana: "Happy" },
    { color: "primary", suasana: "Gembira" },
    { color: "info", suasana: "Ceria" },
    { color: "primary", suasana: "Senang" },
    { color: "danger", suasana: "Marah" },
    { color: "warning", suasana: "Sedih" },
    { color: "dark", suasana: "Terkejut" },
    { color: "danger", suasana: "Tersinggung" },
  ];
  const configuration = new Configuration({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  const [message, setMessage] = useState("");
  const [people, setPeople] = useState("ME");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([
    { message: "Tanya apa mau mu, aku siap melayani", people: "Bot" },
  ]);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
  }, [messages]);

  const mySuasanaHati = async (suasana) => {
    let ke = Math.floor(Math.random() * (50 - 10 + 1)) + 10;
    setIsLoading(true);

    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: "Berikan Qoute yg ke " + ke + " Penyemangat Tentang" + suasana,
      temperature: 0,
      max_tokens: 200,
      top_p: 1,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    });
    Swal.fire({
      title: response.data.choices[0].text,
      showClass: {
        popup: "animate__animated animate__fadeInDown",
      },
      hideClass: {
        popup: "animate__animated animate__fadeOutUp",
      },
    });
    // alert(response.data.choices[0].text);

    setIsLoading(false);
  };

  return (
    <>
      <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="col-md-7 content">
            <div
              className="row content2 "
              ref={messagesEndRef}
              style={{ height: "85vh" }}
            >
              <div className="col">
                {listSuasanaHati &&
                  listSuasanaHati.map((suasana) => (
                    // <option value={lang.unikLang}>{lang.bahasa}</option>
                    <button
                      className={"btn px-3 m-2" + " btn-" + suasana.color}
                      onClick={() => {
                        mySuasanaHati(suasana.suasana);
                      }}
                    >
                      {suasana.suasana}
                    </button>
                  ))}
                {isLoading ? (
                  <div
                    className="d-flex justify-content-center align-items-center"
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                    }}
                  >
                    {" "}
                    <div
                      className="spinner-border text-warning"
                      style={{ width: "100px", height: "100px" }}
                      role="status"
                    >
                      <span className="visually-hidden">Loading...</span>{" "}
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
