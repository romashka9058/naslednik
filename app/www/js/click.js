const area = document.querySelector('.con');
const cursor = document.querySelector('.cursor');

let mouseX = 0, mouseY = 0;
let rotation = 0;
let isMoving = false;

function updateCursor() {
    cursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) rotate(${rotation}deg) translate(-15%, -15%)`;
    isMoving = false;
}

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    if (!isMoving) {
        requestAnimationFrame(updateCursor);
        isMoving = true;
    }
});

area.addEventListener('mousedown', () => {
    rotation = -25;
    requestAnimationFrame(updateCursor);
});

area.addEventListener('mouseup', () => {
    rotation = 0;
    requestAnimationFrame(updateCursor);
});

area.addEventListener('mouseenter', () => {
    cursor.style.opacity = '1';
});

area.addEventListener('mouseleave', () => {
    cursor.style.opacity = '0';
    rotation = 0;
    requestAnimationFrame(updateCursor);
});


// const ua = navigator.userAgent;
// const mode = ua.includes('Android') || ua.includes('like Mac')
// ? 'a'
// : ua.includes('Win') || ua.includes('Mac')
// ? 'w'
// : null;

// if (mode) {
// document.body.classList.add(mode);
// document.body.querySelectorAll('*').forEach(el => el.classList.add(mode));
// }