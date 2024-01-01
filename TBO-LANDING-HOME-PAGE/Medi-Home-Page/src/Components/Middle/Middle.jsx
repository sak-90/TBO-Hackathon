import React from "react";
import "./Middle.scss";
import { IoLocation } from "react-icons/io5";

//imported images

import image1 from "../../assests/img1.jpg";
import image2 from "../../assests/img2.jpg";
import image3 from "../../assests/img3.jpg";
import image4 from "../../assests/img4.jpg";
import image5 from "../../assests/img5.jpg";
import image6 from "../../assests/img6.jpg";
import image7 from "../../assests/img7.jpg";
import image8 from "../../assests/img8.jpg";
import image9 from "../../assests/img9.jpg";

const destinations = [
  {
    id: 1,
    img: image1,
    name: "Fortis Hospital",
    location: "New Delhi,India",
    rating: 4.7,
  },
  {
    id: 2,
    img: image2,
    name: "Antalya Hospital",
    location: "Dubai,UAE",
    rating: 3.7,
  },
  {
    id: 3,
    img: image3,
    name: "St.Churchill Hospital",
    location: "Texas,USA",
    rating: 4.8,
  },
  {
    id: 4,
    img: image4,
    name: "Clemente Hospital",
    location: "NY,USA",
    rating: 3.8,
  },
  {
    id: 5,
    img: image5,
    name: "St.Cristopher Hospital",
    location: "Downing Street,London",
    rating: 4.0,
  },
  {
    id: 6,
    img: image6,
    name: "Seldman Cancer Hospital",
    location: "Istanbul,Turkey",
    rating: 4.89,
  },
  {
    id: 7,
    img: image7,
    name: "Rajiv Gandhi Hospital",
    location: "New Delhi,India",
    rating: 4.58,
  },
  {
    id: 8,
    img: image8,
    name: "RN Tagore Hospital",
    location: "Calcutta,India",
    rating: 3.42,
  },
];

function Middle() {
  return (
    <div className="destination section container">
      <div className="secContainer">
        <div className="">
          <span className="redText">EXPLORE NOW</span>
          <h3>Find Your Best Medical Experience</h3>
          <p>
            Fill in the spot to checkout the gallery of our partnered hospitals.
          </p>
        </div>

        <div className="secMenu">
          <ul className="flex">
            <li className="active inactive">All</li>
            <li className="inactive">Recommended</li>
            <li className="inactive">Robo-Tech</li>
            <li className="inactive">AI-Medi</li>
            <li className="inactive">Genome-Tech</li>
          </ul>
        </div>
        <div className="destinationContainer grid">
          {destinations.map((destination) => {
            return (
              <div className="singleDestination" key={destination.id}>
                <div className="imgDiv">
                  <img src={destination.img} alt="Destination Image" />
                  <div className="descInfo flex">
                    <div className="text">
                      <span className="name">{destination.name}</span>
                      <p className="flex">
                        <IoLocation className="icon" />
                        {destination.location}
                      </p>
                    </div>
                    <span className="rating">{destination.rating}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Middle;
