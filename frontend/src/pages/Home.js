import React from "react";
import mwallet from "../walletHome.png";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="content" id="home">
      <img src={mwallet} alt="logo" className="frontPageLogo" />
      <p>Buy, Store, Collect NFTs, Exchange & Earn Crypto</p>
      <Button
        onClick={() => navigate("/create-account")}
        className="frontPageButton2"
        type="text"
      >
        Create A Wallet
      </Button>
      <Button
        onClick={() => navigate("/recover")}
        className="linkButton"
        type="link"
      >
        Sign In With Seed Phrase
      </Button>
    </div>
  );
}

export default Home;