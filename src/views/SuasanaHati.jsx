import { Configuration, OpenAIApi } from "openai";
import React, { useState, useEffect, useRef } from "react";
import Swal from "sweetalert2";
import "animate.css";

export const SuasanaHati = () => {
  const configuration = new Configuration({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  const [listMood, setlistMood] = useState([
    {
      color: "#A2D6F9",
      suasana: "Sedih",
      emot: "fa-solid fa-face-sad-tear fa-fade",
    },
    { color: "Red", suasana: "Galau", emot: "fa-solid fa-face-frown fa-fade" },
    {
      color: "orange",
      suasana: "Senang",
      emot: "fa-solid fa-face-smile-beam fa-fade",
    },
    { color: "red", suasana: "Marah", emot: "fa-solid fa-face-angry fa-fade" },
    {
      color: "purple",
      suasana: "Kebahagian",
      emot: "fa-solid fa-face-laugh-squint fa-fade",
    },
    {
      color: "cyan",
      suasana: "Kesalahan",
      emot: "fa-solid fa-face-dizzy fa-fade",
    },
    {
      color: "#E9190F",
      suasana: "Cemas",
      emot: "fa-solid fa-face-flushed fa-fade",
    },
    {
      color: "black",
      suasana: "Ketakutan",
      emot: "fa-solid fa-face-grimace fa-fade",
    },
    {
      color: "#33032F",
      suasana: "Tertekan ",
      emot: "fa-solid fa-face-meh-blank fa-fade",
    },
    {
      color: "#004643",
      suasana: "Ketakutan",
      emot: "fa-solid fa-face-grimace fa-fade",
    },
    {
      color: "#190E4F",
      suasana: "Kesepian",
      emot: "fa-solid fa-face-frown-open fa-fade",
    },
    {
      color: "#FB5012",
      suasana: "Terintimidasi ",
      emot: "fa-solid fa-face-dizzy fa-fade",
    },
    {
      color: "#D7D9CE",
      suasana: "Kebingungan",
      emot: "fa-solid fa-face-meh fa-fade",
    },
    {
      color: "#119DA4",
      suasana: "Nangis",
      emot: "fa-solid fa-face-sad-cry fa-fade",
    },
  ]);

  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([
    { message: "Tanya apa mau mu, aku siap melayani", people: "Bot" },
  ]);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
  }, [messages]);

  const mySuasanaHati = async (suasana) => {
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
                      <i className={suasana.emot + " me-2"}></i>
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
