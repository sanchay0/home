export const calculateReadingTime = (text: string): number  => {
    const words = text.trim().split(/\s+/) // Split the text into words
    const wordCount = words.length
    const readingTimeInMinutes = Math.ceil(wordCount / 238); // Divide word count by average reading speed and round up
    return readingTimeInMinutes
}

// month.day.year, Ex: 05.27.23
export const formatDate = (date: Date): string => `${(date.getMonth() + 1).toString().padStart(2, "0")}.${date.getDate().toString().padStart(2, "0")}.${date.getFullYear()}`

export const formatFirestoreDate = (time: number): string => {
    const date = new Date(time)
    const options: Intl.DateTimeFormatOptions = {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    }
    return date.toLocaleString('en-US', options)
  }

export const validateEmail = (email: string) => email
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
