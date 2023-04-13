import { Configuration, OpenAIApi } from "openai";
import React, { useState, useEffect, useRef } from "react";
import { useSpeechSynthesis } from "react-speech-kit";

import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

const VoiceTT = () => {
  const [message, setMessage] = useState("");
  const [people, setPeople] = useState("ME");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([
    { message: "Keyboard mu hancur? Pakai Fitur Voice ini", people: "Bot" },
  ]);
  const messagesEndRef = useRef(null);
  const { transcript, listening, resetTranscript } = useSpeechRecognition();
  const { speak } = useSpeechSynthesis({ lang: "id-ID" });
  const [btnIsHold, setbtnIsHold] = useState(false);

  //ENV APIKEY OPENAI ----------------
  const configuration = new Configuration({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  //START SPEECH ----------------
  const startListening = () => {
    SpeechRecognition.startListening({ continuous: true, lang: "id-ID" });
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
  const onMouseUp = async () => {
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
    speak({ text: response.data.choices[0].text });
    //DISPLAY RESPONSE CHT BOT ----------------
    setMessages([
      ...currentMessages,
      { message: response.data.choices[0].text, people: "Bot" },
    ]);
  };

  return (
    <>
      <div
        className="row content2 p-3"
        ref={messagesEndRef}
        style={{ height: "65vh" }}
      >
        <div className="col-md-12 p-4 ">
          {messages.map((message, index) => (
            <div key={index}>
              <div
                className={`row ${
                  message.people == "ME" ? "d-flex justify-content-end" : ""
                } `}
              >
                <div
                  className={`col-md-12 my-3 p-2 ${
                    message.people == "ME" ? "text-end" : "text-start"
                  } `}
                  style={{
                    borderRight:
                      message.people == "ME" ? "2px solid #FFA500" : "none",
                    borderLeft:
                      message.people != "ME" ? "2px solid #FFA500" : "none",
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
    </>
  );
};

export default VoiceTT;
