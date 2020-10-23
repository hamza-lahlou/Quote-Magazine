import React from "react";
import "./QuoteCategory.css";
import { Link } from "react-router-dom";
function QuoteCategory({ genre, handleClick }) {
  return (
    <div className="quoteCategory" onClick={handleClick}>
      <p>{genre}</p>
    </div>
  );
}

export default QuoteCategory;
