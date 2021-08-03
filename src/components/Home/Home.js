import React from "react";
import "./Home.css";

function Home() {
  const storedToken = localStorage.getItem("token");
  if (!storedToken) {
    window.location = "/";
  }
  return (
    <div className="home">
      {storedToken && (
        <div className="container">
          <h1>Homepage</h1>
          <p>This homepage is protected you can not access it right way</p>
        </div>
      )}
    </div>
  );
}

export default Home;
