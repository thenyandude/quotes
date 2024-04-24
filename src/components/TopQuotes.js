import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/TopQuotes.css'; // Import TopQuotes.css
function TopQuotes() {
    const [quotes, setQuotes] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const userId = localStorage.getItem('userId');

    useEffect(() => {
        fetchTopQuotes();
    }, []);

    const fetchTopQuotes = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get('http://localhost:3001/api/top-quotes');
            setQuotes(response.data);
            setIsLoading(false);
        } catch (err) {
            setError('Failed to fetch top quotes.');
            setIsLoading(false);
            console.error('Error fetching top quotes:', err);
        }
    };

    const handleToggleLike = async (quoteId, isLiked) => {
      if (!userId) {
        alert("You need to log in to like quotes.");
        return;
      }

      const endpoint = isLiked ? `/api/quotes/${quoteId}/unlike` : `/api/quotes/${quoteId}/like`;

      try {
          await axios.put(`http://localhost:3001${endpoint}`, { userId });
          const updatedQuotes = quotes.map(quote => {
              if (quote._id === quoteId) {
                  return {
                      ...quote,
                      likes: isLiked ? quote.likes.filter(id => id !== userId) : [...quote.likes, userId]
                  };
              }
              return quote;
          });
          setQuotes(updatedQuotes);
      } catch (error) {
          console.error(`Error ${isLiked ? 'unliking' : 'liking'} the quote`, error);
      }
    };

    return (
        <div className="top-container">
            <h1>Top Quotes</h1>
            {isLoading ? (
                <p>Loading...</p>
            ) : error ? (
                <p className="error">{error}</p>
            ) : (
                quotes.map((quote, index) => (
                    <div key={index} className="top-quote-item">
                        <blockquote>
                            "{quote.quoteText}"
                            <footer>— {quote.origin}</footer>
                        </blockquote>
                        <button onClick={() => handleToggleLike(quote._id, quote.likes.includes(userId))}
                                className={quote.likes.includes(userId) ? "unlike-button" : "like-button"}>
                            {quote.likes.includes(userId) ? 'Unlike' : 'Like'} ({quote.likes.length})
                        </button>
                    </div>
                ))
            )}
        </div>
    );
}

export default TopQuotes;
