import React, { useState, useEffect } from "react";
import Board from "./Board";
import { updateURLParameter } from "./helpers";
import './index.css' 
import LeaderBoard from "./LeaderBoard";
import * as apiClient from "./apiClient";
// import num1 from './images/1.jpg';
// import num2 from './images/2.jpg';

function App() {
  const [imageUrl, setImageUrl] = useState("");
  const [leaders, setLeaders] = useState([]);
  const images = [
    imageUrl,
    imageUrl,
    imageUrl,
    imageUrl,
    imageUrl,
    imageUrl,
    imageUrl,
    imageUrl,
    imageUrl,
    imageUrl,
    imageUrl,
    imageUrl,
    imageUrl,
    imageUrl,
    imageUrl,
    imageUrl,
  ];
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);

    if (urlParams.has("img")) {
      setImageUrl(urlParams.get("img"));
    }
  }, []);
  const handleImageChange = (event) => {
    setImageUrl(event.target.value);
    window.history.replaceState(
      "",
      "",
      updateURLParameter(window.location.href, "img", event.target.value)
    );
  };
  const loadLeaders = async () => setLeaders(await apiClient.getLeaders());
  useEffect(() => {
    loadLeaders();
  }, [leaders]);
  return (
    <div className="App">
      <Board
        rows={4}
        cols={4}
        width={320}
        height={320}
        image={imageUrl}
        images={images}
      />
      <LeaderBoard
        leaders={leaders}
      />
      {/* <label>
        Image:
        <input
          value={imageUrl}
          onChange={handleImageChange}
          type="text"
          name="name"
        />
      </label> */}
    </div>
  );
}

export default App;

