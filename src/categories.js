import { updateBooksByCategory } from "./index";

const listItems = document.querySelectorAll('.main_content-menu-list li');

function chooseCategory(event) {
        event.preventDefault();

        listItems.forEach(el => {
            el.classList.remove('main_content-menu-active');
        });

        const clickedItem = event.currentTarget;
        clickedItem.classList.add('main_content-menu-active');

        return clickedItem.getAttribute('data-category');   
    }
    
    function onCategoryClick() {
        listItems.forEach(item => {
            item.addEventListener('click', event => {
                const category = chooseCategory(event);
                updateBooksByCategory({ category });
            });
        });
    }
    
export { onCategoryClick };