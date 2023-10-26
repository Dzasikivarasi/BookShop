import { validateData } from './validate-data.js';
import { updateBooksByCategory, getCurrentCategory } from './index.js';
import { onBuyButtonClick, getButtonStyle } from './shopping-cart.js';

let loadMoreButton = null;

function validateLoadButton() {
    if (!loadMoreButton) {
        const container = document.querySelector('.main_content-items');
        loadMoreButton = document.createElement('button');
        loadMoreButton.className = 'main_content-items-load-button';
        loadMoreButton.innerText = 'LOAD MORE';
        container.appendChild(loadMoreButton);

        loadMoreButton.addEventListener('click', () => {
            console.log('click');
            const currentCategory = getCurrentCategory();
            updateBooksByCategory({ category: currentCategory, isLoadMore: true });
        });
    }
}

function renderCards(books, isLoadMore = false) {
    const container = document.querySelector('.main_content-items');
    let htmlContent = '';
    validateLoadButton();

    if (books.length === 0) {
        const noBooksMessage = '<p class="message_error">В выбранной категории отсутствуют книги для отображения.</p>';
        container.innerHTML = noBooksMessage;
        return;
    }

    books.forEach(book => {
        const { buttonClass, buttonText } = getButtonStyle(book.id);

        const image = book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : 'img/default-book.png';
        const author = book.volumeInfo.authors ? book.volumeInfo.authors : 'Неизвестный автор';
        const title = book.volumeInfo.title;
        const description = book.volumeInfo.description ? book.volumeInfo.description : 'Описание отсутствует';
        const averageRating = book.volumeInfo.averageRating;
        const ratingsCount = book.volumeInfo.ratingsCount;
        const price = book.saleInfo.retailPrice ? book.saleInfo.retailPrice.amount : null;
        const percentageRating = (averageRating / 5) * 100;

        const validationResults = validateData(ratingsCount, price, percentageRating);

        const bookTemplate = `
        <div class="main_content-items-template">
            <img class="main_content-items-template-image" src="${image}" alt="book">
            <div class="main_content-items-template-info">
                <p class="main_content-items-template-info-author">${author}</p>
                <p class="main_content-items-template-info-title">${title}</p>
                ${validationResults.ratingSection}
                <p class="main_content-items-template-info-descrition">${description}</p>
                ${validationResults.priceSection}
                <button data-book-id="${book.id}" class="${buttonClass}">${buttonText}</button>
            </div>
        </div>
    `;

        htmlContent += bookTemplate;
    });

    if (isLoadMore) {
        container.insertAdjacentHTML('beforeend', htmlContent);
    } else {
        container.innerHTML = htmlContent;
        container.appendChild(loadMoreButton);
    }
    
// Обработчик на кнопки
    const buyButtons = document.querySelectorAll('.main_content-items-button, .main_content-items-button-bought');

    buyButtons.forEach(button => {
        button.addEventListener('click', onBuyButtonClick);
    });
}

export { renderCards };
