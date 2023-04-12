import { Configuration, OpenAIApi } from "openai";
import React, { useState, useEffect, useRef } from "react";

export const BotImg = () => {
  const configuration = new Configuration({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  const [message, setMessage] = useState("");
  const [people, setPeople] = useState("ME");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([
    { message: "Ada yang bisa saya gambar?", people: "Bot" },
  ]);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const inputMessage = e.target.elements.message.value;
    const currentMessages = [...messages, { message: inputMessage, people }];
    setMessages(currentMessages);
    setMessage("");
    setIsLoading(true);

    const response = await openai.createImage({
      prompt: inputMessage,
      n: 1, //Number of images to generate
      size: "1024x1024",
    });

    setIsLoading(false);
    setMessages([
      ...currentMessages,
      { message: response.data.data[0].url, people: "Bot" },
    ]);
  };

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
                          {message.people != "ME" && index != 0 ? (
                            <img
                              key={index}
                              className="img-fluid"
                              width={400}
                              src={message.message}
                              alt=""
                            />
                          ) : (
                            <p key={index}>{message.message}</p>
                          )}
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

            <div className="form-inline">
              <form onSubmit={handleSubmit}>
                <div className="input-group mb-3">
                  <input
                    type="text"
                    autoComplete="off"
                    name="message"
                    disabled={isLoading}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="form-control"
                    placeholder="Pesan.."
                  />
                  <button type="submit" className="btn" disabled={isLoading}>
                    Kirim
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
