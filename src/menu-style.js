const headerLinks = document.querySelectorAll('.navigation_menu-item');

// Функция обработки ссылок в хэдере
function OnHeaderLinkClick(event) {
    event.preventDefault();
    headerLinks.forEach(link => {
        link.classList.remove('navigation-active');
    });
    event.currentTarget.classList.add('navigation-active');
}

// Обработчики
headerLinks.forEach(link => {
    link.addEventListener('click', OnHeaderLinkClick);
});

export { OnHeaderLinkClick };