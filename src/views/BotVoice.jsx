import { Configuration, OpenAIApi } from "openai";
import React, { useState, useEffect, useRef } from "react";
import { useSpeechSynthesis } from "react-speech-kit";

import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

export const BotVoice = () => {
  const [selecttedlang, setselectedLang] = useState("id-ID");
  const listlang = [
    { unikLang: "id-ID", bahasa: "Indonesia" },
    { unikLang: "en-US", bahasa: "English" },
    { unikLang: "ru-RU", bahasa: "Russia" },
    { unikLang: "es-CR", bahasa: "Spanish" },
  ];
  const [message, setMessage] = useState("");
  const [people, setPeople] = useState("ME");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([
    { message: "Keyboard mu hancur? Pakai Fitur Voice ini", people: "Bot" },
  ]);
  const messagesEndRef = useRef(null);
  const { transcript, listening, resetTranscript } = useSpeechRecognition();
  const { speak } = useSpeechSynthesis({ lang: selecttedlang });
  const [btnIsHold, setbtnIsHold] = useState(false);

  //PAGE ----------------
  const [voicetotext, setVoicetoText] = useState(true);
  const [voicetovoice, setVoiceToVoice] = useState(false);

  //ENV APIKEY OPENAI ----------------
  const configuration = new Configuration({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  const changePage = (text, voice) => {
    if (text === true && voice === false) {
      setVoicetoText(true);
      setVoiceToVoice(false);
      return;
    }

    if (text === false && voice === true) {
      setVoicetoText(false);
      setVoiceToVoice(true);
      return;
    }
  };

  //START SPEECH ----------------
  const startListening = () => {
    SpeechRecognition.startListening({ continuous: true, lang: selecttedlang });
  };

  //STOP SPEECH ----------------
  const stopListening = () => {
    SpeechRecognition.stopListening();
  };

  //ON BUTTON HOLD ----------------
  const onMouseDown = () => {
    setbtnIsHold(true);
    setTimeout(() => {
      if (btnIsHold) {
        // do something
      }
    }, 1000); //
    resetTranscript();
    startListening();
  };

  //ON BUTTON HOLD UP ----------------
  const onMouseUpText = async () => {
    setbtnIsHold(false);
    stopListening();
    if (transcript === "") {
      return;
    }

    //DISPLAY MY CHT ----------------
    const currentMessages = [...messages, { message: transcript, people }];
    setMessages(currentMessages);
    setMessage("");
    setIsLoading(true);

    //->OPENAI
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: transcript,
      temperature: 0,
      max_tokens: 200,
      top_p: 1,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    });
    setIsLoading(false);
    //DISPLAY RESPONSE CHT BOT ----------------
    setMessages([
      ...currentMessages,
      { message: response.data.choices[0].text, people: "Bot" },
    ]);
  };

  //ON BUTTON HOLD UP ----------------
  const onMouseUpVoice = async () => {
    setbtnIsHold(false);
    stopListening();
    if (transcript === "") {
      return;
    }
    //->OPENAI
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: transcript,
      temperature: 0,
      max_tokens: 200,
      top_p: 1,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    });
    setIsLoading(false);
    speak({ text: response.data.choices[0].text });
  };
  // // SCROLL AT CONTENT OVERFLOW ----------------
  // useEffect(() => {
  //   messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
  // }, [messages]);

  return (
    <>
      <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="col-md-7 content">
            <div className="row">
              <div className="col px-4 py-2">
                <select
                  style={{
                    width: "110px",
                    height: "30px",
                    fontSize: "12px",
                  }}
                  value={selecttedlang}
                  defaultValue="Select an option"
                  onChange={(e) => setselectedLang(e.target.value)}
                  className="form-control"
                >
                  <option hidden selected>
                    --Bahasa--
                  </option>
                  {listlang &&
                    listlang.map((lang) => (
                      <option value={lang.unikLang}>{lang.bahasa}</option>
                    ))}
                </select>
              </div>
            </div>
            <div className="row px-3 py-2 justify-content-center ">
              <div className="col">
                <button
                  className="btn"
                  onClick={() => changePage(true, false)}
                  style={{ width: "100%", color: voicetotext ? "#00FFCE" : "" }}
                >
                  Voice to Text
                </button>
                {/* {<Speech text="This library is awesome!" />} */}
              </div>
              <div className="col">
                <button
                  className="btn"
                  onClick={() => changePage(false, true)}
                  style={{
                    width: "100%",
                    color: voicetovoice ? "#00FFCE" : "",
                  }}
                >
                  Voice to Voice
                </button>
              </div>
            </div>

            {/* PAGE VOICE TO TEXT --------------- */}
            {voicetotext ? (
              <div>
                <div
                  className="row content2 p-3"
                  ref={messagesEndRef}
                  style={{ height: "60vh" }}
                >
                  <div className="col-md-12 p-4 ">
                    {messages.map((message, index) => (
                      <div key={index}>
                        <div
                          className={`row ${
                            message.people == "ME"
                              ? "d-flex justify-content-end"
                              : ""
                          } `}
                        >
                          <div
                            className={`col-md-12 my-3 p-2 ${
                              message.people == "ME" ? "text-end" : "text-start"
                            } `}
                            style={{
                              borderRight:
                                message.people == "ME"
                                  ? "2px solid #FFA500"
                                  : "none",
                              borderLeft:
                                message.people != "ME"
                                  ? "2px solid #FFA500"
                                  : "none",
                              maxWidth: "50vh",
                            }}
                          >
                            <div className="pb-3 fw-bold">{message.people}</div>
                            <div style={{ wordWrap: "break-word" }}>
                              <p key={index}>{message.message}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    {isLoading ? (
                      <div
                        className="spinner-border text-warning"
                        role="status"
                      >
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
                <div className="row">
                  <div className="container">
                    <div className="col-md-12">
                      <div className="form-inline">
                        <form>
                          <div className="input-group mb-3">
                            <input
                              type="text"
                              autoComplete="off"
                              name="message"
                              disabled={isLoading}
                              value={transcript}
                              onChange={(e) => setMessage(e.target.value)}
                              className="form-control"
                              placeholder="Pesan.."
                              readOnly
                            />
                          </div>
                        </form>
                      </div>
                      {/* <p>Microphone: {listening ? "on" : "off"}</p> */}
                      <button
                        style={{
                          width: "200px",
                          background: btnIsHold ? "#FFA500" : "",
                        }}
                        className="btn"
                        onMouseDown={onMouseDown}
                        onTouchStart={onMouseDown}
                        onMouseUp={onMouseUpText}
                        onTouchEnd={onMouseUpText}
                      >
                        Hold to Talk
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <div className="">
                  <img
                    src="https://cdn.discordapp.com/attachments/1083786029435191356/1096105703166464111/image-removebg-preview.png"
                    alt=""
                    width="200"
                    style={{ opacity: "0.2" }}
                    className="img-fluid mt-5"
                  />
                </div>
                <div className="">
                  <p>{transcript}</p>
                </div>
                <button
                  style={{
                    marginTop: "1600vh",
                    width: "200px",
                    background: btnIsHold ? "#FFA500" : "",
                  }}
                  className="btn mt-3"
                  onMouseDown={onMouseDown}
                  onTouchStart={onMouseDown}
                  onMouseUp={onMouseUpVoice}
                  onTouchEnd={onMouseUpVoice}
                >
                  Hold to Talk
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
