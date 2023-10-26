import './styles/styles.scss';

// js
import { switchPicture, defoltSwitch } from './slider.js';
import { onCategoryClick } from './categories.js';
import { OnHeaderLinkClick } from './menu-style.js';
import { loadData, BOOKS_COUNT } from './api.js';
import { renderCards } from './render-cards.js';


// Состояние данных по умолчанию
const state = {
    currentCategory: 'Architecture',
    startIndex: 0
};

async function updateBooksByCategory({ category, isLoadMore = false }) {
    state.currentCategory = category;

    try {
        const data = await loadData(state.currentCategory, state.startIndex);

        if (!data.items || data.items.length === 0) {
            console.log("Ответ API не содержит книг для отображения.");
            renderCards([]);
            return;
        }

        const books = data.items;
        
        renderCards(books, isLoadMore);

        if (isLoadMore) {
            state.startIndex += BOOKS_COUNT; 
        } else {
            state.startIndex = BOOKS_COUNT; 
        }
    } catch (error) {
        console.error('Ошибка:', error);
    }
}

function getCurrentCategory() {
    return state.currentCategory;
}

// Отрисовка первоначальной страницы по дефолтной категории
const defaultCategory = 'Architecture';
updateBooksByCategory({ category: defaultCategory });

onCategoryClick();

export { updateBooksByCategory, getCurrentCategory }  