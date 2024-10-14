
import './App.css'

import { useState } from 'react';

const App = () => {
    const [num1, setNum1] = useState('');
    const [num2, setNum2] = useState('');
    const [sum, setSum] = useState(null);

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        const response = await fetch('YOUR_API_GATEWAY_URL/sum', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ num1: parseFloat(num1), num2: parseFloat(num2) }),
        });
        const data = await response.json();
        setSum(data.sum);
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
                />
                <input
                    type="number"
                    value={num2}
                    onChange={(e) => setNum2(e.target.value)}
                    placeholder="Number 2"
                />
                <button type="submit">Calculate Sum</button>
            </form>
            {sum !== null && <h2>Sum: {sum}</h2>}
        </div>
    );
};

export default App;
