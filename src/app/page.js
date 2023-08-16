"use client";

import Head from "next/head";
import { doLogin } from "@/services/Web3Service";
import { useState } from "react";
import css from "styled-jsx/css";
import { useRouter } from "next/navigation";

export default function Home() {

  const {push} = useRouter();
  const [message, setMessage] = useState("");

  function btnLoginClick(){
    setMessage("Conectando com a MetaMask...");
    doLogin()
      .then(wallet => push("/timeline"))
      .catch(err => {
        console.error(err);
        setMessage(err.message);
      })
  }

  return (
    <>
      <Head>
        <title>CrypTwitter | Login</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="container px-4 py-5">
        <div className="row flex-lg-row-reverse align-items-center g-5 py-5"> 
          <div className="col-10 col-sm-8 col-lg-6">
              <img src="https://plus.unsplash.com/premium_photo-1683262038148-2ac280407276?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1932&q=80" className="d-block mx-lg-auto img-fluid" width="700" height="500" />
          </div>
          <div className="col-lg-6">
            <h1 className="display-5 fw-bold text-body-emphasis lh-1 mb-1">CrypTwitter</h1>
            <p className="lead">Uma rede social descentralizada!</p>
            <p className="lead mb-3">Autentique-se com sua carteira, e interaja em uma rede social da Web3.0!</p>
            <div className="d-grid gap-2 d-md-flex justify-content-md-start">
              <button type="button" className="btn btn-primary btn-lg px-4 me-md-2" onClick={btnLoginClick}>
                <img src="/MetaMask_Fox.svg.png" width="64" className="me-3" />
                Conectar carteira MetaMask
              </button>
            </div>
            <p classname="message">{message}</p>
          </div>
        </div>
      </div>
    </>
  
  )
}
