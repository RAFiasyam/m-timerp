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
        <div className="card bg-primary w-96 text-white">
            <div className='card-body items-center justify-center'>
                <h1 className='card-title'>{name}</h1>
                <h2>{formatTime(seconds)}</h2>
                <div className='card-actions justify-end'>
                    <button className='btn btn-success text-white' onClick={startTimer} disabled={isRunning}>
                        Start
                    </button>
                    <button className='btn btn-warning text-white' onClick={stopTimer} disabled={!isRunning}>
                        Stop
                    </button>
                    <button className='btn btn-info text-white' onClick={resetTimer}>Reset</button>
                    <button className='btn btn-error text-white' onClick={onRemove}>Remove</button>
                </div>
            </div>
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
            alert('enter an item name!!!');
        }
    };

    const removeItem = (index) => {
        setItems((prevItems) => prevItems.filter((_, i) => i !== index));
    };

    return (
        <div className='m-5 flex flex-col gap-5'>
            <form onSubmit={handleAddItem} className='flex flex-row gap-3 items-center justify-center'>
                <input type="text" name="newItem" className="input input-bordered input-success w-full max-w-xs" placeholder="Item name please..." />
                <button type="submit" className='btn btn-success text-white'>Add Item</button>
            </form>
            <div className='flex flex-row gap-5'>
                {items.map((item, index) => (
                    <Timer
                        key={index}
                        name={item}
                        onRemove={() => removeItem(index)}
                    />
                ))}
            </div>
        </div>
    );
};

export default Timers;