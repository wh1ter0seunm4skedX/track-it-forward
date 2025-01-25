export const calculateTimeline = (targetDate: Date, currentSavings: number, monthlySavings: number): number => {
    const timeDiff = targetDate.getTime() - new Date().getTime();
    const daysUntilTarget = Math.ceil(timeDiff / (1000 * 3600 * 24));
    const monthsUntilTarget = Math.ceil(daysUntilTarget / 30);
    const totalNeeded = targetDate.getTime() - currentSavings;
    const monthsNeeded = Math.ceil(totalNeeded / monthlySavings);
    return monthsNeeded > monthsUntilTarget ? monthsNeeded : monthsUntilTarget;
};

export const calculateProgress = (currentSavings: number, targetAmount: number): number => {
    return (currentSavings / targetAmount) * 100;
};