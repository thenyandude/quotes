import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Home() {
  const [quotes, setQuotes] = useState([]);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
      async function fetchQuotes() {
          const response = await axios.get('http://localhost:3001/api/quotes');
          setQuotes(response.data);
      }
      fetchQuotes();
  }, []);

  const handleLike = async (quoteId) => {
      await axios.put(`http://localhost:3001/api/quotes/${quoteId}/like`, { userId });
      setQuotes(quotes.map(quote => quote._id === quoteId ? {...quote, likes: [...quote.likes, userId]} : quote));
  };

  const handleUnlike = async (quoteId) => {
      await axios.put(`http://localhost:3001/api/quotes/${quoteId}/unlike`, { userId });
      setQuotes(quotes.map(quote => quote._id === quoteId ? {...quote, likes: quote.likes.filter(id => id !== userId)} : quote));
  };

  return (
      <div>
          {quotes.map((quote, index) => (
              <div key={index} className="quote-item">
                  <h3>{quote.text}</h3>
                  <p>{quote.author}</p>
                  <small>{quote.date}</small>
                  {quote.likes.includes(userId) ? (
                      <button className="unlike-button" onClick={() => handleUnlike(quote._id)}>Unlike</button>
                  ) : (
                      <button className="like-button" onClick={() => handleLike(quote._id)}>Like</button>
                  )}
                  <span>Likes: {quote.likes.length}</span>
              </div>
          ))}
      </div>
  );
}

export default Home;
