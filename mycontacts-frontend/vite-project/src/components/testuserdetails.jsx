import React from "react";

function TestUserDetails() {
  return (
   <div className="instructionsBoxStyle">
              <p>Test User email: testuser@email.com <br/> Test User password: testpassword  </p>
              <p style={{ color: "red", fontFamily: "'Courier New', Courier, monospace",fontSize:"11px", textAlign: "left" }}>Not Working? Possible Reasons: <ol><li>The Backend server (deployed on Render) might have slept due to long inactivity. It should load after some time in this case.</li><li>The MongoDB database might have slept because of long inactivity.In this case or otherwise, feel free to write to me at aryankohli0805@gmail.com. I Love reading emails :)</li></ol></p>
   </div>
  );
}
// TEST User 2 email - aryank@email.com
// TEST User 2 password - aryanisnewuser
export default TestUserDetails;
