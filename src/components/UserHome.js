import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import '../css/UserHome.css'; // Make sure your path here is correct

function UserHome() {
    const [quoteText, setQuoteText] = useState('');
    const [quotes, setQuotes] = useState([]);
    const [charCount, setCharCount] = useState(0);
    const [origin, setOrigin] = useState('');
    const [error, setError] = useState('');
    const [editingQuoteId, setEditingQuoteId] = useState(null);
    const userId = localStorage.getItem('userId');

    const handleQuoteTextChange = (e) => {
        setQuoteText(e.target.value);
        setCharCount(e.target.value.length);
    };

    const fetchQuotes = useCallback(async () => {
        try {
            const response = await axios.get(`http://10.12.99.20/api/quotes?userId=${userId}`);
            setQuotes(response.data.slice(0, 5));
        } catch (error) {
            console.error("Error fetching quotes", error);
        }
    }, [userId]);

    useEffect(() => {
        if (userId) {
            fetchQuotes();
        }
        const intervalId = setInterval(fetchQuotes, 30000);
        return () => clearInterval(intervalId);
    }, [userId, fetchQuotes]);

    const handleCreateQuote = async (event) => {
        event.preventDefault();
        if (!quoteText.trim() || !origin.trim()) {
            setError("Please fill out all fields.");
            return;
        }
        const quoteData = {
            quoteText,
            origin,
            userId
        };
        const endpoint = editingQuoteId ? `/api/quotes/${editingQuoteId}` : '/api/quotes';
        try {
            const response = await axios[editingQuoteId ? 'put' : 'post'](`http://10.12.99.20${endpoint}`, quoteData);
            if (response.data) {
                fetchQuotes();
                setQuoteText('');
                setOrigin('');
                setEditingQuoteId(null);
                setError('');
            }
        } catch (error) {
            console.error("Error saving quote", error);
            setError("Failed to save quote.");
        }
    };

    const deleteQuote = async (quoteId) => {
        try {
            const response = await axios.delete(`http://10.12.99.20/api/quotes/${quoteId}`);
            if (response.status === 200) {
                setQuotes(quotes.filter(quote => quote._id !== quoteId));
            }
        } catch (error) {
            console.error('Error deleting quote', error);
        }
    };

    const selectQuoteToEdit = (quote) => {
        setQuoteText(quote.quoteText);
        setOrigin(quote.origin);
        setEditingQuoteId(quote._id);
    };

    return (
        <div className="user-home-container">
            <div className="create-quote-form">
                <h2>{editingQuoteId ? "Edit Quote" : "Create a New Quote"}</h2>
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
                    <button type="submit">{editingQuoteId ? "Update Quote" : "Publish Quote"}</button>
                </form>
            </div>
            <div className="quotes-list">
                <h3>Previous Quotes:</h3>
                {quotes.map((quote, index) => (
                    <div key={index} className="quote-item">
                        <p>{quote.quoteText}</p>
                        <p>{quote.origin}</p>
                        <button className="edit-button" onClick={() => selectQuoteToEdit(quote)}>Edit</button>
                        <button className="delete-quote-button" onClick={() => deleteQuote(quote._id)}>Delete</button>
                    </div>
                ))}
            </div>
        </div>
    );    
}

export default UserHome;
