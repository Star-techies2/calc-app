// src/App.tsx
import { useState, useEffect } from 'react';

const App = () => {
    const [message, setMessage] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchMessage = async () => {
            try {
                const response = await fetch('https://6rgv31sf91.execute-api.us-east-1.amazonaws.com/dev/gett');
                const data = await response.json(); // Parse the JSON response
                const message = JSON.parse(data.body); // Extract and parse the body field
                setMessage(message);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching message:', error);
                setLoading(false);
            }
        };

        fetchMessage();
    }, []);

    return (
        <div>
            <h1>API Message</h1>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <p>{message}</p>
            )}
        </div>
    );
};

export default App;
