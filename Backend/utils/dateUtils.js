exports.getDateRange = (interval) => {
    const now = new Date();
    let start, end;

    switch (interval) {
        case 'daily':
            start = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 30);
            break;
        case 'monthly':
            start = new Date(now.getFullYear(), now.getMonth() - 12, 1);
            break;
        case 'quarterly':
            start = new Date(now.getFullYear() - 1, now.getMonth() - 3, 1);
            break;
        case 'yearly':
            start = new Date(now.getFullYear() - 5, 0, 1);
            break;
        default:
            start = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 30);
    }

    end = now;
    return { start, end };
};