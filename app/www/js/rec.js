const tochka = document.getElementById('rec_tochka');
const menu = document.getElementById('rec_menu');
const recElement = document.querySelector('.rec');
const recClose = document.getElementById('rec_close');

if (tochka && menu) {
    let isPinned = false;
    let closeTimeout;

    const toggleMenu = (state) => {
        clearTimeout(closeTimeout);
        menu.classList.toggle('show', state);
        if (!state) isPinned = false;
    };

    const startCloseTimeout = () => {
        if (!isPinned) {
            closeTimeout = setTimeout(() => toggleMenu(false), 200);
        }
    };

    [tochka, menu].forEach(el => {
        el.addEventListener('mouseenter', () => {
            if (!isPinned) toggleMenu(true);
        });
        el.addEventListener('mouseleave', startCloseTimeout);
    });

    tochka.addEventListener('click', (e) => {
        e.stopPropagation();
        isPinned = !isPinned;
        toggleMenu(isPinned);
    });

    window.addEventListener('click', (e) => {
        if (!tochka.contains(e.target) && !menu.contains(e.target)) {
            toggleMenu(false);
        }
    });
}

recClose?.addEventListener('click', () => {
    if (recElement) recElement.style.display = 'none';
});

if (recElement) {
    const randomDelay = Math.floor(Math.random() * 10000) + 10000; 
    setTimeout(() => {
        recElement.style.display = 'grid';
    }, randomDelay);
}
