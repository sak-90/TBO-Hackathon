import React from "react";
import "./Home.scss";
import { AiOutlineSwapRight } from "react-icons/ai";

function Home() {
  return (
    <div className="Home">
      <div className="videoBg">
        <video src="./v2.mp4" autoPlay loop muted></video>
      </div>

      <div className="sectionText">
        <h1>Explore Your Medical Journey With Us!</h1>
        <p>Discover the world's best integrated medical booking system</p>
        <button className="btn flex">
          BOOK APPOINTMENT <AiOutlineSwapRight className="icon" />
        </button>
      </div>
    </div>
  );
}

export default Home;
