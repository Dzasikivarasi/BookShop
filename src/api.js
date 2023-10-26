const API_KEY = 'AIzaSyCYbA13laaPKWoRf9PWdGoLHNM2HOVi6n0';
const BOOKS_COUNT = 6;

async function loadData(category = 'Architecture', startIndex = 0) {
    const API_URL = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(`"subject:${category}"`)}&key=${API_KEY}&printType=books&startIndex=${startIndex}&maxResults=${BOOKS_COUNT}&langRestrict=en`;

    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error(`Ошибка загрузки данных: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Ошибка при получении данных:', error);
        throw error;
    }
}


export { loadData, BOOKS_COUNT};
