import React from "react";
import "./Footer.scss";
import { GiMedicalDrip } from "react-icons/gi";
import { FaInstagram } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
function Footer() {
  return (
    <div className="footer">
      <div className="secContainer container grid">
        <div className="logoDiv">
          <div className="footerLogo">
            <GiMedicalDrip className="icon" />
            <span>TBO-MEDI</span>
          </div>
          <div className="socials flex">
            <FaInstagram className="icon" />
            <FaTwitter className="icon" />
            <FaFacebook className="icon" />
          </div>
        </div>
        <div className="footerLinks">
          <span className="linkTitle">Information</span>
          <li>
            <a href="#">Home</a>
          </li>
          <li>
            <a href="#">Explore</a>
          </li>
          <li>
            <a href="#">Travel</a>
          </li>
          <li>
            <a href="#">Blog</a>
          </li>
        </div>
        <div className="footerLinks">
          <span className="linkTitle">Helful Links</span>
          <li>
            <a href="#">Destination</a>
          </li>
          <li>
            <a href="#">Support</a>
          </li>
          <li>
            <a href="#">Terms & Condition</a>
          </li>
          <li>
            <a href="#">Privacy</a>
          </li>
        </div>
        <div className="footerLinks">
          <span className="linkTitle">Contact Details</span>
          <span className="phone">+91 9476383024</span>
          <span className="email">udayjordan1@gmail.com</span>
        </div>
      </div>
    </div>
  );
}

export default Footer;
