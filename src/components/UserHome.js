import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import '../css/UserHome.css';
import '../css/App.css';



function UserHome() {
    const [quoteText, setQuoteText] = useState('');
    const [quotes, setQuotes] = useState([]);
    const [charCount, setCharCount] = useState(0);
    const [origin, setOrigin] = useState('');
    const [error, setError] = useState('');

    const userId = localStorage.getItem('userId');

    // Function to handle changes in the quote input field
    const handleQuoteTextChange = (e) => {
        const newQuoteText = e.target.value;
        setQuoteText(newQuoteText);
        setCharCount(newQuoteText.length); // Update character count
    };

    // Function to fetch quotes from the backend
    const fetchQuotes = useCallback(async () => {
        try {
            const response = await axios.get(`http://localhost:3001/api/quotes?userId=${userId}`);
            setQuotes(response.data.slice(0, 5)); // Fetch top 5 quotes for display
        } catch (error) {
            console.error("Error fetching quotes", error);
        }
    }, [userId]);

    useEffect(() => {
        if (userId) fetchQuotes();
        const intervalId = setInterval(fetchQuotes, 30000); // Refresh quotes every 30 seconds

        return () => clearInterval(intervalId);
    }, [userId, fetchQuotes]); // Effect dependencies

    // Function to handle the creation of a new quote
    const handleCreateQuote = async (event) => {
        event.preventDefault();
        if (!quoteText.trim() || !origin.trim()) {
            setError("Please fill out all fields.");
            console.error("Both fields are required.");
            return;  // Stop the form submission
        }
        try {
            const response = await axios.post('http://localhost:3001/api/quotes', {
                userId,
                quoteText,
                origin
            });
            setQuoteText('');
            setOrigin('');
            fetchQuotes();
        } catch (error) {
            console.error("Error creating quote", error);
        }
    };
    
    
      
    // Function to delete a quote
    const deleteQuote = async (quoteId) => {
        try {
            const response = await axios.delete(`http://localhost:3001/api/quotes/${quoteId}`);
            if (response.status === 200) {
                // Update state or inform user of success
                setQuotes(currentQuotes => currentQuotes.filter(quote => quote._id !== quoteId));
            } else {
                // Handle non-successful responses
                console.error('Failed to delete the quote');
            }
        } catch (error) {
            console.error('Error deleting quote', error);
        }
    };
    

    return (
        <div className="user-home-container">
            <div className="create-quote-form">
                <h2>Create a New Quote</h2>
                <form onSubmit={handleCreateQuote}>
                    <div className="form-group">
                        <textarea 
                            className={`form-control ${error && !quoteText.trim() ? 'input-error' : ''}`}
                            placeholder="Share a quote"
                            value={quoteText}
                            onChange={handleQuoteTextChange}
                            maxLength="100"
                        />
                        <div className="character-counter">
                            {charCount}/100 characters
                        </div>
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            placeholder="Origin"
                            value={origin}
                            onChange={(e) => setOrigin(e.target.value)}
                        />
                    </div>
                    <div className={`error-message ${error ? 'show' : 'hide'}`}>{error}</div>
                    <button type="submit">Publish Quote</button>
                </form>
            </div>
            <div className="quotes-list">
                <h3>Previous Quotes:</h3>
                {quotes.map((quote, index) => (
                    <div key={index} className="quote-item">
                        <p>{quote.quoteText}</p>
                        <p>{quote.origin}</p>
                        <button className="delete-quote-button" onClick={() => deleteQuote(quote._id)}>Delete</button>
                    </div>
                ))}
            </div>
        </div>
    );    
}

export default UserHome;