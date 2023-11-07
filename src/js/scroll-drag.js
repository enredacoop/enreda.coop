document.addEventListener('DOMContentLoaded', function() {
    const cardContainer = document.querySelector('.card-container');
    let isDown = false;
    let startX;
    let scrollLeft;

    cardContainer.addEventListener('mousedown', (e) => {
        isDown = true;
        startX = e.pageX - cardContainer.offsetLeft;
        scrollLeft = cardContainer.scrollLeft;
        cardContainer.classList.add('active'); // Agregamos la clase 'active' al contenedor
    });

    cardContainer.addEventListener('mouseleave', () => {
        isDown = false;
        cardContainer.classList.remove('active'); // Quitamos la clase 'active'
    });

    cardContainer.addEventListener('mouseup', () => {
        isDown = false;
        cardContainer.classList.remove('active'); // Quitamos la clase 'active'
    });

    cardContainer.addEventListener('mousemove', (e) => {
        if(!isDown) return;
        e.preventDefault();
        const x = e.pageX - cardContainer.offsetLeft;
        const walk = (x - startX) * 3; //scroll-fast
        cardContainer.scrollLeft = scrollLeft - walk;
    });
});
