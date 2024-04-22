import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Home() {
    const [quotes, setQuotes] = useState([]);
    const userId = localStorage.getItem('userId'); // Define userId here

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

    const handleToggleLike = async (quoteId, isLiked) => {
      // The userId is now available here because it's defined outside this function
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
          {quotes.slice(0, 15).map((quote, index) => {
              const isLiked = quote.likes.includes(userId); // The userId is used here
              return (
                  <div key={index} className="quote-item">
                      <h3>{quote.quoteText}</h3>
                      <small>Posted by: {quote.userId?.username} on {new Date(quote.created).toLocaleString()}</small>
                      <button onClick={() => handleToggleLike(quote._id, isLiked)} className={isLiked ? "unlike-button" : "like-button"}>
                          {isLiked ? 'Unlike' : 'Like'} ({quote.likes.length})
                      </button>
                  </div>
              );
          })}
      </div>
  );
}

export default Home;
