import React from "react";
import "./Portfolio.scss";

import icon1 from "../../assests/icons8-safety-66.png";
import icon2 from "../../assests/icon5.png";
import icon3 from "../../assests/icon6.png";
import image5 from "../../assests/img10.jpg";

function Portfolio() {
  return (
    <div className="portfolio section container">
      <div className="secContainer grid">
        <div className="leftContent">
          <div className="secHeading">
            <h3>Why Should You Choose Us</h3>
            <p>
              We have extensive knowledge and experience in the medical tourism
              industry.
            </p>
          </div>
          <div className="grid">
            <div className="singlePortfolio flex">
              <div className="iconDiv">
                <img src={icon1} alt="Icon image" />
              </div>
              <div className="infor">
                <h4>Safety and Support</h4>
                <p>
                  Our top priority is to provide best medical tourism support
                  for our clients. We maintain high safety standards and have
                  emergency support available for the trip.
                </p>
              </div>
            </div>
            <div className="singlePortfolio flex">
              <div className="iconDiv">
                <img src={icon2} alt="Icon image" />
              </div>
              <div className="infor">
                <h4>Diverse Range of Hospitals</h4>
                <p>
                  We have been listed to provide the top quality medical tourism
                  service. Because we have a range of hospital that are
                  partnered with us
                </p>
              </div>
            </div>
            <div className="singlePortfolio flex">
              <div className="iconDiv">
                <img src={icon3} alt="Icon image" />
              </div>
              <div className="infor">
                <h4>24/7 Customer Support</h4>
                <p>
                  Our dedicated customer support team is available round the
                  clock to address any queries or concerns before, during, and
                  after the trip.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="rightContent">
          <img src={image5} alt="Image" />
        </div>
      </div>
    </div>
  );
}

export default Portfolio;
