function saveCartToLocalStorage(cartState) {
    localStorage.setItem('cart', JSON.stringify(Array.from(cartState)));
}

function loadCartFromLocalStorage() {
    const storedCart = localStorage.getItem('cart');
    const cartState = new Set();
    
    if (storedCart) {
        const cartArray = JSON.parse(storedCart);
        cartArray.forEach(item => cartState.add(item));
    }

    return cartState;
}

export { saveCartToLocalStorage, loadCartFromLocalStorage }