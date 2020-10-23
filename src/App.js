import React, { useEffect, useState } from "react";
import "./App.css";
import Head from "./components/Head";
import QuoteCategory from "./components/QuoteCategory";

function App() {
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
  const [genreIsAtive, SetGenreIsActive] = useState(false);
  const [quotes, setQuotes] = useState([]);
  const [quoteAuthor, setQuoteAuthor] = useState([]);
  const clickHandler = async (path) => {
    const response = await fetch(
      `https://quote-garden.herokuapp.com/api/v2/genres/${path}?page=1&limit=100`
    );
    const { quotes } = await response.json();
    for (const q of quotes) {
      setQuotes((old) => [...old, q.quoteText]);
      setQuoteAuthor((ol) => [...ol, q.quoteAuthor]);
    }
    SetGenreIsActive(true);
  };

  return !genreIsAtive ? (
    <div className="app">
      <h3>Quote Magazin</h3>
      <Head quoteOfTheDay={quoteOfTheDay} author={authorOfQod} />
      <div className="app__category">
        {genres.map((g) => {
          return (
            <QuoteCategory
              key={g}
              genre={g}
              handleClick={() => {
                clickHandler(g);
              }}
            />
          );
        })}
      </div>
    </div>
  ) : (
    <div className="app">
      <button className="back__button" onClick={() => SetGenreIsActive(false)}>
        Back
      </button>
      {quotes.map((a, index) => {
        return <Head quoteOfTheDay={a} author={quoteAuthor[index]} />;
      })}
    </div>
  );
}

export default App;
