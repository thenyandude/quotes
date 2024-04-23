import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/Home.css'

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
        <div className="container home-page">
            {quotes.slice(0, 1).map((quote, index) => (
                <div key={index} className="home-quote-item quote-item-centered">
                    <h3>"{quote.quoteText}"</h3>
                    <small>-{quote.origin}</small>
                    <button onClick={() => handleToggleLike(quote._id, quote.likes.includes(userId))}
                            className={quote.likes.includes(userId) ? "unlike-button" : "like-button"}>
                        {quote.likes.includes(userId) ? 'Unlike' : 'Like'} ({quote.likes.length})
                    </button>
                </div>
            ))}
        </div>
    );
    
}

export default Home;
