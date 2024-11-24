import React, { useEffect, useRef, useState } from 'react';

function Timer({ name, onRemove }) {
    const [seconds, setSeconds] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [earnings, setEarnings] = useState(0);

    // Gunakan ref untuk menyimpan milestone terakhir
    const lastMilestone = useRef(0);

    useEffect(() => {
        let interval;
        if (isRunning) {
            interval = setInterval(() => {
                setSeconds((prevSeconds) => {
                    const newSeconds = prevSeconds + 1;

                    // Tambahkan Rp1.000 setiap 10 menit (600 detik)
                    if (newSeconds % 600 === 0 && newSeconds !== lastMilestone.current) {
                        setEarnings((prevEarnings) => prevEarnings + 1000);
                        lastMilestone.current = newSeconds; // Update milestone
                    }

                    return newSeconds;
                });
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isRunning]);

    const formatTime = (totalSeconds) => {
        const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
        const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
        const seconds = String(totalSeconds % 60).padStart(2, '0');
        return `${hours}:${minutes}:${seconds}`;
    };

    const startTimer = () => setIsRunning(true);

    const stopTimer = () => setIsRunning(false);

    const resetTimer = () => {
        setIsRunning(false);
        setSeconds(0);
        setEarnings(0);
        lastMilestone.current = 0; // Reset milestone
    };

    return (
        <div className="card bg-primary w-96 text-white">
            <div className="card-body items-center justify-center">
                <h1 className="card-title">Ps Nomor : {name}</h1>
                <h2>{formatTime(seconds)}</h2>
                <h3>Earnings: Rp {earnings.toLocaleString('id-ID')}</h3>
                <div className="card-actions justify-end">
                    <button className="btn btn-success text-white" onClick={startTimer} disabled={isRunning}>
                        Start
                    </button>
                    <button className="btn btn-warning text-white" onClick={stopTimer} disabled={!isRunning}>
                        Stop
                    </button>
                    <button className="btn btn-info text-white" onClick={resetTimer}>Reset</button>
                    <button className="btn btn-error text-white" onClick={onRemove}>Remove</button>
                </div>
            </div>
        </div>
    );
}

function Timers() {
    const [items, setItems] = useState([]);
    const [newItem, setNewItem] = useState('');

    const handleAddItem = (event) => {
        event.preventDefault();
        const newItem = event.target.newItem.value;

        if (newItem.trim() === '') {
            alert('Masukan nomor ps dlu!');
            return
        }

        if (items.includes(newItem)) {
            alert('Nomor Ps sudah digunakan, coba yg lain!');
            return
        }

        setItems((prevItems) => [...prevItems, newItem]);
        setNewItem('');


    };

    const removeItem = (index) => {
        setItems((prevItems) => prevItems.filter((_, i) => i !== index));
    };

    return (
        <div className="m-5 flex flex-col gap-5">
            <form onSubmit={handleAddItem} className="flex flex-row gap-3 items-center justify-center">
                <input type="text" name="newItem" onChange={(e) => setNewItem(e.target.value)} className="input input-bordered input-success w-full max-w-xs" value={newItem} onChange={(e) => setNewItem(e.target.value)}
                  placeholder="Nomor Ps" />
                <button type="submit" className="btn btn-success text-white">Add Ps</button>
            </form>
            <div className="flex flex-wrap gap-5 items-center justify-center">
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
}

export default Timers;
