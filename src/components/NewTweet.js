"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { addTweet } from "@/services/Web3Service";

export default function NewTweet() {

    const [text, setText] = useState("");
    const [message, setMessage] = useState("");
    const { push } = useRouter();

    function btnPublishClick(){
        setMessage("Registrando seu tweet na blockchain...");
        addTweet(text)
            .then(result => {
                setText("");
                setMessage("Tweet enviado com sucesso! =D Aguarde alguns instantes para visualizá-lo...");
            })
            .catch(err => {
                setMessage(err.message);
                console.error(err);
            })
    }

    useEffect (() => {
        const wallet = localStorage.getItem("wallet");
        if(!wallet) 
            push("/");
    }, [])

    return (
        <>
            <div className="top">
                <div className="left">
                    <img src="/cryptwitter.png" className="brand" />
                </div>
                <h1>
                    Bem vindo!
                </h1>
                <p>Quais as novidades?</p>
                <textarea className="form-control my-3" value={text} onChange={evt => setText(evt.target.value)}>
                </textarea>
                <div>
                    <input type="buttom" onClick={btnPublishClick} className="btn btn-primary" value="Twettar" />
                    <span className="message">
                        {message}
                    </span>
                </div>
            </div>
        </>
    )
}