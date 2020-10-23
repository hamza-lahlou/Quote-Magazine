import React, { useEffect, useState } from "react";
import Head from "./components/Head";
import QuoteCategory from "./components/QuoteCategory";
import "./HomePage.css";

function HomePage(handleClik) {
  //---------------------- Getting the quote of the day-------------------//
  const [quoteOfTheDay, setQuoteOfTheDay] = useState("");
  const [authorOfQod, setAuthorOfQod] = useState("");
  useEffect(() => {
    const getQuoteOfTheDay = async () => {
      fetch("https://quotes.rest/qod?language=en")
        .then((response) => response.json())
        .then((data) => {
          const qod = data.contents.quotes[0].quote;
          const author = data.contents.quotes[0].author;
          setQuoteOfTheDay(qod);
          setAuthorOfQod(author);
        });
    };
    getQuoteOfTheDay();
  }, []);
  //-----------------------------------------------------------------------------//
  //--------------------Getting all the quotes Genres---------------------------//
  const [genres, setGenres] = useState([]);
  useEffect(() => {
    const getGenres = async () => {
      fetch("https://quote-garden.herokuapp.com/api/v2/genres")
        .then((response) => response.json())
        .then((data) => {
          for (const g of data.genres) {
            setGenres((oldGenres) => [...oldGenres, g]);
          }
        });
    };
    getGenres();
  }, []);
  //-----------------------------------------------------------------------------//

  return (
    <div className="homePage">
      <h3>Quote Magazin</h3>
      <Head quoteOfTheDay={quoteOfTheDay} author={authorOfQod} />
      <div className="homePage__category">
        {genres.map((g) => {
          return <QuoteCategory key={g} genre={g} handleClik={handleClik} />;
        })}
      </div>
    </div>
  );
}

export default HomePage;
