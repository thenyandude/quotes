import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Home() {
  const [quotes, setQuotes] = useState([]);

  useEffect(() => {
      const fetchQuotes = async () => {
          try {
              const response = await axios.get('http://localhost:3001/api/quotes');
              setQuotes(response.data);
          } catch (error) {
              console.error("Error fetching quotes", error);
          }
      };

      fetchQuotes();
  }, []);

  const recentQuotes = quotes.slice(0, 1); // Get the first 10 quotes

  return (
      <div className="container">
        {recentQuotes.map((quote, index) => (
          <div key={index} className="post">
            <h3>{quote.quoteText}</h3>
            <small>Posted by: {quote.userId?.username} on {new Date(quote.created).toLocaleString()}</small>
          </div>
        ))}
      </div>
    );      
}

export default Home;
