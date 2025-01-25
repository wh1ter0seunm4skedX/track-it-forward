import React, { useState } from 'react';

const CreateGoal: React.FC = () => {
    const [name, setName] = useState('');
    const [cost, setCost] = useState(0);
    const [description, setDescription] = useState('');
    const [targetDate, setTargetDate] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Logic to handle goal creation
        console.log({ name, cost, description, targetDate });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="name" className="block">Goal Name</label>
                <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="input"
                />
            </div>
            <div>
                <label htmlFor="cost" className="block">Cost</label>
                <input
                    type="number"
                    id="cost"
                    value={cost}
                    onChange={(e) => setCost(Number(e.target.value))}
                    required
                    className="input"
                />
            </div>
            <div>
                <label htmlFor="description" className="block">Description</label>
                <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    className="input"
                />
            </div>
            <div>
                <label htmlFor="targetDate" className="block">Target Date</label>
                <input
                    type="date"
                    id="targetDate"
                    value={targetDate}
                    onChange={(e) => setTargetDate(e.target.value)}
                    required
                    className="input"
                />
            </div>
            <button type="submit" className="btn">Create Goal</button>
        </form>
    );
};

export default CreateGoal;