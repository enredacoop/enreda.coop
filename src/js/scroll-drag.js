document.addEventListener('DOMContentLoaded', function() {
    const cardContainer = document.querySelector('.scroll-container');

    let isDragging = false;
    let startX;
    let scrollLeft;

    cardContainer.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.pageX - cardContainer.offsetLeft;
        scrollLeft = cardContainer.scrollLeft;
    });

    cardContainer.addEventListener('mouseup', () => {
        isDragging = false;
    });

    cardContainer.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - cardContainer.offsetLeft;
        const walk = (x - startX) * 3;
        cardContainer.scrollLeft = scrollLeft - walk;
    });
});
