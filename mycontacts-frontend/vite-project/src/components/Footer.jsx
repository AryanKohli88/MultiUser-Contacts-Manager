import React from "react";

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer>
      <p>This Web-App was made by Aryan Kohli ⓒ {year}</p>
    </footer>
  );
}

export default Footer;
