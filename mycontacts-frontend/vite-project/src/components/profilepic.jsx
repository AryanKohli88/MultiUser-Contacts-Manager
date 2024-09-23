import React, { useState, useEffect } from "react";

function ProfilePic(props) {
  const [boxPosition, setBoxPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event) => {
      const { clientX: mouseX, clientY: mouseY } = event;
      // Adjust the box position based on the mouse position
      const offsetX = (mouseX - window.innerWidth / 2) / 10;
      const offsetY = (mouseY - window.innerHeight / 2) / 10;
      setBoxPosition({ x: -offsetX, y: -offsetY });
    };

    // Add event listener for mouse move
    window.addEventListener("mousemove", handleMouseMove);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const boxStyle = {
    position: "fixed",
    top: "20%", // 20% margin from the top
    right: "10%",
    width: "auto",
    height: "30vh",
    border: "2px solid #000",
    backgroundColor: "#fff",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    transform: `translate(${boxPosition.x}px, ${boxPosition.y}px)`, // Move the box in the opposite direction of mouse movement
  };

  const imgStyle = {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  };

  return (
    <div style={boxStyle}>
      <img src={props.username==='red'? `https://archives.bulbagarden.net/media/upload/thumb/d/d3/Lets_Go_Pikachu_Eevee_Red.png/250px-Lets_Go_Pikachu_Eevee_Red.png` : `https://archives.bulbagarden.net/media/upload/thumb/1/1a/Lets_Go_Pikachu_Eevee_Blue.png/160px-Lets_Go_Pikachu_Eevee_Blue.png`} alt="Profile" style={imgStyle} />
    </div>
  );
}

export default ProfilePic;
