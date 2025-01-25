import React from 'react';

const Summary: React.FC = () => {
    // Sample data for demonstration
    const goals = [
        { name: 'Vacation', cost: 2000, description: 'Trip to Hawaii', targetDate: '2023-12-31', saved: 500 },
        { name: 'New Car', cost: 15000, description: 'Down payment for a new car', targetDate: '2024-06-30', saved: 3000 },
    ];

    const totalCost = goals.reduce((acc, goal) => acc + goal.cost, 0);
    const totalSaved = goals.reduce((acc, goal) => acc + goal.saved, 0;

    return (
        <div className="summary">
            <h2 className="text-2xl font-bold">Financial Goals Summary</h2>
            <div className="mt-4">
                <p>Total Goals: {goals.length}</p>
                <p>Total Cost: ${totalCost}</p>
                <p>Total Saved: ${totalSaved}</p>
                <p>Remaining: ${totalCost - totalSaved}</p>
            </div>
            <div className="mt-4">
                {goals.map((goal, index) => (
                    <div key={index} className="goal-item">
                        <h3 className="font-semibold">{goal.name}</h3>
                        <p>{goal.description}</p>
                        <p>Cost: ${goal.cost}</p>
                        <p>Saved: ${goal.saved}</p>
                        <p>Target Date: {goal.targetDate}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Summary;