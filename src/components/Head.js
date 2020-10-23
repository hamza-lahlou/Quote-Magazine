import React from "react";
import "./Head.css";
function Head({ quoteOfTheDay, author }) {
  return (
    <div className="head">
      <p className="head__qod">
        <q>{quoteOfTheDay}</q>
      </p>
      <p className="head__author">
        <i>{author}</i>
      </p>
    </div>
  );
}

export default Head;
