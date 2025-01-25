import React from 'react';

interface GoalItemProps {
    name: string;
    cost: number;
    description: string;
    targetDate: string;
    onEdit: () => void;
}

const GoalItem: React.FC<GoalItemProps> = ({ name, cost, description, targetDate, onEdit }) => {
    return (
        <div className="p-4 border rounded shadow-md">
            <h3 className="text-lg font-semibold">{name}</h3>
            <p className="text-gray-600">Cost: ${cost.toFixed(2)}</p>
            <p className="text-gray-600">Description: {description}</p>
            <p className="text-gray-600">Target Date: {new Date(targetDate).toLocaleDateString()}</p>
            <button 
                className="mt-2 bg-blue-500 text-white py-1 px-3 rounded"
                onClick={onEdit}
            >
                Edit
            </button>
        </div>
    );
};

export default GoalItem;