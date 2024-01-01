import React, { useState } from "react";
import "./Header.scss";

import { FaHospital } from "react-icons/fa6";
import { AiFillCloseCircle } from "react-icons/ai";
import { PiDotsNineBold } from "react-icons/pi";
import { GiMedicalDrip } from "react-icons/gi";

const Header = () => {
  const [navBar, setNavBar] = useState("menu");

  const showNavbar = () => {
    setNavBar("menu showNavbar");
  };
  const removeNavBar = () => {
    setNavBar("menu");
  };
  return (
    <div className="navBar">
      <div className="logoDiv">
        <GiMedicalDrip className="icon" />
        <span>TBO-MEDI</span>
      </div>
      <div className={navBar}>
        <ul>
          <li className="navList">Destination</li>
          <li className="navList">About Us</li>
          <li className="navList">Collabortars</li>
          <li className="navList">Contact Us</li>
        </ul>

        <AiFillCloseCircle className="icon closeIcon" onClick={removeNavBar} />
      </div>

      <button className="bookBtn btn">Hospital Registration</button>
      <PiDotsNineBold className="icon menuIcon" onClick={showNavbar} />
    </div>
  );
};

export default Header;
