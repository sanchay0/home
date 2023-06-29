export const calculateReadingTime = (text) => {
    const words = text.trim().split(/\s+/); // Split the text into words
    const wordCount = words.length;
    const readingTimeInMinutes = Math.ceil(wordCount / 238); // Divide word count by average reading speed and round up
    return readingTimeInMinutes;
}

// month.day.year, Ex: 05.27.23
export const formatDate = (date) => `${(date.getMonth() + 1).toString().padStart(2, "0")}.${date.getDate().toString().padStart(2, "0")}.${date.getFullYear()}`
