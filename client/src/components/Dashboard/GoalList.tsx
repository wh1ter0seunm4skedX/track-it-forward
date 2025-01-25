import React from 'react';

const GoalList: React.FC<{ goals: Array<{ id: string; name: string; cost: number; description: string; targetDate: string; }> }> = ({ goals }) => {
    return (
        <div className="goal-list">
            <h2 className="text-xl font-bold">Your Financial Goals</h2>
            <ul>
                {goals.map(goal => (
                    <li key={goal.id} className="border-b py-2">
                        <h3 className="text-lg">{goal.name}</h3>
                        <p>{goal.description}</p>
                        <p>Cost: ${goal.cost}</p>
                        <p>Target Date: {goal.targetDate}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default GoalList;