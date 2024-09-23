import React from "react";

function TopBar() {
  const year = new Date().getFullYear();
  return (
   <upperbar className="topDiv">
    <h1>PokeDex</h1>
   </upperbar>
  );
}

export default TopBar;
