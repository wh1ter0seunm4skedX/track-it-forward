import React from 'react';

interface ProgressBarProps {
    progress: number; // Progress percentage (0 to 100)
    goalName: string; // Name of the financial goal
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress, goalName }) => {
    return (
        <div className="w-full bg-gray-200 rounded-full">
            <div
                className="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-l-full"
                style={{ width: `${progress}%` }}
            >
                {goalName}: {progress}%
            </div>
        </div>
    );
};

export default ProgressBar;