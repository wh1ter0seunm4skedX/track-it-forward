import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Goal } from '../../types';
import { updateGoal, getGoalById } from '../../utils/api';

const EditGoal: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const history = useHistory();
    const [goal, setGoal] = useState<Goal | null>(null);
    const [name, setName] = useState('');
    const [cost, setCost] = useState(0);
    const [description, setDescription] = useState('');
    const [targetDate, setTargetDate] = useState('');

    useEffect(() => {
        const fetchGoal = async () => {
            const fetchedGoal = await getGoalById(id);
            setGoal(fetchedGoal);
            if (fetchedGoal) {
                setName(fetchedGoal.name);
                setCost(fetchedGoal.cost);
                setDescription(fetchedGoal.description);
                setTargetDate(fetchedGoal.targetDate);
            }
        };
        fetchGoal();
    }, [id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (goal) {
            await updateGoal(id, { name, cost, description, targetDate });
            history.push('/dashboard');
        }
    };

    if (!goal) return <div>Loading...</div>;

    return (
        <div>
            <h2>Edit Goal</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div>
                    <label>Cost:</label>
                    <input type="number" value={cost} onChange={(e) => setCost(Number(e.target.value))} required />
                </div>
                <div>
                    <label>Description:</label>
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
                </div>
                <div>
                    <label>Target Date:</label>
                    <input type="date" value={targetDate} onChange={(e) => setTargetDate(e.target.value)} required />
                </div>
                <button type="submit">Update Goal</button>
            </form>
        </div>
    );
};

export default EditGoal;