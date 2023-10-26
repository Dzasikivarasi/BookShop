import { saveCartToLocalStorage, loadCartFromLocalStorage } from './cartStorage.js';

// const cartState = new Set();
const cartState = loadCartFromLocalStorage();
updateCartDisplay();

function updateCartDisplay() {
    const cartIcon = document.getElementById('cart'); 
 
    cartIcon.innerText = cartState.size;

    if (cartState.size > 0) {
        cartIcon.classList.remove('hidden');
        cartIcon.classList.add('cart-count');
    } else {
        cartIcon.classList.remove('cart-count');
        cartIcon.classList.add('hidden');
    }
}

function onBuyButtonClick(event) {
    const button = event.target;
    const bookId = button.getAttribute('data-book-id');

    console.log('Button clicked for bookId:', bookId);
    console.log('Current cartState:', cartState);

    if (cartState.has(bookId)) {
        button.innerText = 'BUY NOW';
        button.classList.remove('main_content-items-button-bought');
        button.classList.add('main_content-items-button');
        cartState.delete(bookId);
    } else {
        button.innerText = 'IN THE CART';
        button.classList.add('main_content-items-button-bought');
        button.classList.remove('main_content-items-button');
        cartState.add(bookId);
    }
    
    updateCartDisplay();
    saveCartToLocalStorage(cartState);
}

function getButtonStyle(bookId) {
    let buttonClass = 'main_content-items-button';
    let buttonText = 'BUY NOW';

    if (cartState.has(bookId)) {
        buttonClass = 'main_content-items-button-bought';
        buttonText = 'IN THE CART';
    }

    return { buttonClass, buttonText };
}

export { onBuyButtonClick, getButtonStyle }
