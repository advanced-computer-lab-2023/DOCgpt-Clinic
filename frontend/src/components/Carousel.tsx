import React from "react";
import Carousel from "react-material-ui-carousel";
import image1 from "../Carousel1.jpg";
import image2 from "../Carousel2.jpg";
import image3 from "../Carousel3.jpg";

// Assuming you have an 'items' array defined somewhere
const items = [
  {image: image3, text: "WELCOME TO EL7A2NI"}, 
  {image: image1, text: "Exceptional Medical Speciality Healthcare "},
  {image: image2, text: "When You Need Answers, You Know Where To Go"}
];

const MyCarousel = () => {
  return (
    <Carousel>
      {items.map((item, index) => (
        <div key={index} style={{ position: "relative" }}>
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "75vh",
              backgroundColor: "rgba(0, 0, 0, 0.5)", // Transparent black background
              zIndex: 1, // Ensure the background is behind the text
            }}
          />
          <img
            src={item.image}
            alt={`carousel-item-${index}`}
            style={{
              width: "100%",
              height: "75vh",
              objectFit: "cover", // Ensure the image covers the entire container
              zIndex: 2, // Ensure the image is on top of the background
            }}
          />
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 3, // Ensure the text is on top of the image
              color: "white",
              textAlign: "center",
              fontSize: "35px",
              whiteSpace: "nowrap", // Prevent line breaks
               }}
          >
          <h2 style={{ margin: "0", borderBottom: index === 0 ? "2px solid white" : "none" }}>{item.text}</h2>
          </div>
        </div>
      ))}
    </Carousel>
  );
};

export default MyCarousel;
