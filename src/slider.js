const TIMER = 5000;
const slider = document.querySelector('.slider_banner');
const controls = document.querySelectorAll('.slider_controls-item');
const pictures = Array.from(slider.querySelectorAll('img'));
const pictureCount = pictures.length;

let currentPictureIndex = 0;

//Автоматическое пролистывание слайдера
function defoltSwitch() {
        currentPictureIndex = (currentPictureIndex + 1) % pictureCount;
    }

// Функция переключения картинок и кнопок в контейнере
function switchPicture() {
    pictures.forEach((picture, index) => {
        if (index === currentPictureIndex) {
            picture.style.display = 'block';
        } else {
            picture.style.display = 'none';
        }
    });

    controls.forEach((control, index) => {
        if (index === currentPictureIndex) {
            control.classList.add('slider_active');
        } else {
            control.classList.remove('slider_active');
        }
    });
}

// Вешаем обработчик
controls.forEach((control, index) => {
    control.addEventListener('click', () => {
        currentPictureIndex = index;
        switchPicture();
    });
});

// Таймер для автопереключения
setInterval(() => {
    defoltSwitch();
    switchPicture();
}, TIMER);

// Инициализация
switchPicture();

export { switchPicture, defoltSwitch };
