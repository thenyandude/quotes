import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../css/App.css';

function FindQuotes() {
  const [quotes, setQuotes] = useState([]);
  const { username } = useParams(); // Get username from URL

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/quotes/${username}`);
        setQuotes(response.data); // Get all quotes
      } catch (error) {
        console.error("Error fetching quotes", error);
      }
    };

    fetchQuotes();
  }, [username]);

  return (
    <div className="container">
      <h2>Quotes by {username}</h2>
      <div className="quotes-container">
        {quotes.map((quote, index) => (
          <div key={index} className="quote">
            <p>{quote.quoteText}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FindQuotes;
