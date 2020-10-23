import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
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
  const clickHandler = async (path) => {
    const response = await fetch(
      `https://quote-garden.herokuapp.com/api/v2/genres/${path}?page=1&limit=10`
    );
    const { quotes } = await response.json();
    for (const q of quotes) {
      setQuotes((old) => [...old, q.quoteText]);
    }
    SetGenreIsActive(false);
  };
  console.log(quotes);
  return !genreIsAtive ? (
    <div className="app">
      <h3>Quote Magazin</h3>
      <Head quoteOfTheDay={quoteOfTheDay} author={authorOfQod} />
      <div className="app__category">
        {genres.map((g) => {
          return (
            <QuoteCategory
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
    <div>
      {quotes.map((a) => {
        return <Head quoteOfTheDay={a} />;
      })}
      <button onClick={() => SetGenreIsActive(false)}>Back</button>;
    </div>
  );
}

export default App;
