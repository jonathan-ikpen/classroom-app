export function timeAgoAndFormattedDate(timestamp: string): { ago: string; formattedDate: string } {
    const currentDate = new Date();
    const inputDate = new Date(timestamp);

    // Calculate the time difference in seconds
    const timeDifferenceSeconds = Math.floor((currentDate.getTime() - inputDate.getTime()) / 1000);

    if (timeDifferenceSeconds < 60) {
        // Less than a minute
        return { ago: `${timeDifferenceSeconds} seconds ago`, formattedDate: formatDate(inputDate) };
    } else if (timeDifferenceSeconds < 3600) {
        // Less than an hour
        const minutesAgo = Math.floor(timeDifferenceSeconds / 60);
        return { ago: `${minutesAgo} minutes ago`, formattedDate: formatDate(inputDate) };
    } else if (timeDifferenceSeconds < 86400) {
        // Less than a day
        const hoursAgo = Math.floor(timeDifferenceSeconds / 3600);
        return { ago: `${hoursAgo} hours ago`, formattedDate: formatDate(inputDate) };
    } else if (timeDifferenceSeconds < 604800) {
        // Less than a week
        const daysAgo = Math.floor(timeDifferenceSeconds / 86400);
        return { ago: `${daysAgo} days ago`, formattedDate: formatDate(inputDate) };
    } else if (timeDifferenceSeconds < 2419200) {
        // Less than a month (4 weeks)
        const weeksAgo = Math.floor(timeDifferenceSeconds / 604800);
        return { ago: `${weeksAgo} weeks ago`, formattedDate: formatDate(inputDate) };
    } else {
        // More than a month
        return { ago: formatDate(inputDate), formattedDate: formatDate(inputDate) };
    }
}

function formatDate(date: Date): string {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.toLocaleString('en-US', { month: 'short' }));
    const year = String(date.getFullYear());

    return `${day} ${month} ${year}`;
}

// // Example usage:
// const timestamp = "Tue Jan 09 2024 12:13:36 GMT+0100 (West Africa Standard Time)";
// const result = timeAgoAndFormattedDate(timestamp);
// console.log(result);
