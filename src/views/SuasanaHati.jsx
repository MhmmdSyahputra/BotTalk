import { Configuration, OpenAIApi } from "openai";
import React, { useState, useEffect, useRef } from "react";
import Swal from "sweetalert2";
import "animate.css";

export const SuasanaHati = () => {
  const configuration = new Configuration({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  const [listMood, setlistMood] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([
    { message: "Tanya apa mau mu, aku siap melayani", people: "Bot" },
  ]);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
  }, [messages]);

  useEffect(() => {
    getSuasana();
  }, []);

  const getSuasana = async () => {
    const min = 7;
    const max = 20;
    const number = Math.floor(Math.random() * (max - min + 1) + min);

    setIsLoading(true);
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt:
        "buat kan list " +
        number +
        ' mood dalam bahasa gaul indonesia berserta dengan code warna nya yg cocok. dengan format json *jgn pakai nomor dan color nya dengan opacity yg rendah [{"color": "", "suasana": "", "emot": ""}] ',
      temperature: 0,
      max_tokens: 500,
      top_p: 1,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    });
    const listMood = `${response.data.choices[0].text}`;
    const objekResponse = JSON.parse(listMood);
    setlistMood(objekResponse);
    setIsLoading(false);
  };

  const mySuasanaHati = async (suasana) => {
    let ke = Math.floor(Math.random() * (50 - 10 + 1)) + 10;
    setIsLoading(true);

    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: "Berikan Qoute yg bahasa indonesia Motivasi Tentang" + suasana,
      temperature: 0,
      max_tokens: 200,
      top_p: 1,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    });
    Swal.fire({
      title: suasana,
      text: response.data.choices[0].text,
      showClass: {
        popup: "animate__animated animate__fadeInDown",
      },
      hideClass: {
        popup: "animate__animated animate__fadeOutDown",
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
              <div className="col py-4">
                <h1 className="fs-5">Pilih Mood mu</h1>
                {listMood &&
                  listMood.map((suasana, index) => (
                    <button
                      key={index}
                      className={"btn px-2 m-2"}
                      style={{ borderColor: suasana.color }}
                      onClick={() => {
                        mySuasanaHati(suasana.suasana);
                      }}
                    >
                      {suasana.emot} {suasana.suasana}
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
                      style={{ width: "80px", height: "80px" }}
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
