import { Configuration, OpenAIApi } from "openai";
import React, { useState, useEffect, useRef } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

export const BotVoice = () => {
  const { transcript, listening, resetTranscript } = useSpeechRecognition();
  const [btnIsHold, setbtnIsHold] = useState(false);

  const startListening = () => {
    SpeechRecognition.startListening({ continuous: true, lang: "id-ID" });
  };

  const stopListening = () => {
    SpeechRecognition.stopListening();
  };

  const onMouseDown = () => {
    setbtnIsHold(true);
    resetTranscript();
    startListening();
  };

  const onMouseUp = () => {
    setbtnIsHold(false);
    stopListening();
  };

  const onMouseLeave = async () => {
    stopListening();
    if (transcript === "") {
      return;
    }
    const currentMessages = [...messages, { message: transcript, people }];
    setMessages(currentMessages);
    setMessage("");
    setIsLoading(true);

    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: transcript,
      temperature: 0,
      max_tokens: 1000,
      top_p: 1,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    });

    setIsLoading(false);
    setMessages([
      ...currentMessages,
      { message: response.data.choices[0].text, people: "Bot" },
    ]);
  };

  const configuration = new Configuration({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  const [message, setMessage] = useState("");
  const [people, setPeople] = useState("ME");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([
    { message: "Keyboard mu hancur? Pakai Fitur Voice ini", people: "Bot" },
  ]);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
  }, [messages]);

  return (
    <>
      <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="col-md-7 content">
            <div
              className="row content2 p-3"
              ref={messagesEndRef}
              style={{ height: "85vh" }}
            >
              <div className="col-md-12 my-4 p-4 ">
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
                  <div className="spinner-border text-warning" role="status">
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
                  {/* <p>Microphone: {listening ? "on" : "off"}</p> */}
                  <button
                    style={{
                      width: "200px",
                      background: btnIsHold ? "#FFA500" : "",
                    }}
                    className="btn"
                    onke
                    onMouseDown={onMouseDown}
                    onTouchStart={onMouseDown}
                    onMouseUp={onMouseUp}
                    onMouseLeave={onMouseLeave}
                  >
                    Hold to Talk
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
