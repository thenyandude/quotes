import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../css/Home.css'; // Ensures styling is consistent

function FindQuotes() {
  const [quotes, setQuotes] = useState([]);
  const { username } = useParams();
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        // Adjust the endpoint as necessary to filter quotes by username
        const response = await axios.get(`http://localhost:3001/api/quotes/byUser/${username}`);
        setQuotes(response.data);
      } catch (error) {
        console.error("Error fetching quotes", error);
      }
    };
    fetchQuotes();
  }, [username]);

  const handleToggleLike = async (quoteId, isLiked) => {
    const endpoint = isLiked ? `/api/quotes/${quoteId}/unlike` : `/api/quotes/${quoteId}/like`;
    try {
      await axios.put(`http://localhost:3001${endpoint}`, { userId });
      setQuotes(quotes.map(quote => {
        if (quote._id === quoteId) {
          const updatedLikes = isLiked
            ? quote.likes.filter(id => id !== userId)
            : [...quote.likes, userId];
          return { ...quote, likes: updatedLikes };
        }
        return quote;
      }));
    } catch (error) {
      console.error(`Error ${isLiked ? 'unliking' : 'liking'} the quote`, error);
    }
  };

  return (
    <div className="container">
      <h2>Quotes by {username}</h2>
      <div className="quotes-container">
        {quotes.map((quote, index) => (
          <div key={index} className="home-quote-item">
            <h3>"{quote.quoteText}"</h3>
            <small>- {quote.origin || 'Unknown'}</small>
            <button onClick={() => handleToggleLike(quote._id, quote.likes.includes(userId))}
                    className={quote.likes.includes(userId) ? "unlike-button" : "like-button"}>
              {quote.likes.includes(userId) ? 'Unlike' : 'Like'} ({quote.likes.length})
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FindQuotes;
