function validateData(ratingsCount, price, percentageRating) {
    let ratingSection = '';
    let priceSection = '';

    // Проверка наличия рейтинга
    if (ratingsCount) {
        ratingSection = `
            <div class="main_content-items-template-info-rating">
                <div class="main_content-items-template-info-rating-body">
                    <div class="rating-stars-active" style="width:${percentageRating}%"></div>
                </div>
                <p class="main_content-items-template-info-rating-review">${ratingsCount} review</p>
            </div>
        `;
    }

    // Проверка наличия цены
    if (price) {
        priceSection = `<p class="main_content-items-template-info-price">$${price}</p>`;
    }

    return {
        ratingSection: ratingSection,
        priceSection: priceSection
    };
}

export { validateData };