import { Configuration, OpenAIApi } from "openai";
// require('dotenv').config();

import React, { useState } from 'react'

export const ChtBot = () => {
    const configuration = new Configuration({
      apiKey: process.env.REACT_APP_OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);

    const [answer, setAnswer] = useState("");

    const [message, setMessage] = useState('')
    const [people, setPeople] = useState("ME")

    const [isLoading, setIsLoading] = useState(false)

    const [messages, setMessages] = useState([{ message: 'Halo Saya Bot', people: 'Bot' }])

    const handleSubmit = async (e) => {
        e.preventDefault()
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: message,
            temperature: 0,
            max_tokens: 100,
            top_p: 1,
            frequency_penalty: 0.0,
            presence_penalty: 0.0,
        });


        setIsLoading(true)

        setAnswer(response.data.choices[0].text)

        const currentMessages = [...messages, { message, people }]
        setMessages(currentMessages)

        setMessage('')
        setTimeout(() => {
            setIsLoading(false)
            setMessages([...currentMessages, { message: answer, people: "Bot"}])
        }, 3000)
        
    }

    return (
        <>
            <div className="container">
                <div className="row d-flex justify-content-center">
                    <div className="col-md-7 content">
                        <div className="row content2 p-3" style={{ height: '85vh' }}>
                            <div className="col-md-12 my-4 p-4 ">
                                {messages.map((message, index) => (
                                    <div>
                                        <div className={`row ${message.people == 'ME' ? 'd-flex justify-content-end' : ''} `}>
                                            <div className={`col-md-12 my-3 p-2 ${message.people == 'ME' ? 'text-end' : 'text-start'} `}
                                                style={{
                                                    borderRight: message.people == 'ME' ? '2px solid #FFA500' : 'none',
                                                    borderLeft: message.people != 'ME' ? '2px solid #FFA500' : 'none',
                                                    maxWidth: '50vh'
                                                }}>
                                                <div className='pb-3 fw-bold'>
                                                    {message.people}
                                                </div>
                                                <div>
                                                    <p key={index}>{message.message}</p>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="form-inline">
                            <form onSubmit={handleSubmit}>
                                <div className="input-group mb-3">
                                    <input type="text" autoComplete="off" disabled={isLoading} value={message} onChange={e => setMessage(e.target.value)} className="form-control" placeholder="Pesan.." />
                                    <button type='submit' className='btn' disabled={isLoading}>Kirim</button>
                                </div>
                            </form>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}
