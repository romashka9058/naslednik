(function() {
    const loader = document.getElementById('loading');
    if (!loader) return;

    const loaderImg = loader.querySelector('img');
    let isReadyToHide = false;

    function fadeOut() {
        loader.classList.add('fade-out');
        setTimeout(() => loader.remove(), 1500); 
    }

    function hideLoader() {
        isReadyToHide = true;
        if (!loaderImg) {
            fadeOut();
        }
    }

    if (loaderImg) {
        loaderImg.addEventListener('animationiteration', () => {
            if (isReadyToHide) {
                loaderImg.style.animationPlayState = 'paused';
                setTimeout(fadeOut, 50);
            }
        });
    }

    if (document.readyState === 'interactive' || document.readyState === 'complete') {
        hideLoader();
    } else {
        document.addEventListener('DOMContentLoaded', hideLoader);
    }
})();