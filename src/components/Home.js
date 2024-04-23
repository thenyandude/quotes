import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../css/Home.css';

function Home() {
    const [quote, setQuote] = useState(null);
    const userId = localStorage.getItem('userId'); // Define userId here

    useEffect(() => {
        const fetchRandomQuote = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/quotes/random');
                setQuote(response.data);
            } catch (error) {
                console.error("Error fetching random quote", error);
            }
        };

        fetchRandomQuote();
    }, []);

    const handleToggleLike = async (quoteId, isLiked) => {
      if (!userId) {
        alert("You need to create an account to like quotes.");
        return;
      }

      const endpoint = isLiked ? `/api/quotes/${quoteId}/unlike` : `/api/quotes/${quoteId}/like`;
  
      try {
          await axios.put(`http://localhost:3001${endpoint}`, { userId });
          if (quote._id === quoteId) {
              const updatedLikes = isLiked
                  ? quote.likes.filter(id => id !== userId)
                  : [...quote.likes, userId];
              setQuote({ ...quote, likes: updatedLikes });
          }
      } catch (error) {
          console.error(`Error ${isLiked ? 'unliking' : 'liking'} the quote`, error);
      }
    };

    return (
        <div className="container home-page">
            {quote && (
                <div className="home-quote-item quote-item-centered">
                    <h3>"{quote.quoteText}"</h3>
                    <small>-{quote.origin}</small>
                    <button onClick={() => handleToggleLike(quote._id, quote.likes.includes(userId))}
                            className={quote.likes.includes(userId) ? "unlike-button" : "like-button"}>
                        {quote.likes.includes(userId) ? 'Unlike' : 'Like'} ({quote.likes.length})
                    </button>
                </div>
            )}
        </div>
    );
}

export default Home;
