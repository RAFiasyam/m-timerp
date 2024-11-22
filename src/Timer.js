import React, { useEffect, useState } from 'react'

function Timer({ name, onRemove }) {
    const [seconds, setSeconds] = useState(0);
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
        let interval;
        if (isRunning) {
            interval = setInterval(() => {
                setSeconds((prev) => prev + 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isRunning]);

    const formatTime = (totalSeconds) => {
        const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
        const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0')
        const seconds = String(totalSeconds % 60).padStart(2, '0');
        return `${hours}:${minutes}:${seconds}`;
    };

    const startTimer = () => setIsRunning(true);
    const stopTimer = () => setIsRunning(false);
    const resetTimer = () => {
        setIsRunning(false);
        setSeconds(0);
    };

    return (
        <div>
            <h1>{name}</h1>
            <h2>{formatTime(seconds)}</h2>
            <div>
                <button onClick={startTimer} disabled={isRunning}>
                    Start
                </button>
                <button onClick={stopTimer} disabled={!isRunning}>
                    Stop
                </button>
                <button onClick={resetTimer}>Reset</button>
            </div>
            <button onClick={onRemove}>Remove</button>
        </div>
    );
}


function Timers() {
    const [items, setItems] = useState([]);

    const handleAddItem = (event) => {
        event.preventDefault();
        const newItem = event.target.newItem.value;

        if (newItem.trim()) {
            setItems((prevItems) => [...prevItems, newItem]);
            event.target.newItem.value = '';
        } else {
            alert('enter an item name!!!🤬');
        }
    };

    const removeItem = (index) => {
        setItems((prevItems) => prevItems.filter((_, i) => i !== index));
    };

    return (
        <div className='m-5'>
            <form onSubmit={handleAddItem} className='flex flex-row gap-3 items-center justify-center'>
                <input type="text" name="newItem" className="input input-bordered input-success w-full max-w-xs"  placeholder="Item name please..." />
                <button type="submit" className='btn btn-success text-white'>Add Item</button>
            </form>
            {items.map((item, index) => (
                <Timer
                    key={index}
                    name={item}
                    onRemove={() => removeItem(index)}
                />
            ))}
        </div>
    );
};

export default Timers;