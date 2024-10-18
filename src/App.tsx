import './App.css';
import { useState } from 'react';

const App = () => {
    const [num1, setNum1] = useState('');
    const [num2, setNum2] = useState('');
    const [sum, setSum] = useState(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('Form submitted');
        try {
            const requestBody = {
                body: JSON.stringify({ num1: parseFloat(num1), num2: parseFloat(num2) })
            };
            const response = await fetch('https://6rgv31sf91.execute-api.us-east-1.amazonaws.com/dev/hehe', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            });
            console.log('Response received');
            const text = await response.text(); // Get raw response text
            console.log('Raw response text:', text);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = JSON.parse(text); // Parse the raw text as JSON
            console.log('Data received:', data);
            const result = JSON.parse(data.body); // Parse the body field
            setSum(result.sum); // Set the sum from the parsed result
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    };

    return (
        <div>
            <h1>Sum Calculator</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="number"
                    value={num1}
                    onChange={(e) => setNum1(e.target.value)}
                    placeholder="Number 1"
                /><br></br>
                <input
                    type="number"
                    value={num2}
                    onChange={(e) => setNum2(e.target.value)}
                    placeholder="Number 2"
                /><br></br>
                <button type="submit">Calculate Sum</button>
            </form>
            <h3>Result from API:</h3>{sum !== null && <h2>Sum: {sum}</h2>}
        </div>
    );
};

export default App;
