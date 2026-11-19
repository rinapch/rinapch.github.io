const mascot = document.querySelector('.mascot');
const cat = mascot.querySelector('canvas').getContext('2d');
const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
let sipping = false;
let sipTimer;
let blinkTimer;

function rect(color, x, y, width, height) {
  cat.fillStyle = color;
  cat.fillRect(x, y, width, height);
}

function drawCat(blink = false) {
  cat.clearRect(0, 0, 32, 36);
  const cream = '#e5dfca';
  const shade = '#bdb6a2';
  const dark = '#343b36';
  // Ground, shoes and the little jacket.
  rect('#20211f18', 6, 33, 23, 2);
  rect(dark, 11, 31, 5, 2);
  rect(dark, 18, 31, 5, 2);
  rect('#647761', 10, 23, 14, 8);
  rect('#80917a', 10, 23, 6, 6);
  rect(dark, 17, 25, 1, 1);
  rect(dark, 17, 28, 1, 1);
  rect('#975461', 16, 23, 2, 3);
  // Tail curls beside the jacket.
  rect(shade, 24, 28, 5, 2);
  rect(cream, 28, 25, 2, 4);
  rect(cream, 29, 24, 2, 2);
  // Angular ears and head.
  rect(shade, 8, 10, 19, 11);
  rect(cream, 7, 11, 21, 8);
  rect(cream, 9, 8, 17, 13);
  rect(cream, 11, 20, 12, 3);
  rect(cream, 9, 4, 3, 7);
  rect(cream, 10, 2, 1, 3);
  rect(cream, 22, 4, 3, 7);
  rect(cream, 23, 2, 1, 3);
  rect('#c6a8a2', 10, 5, 1, 4);
  rect('#c6a8a2', 23, 5, 1, 4);
  // Headphones and their stepped headband.
  rect(dark, 7, 5, 2, 10);
  rect(dark, 8, 3, 2, 3);
  rect(dark, 10, 1, 14, 2);
  rect(dark, 24, 3, 2, 3);
  rect(dark, 26, 5, 2, 10);
  rect('#7c897b', 5, 11, 4, 7);
  rect('#a5afa0', 5, 11, 2, 6);
  rect('#7c897b', 26, 11, 4, 7);
  rect('#a5afa0', 26, 11, 2, 6);
  // Eyes close briefly during a blink or a sip.
  rect(dark, 11, 16, 3, blink || sipping ? 1 : 2);
  rect(dark, 21, 16, 3, blink || sipping ? 1 : 2);
  rect('#9d786b', 17, 18, 2, 1);
  rect(dark, 16, 20, 1, 1);
  rect(dark, 18, 20, 1, 1);
  rect(dark, 17, 21, 1, 1);
  // Coffee cup rises to the face when clicked.
  const cupY = sipping ? 19 : 25;
  rect(cream, 7, cupY + 1, 4, 3);
  rect('#925f49', 3, cupY, 5, 6);
  rect('#c1a88a', 3, cupY + 2, 5, 2);
  rect(dark, 2, cupY - 1, 7, 1);
  rect(dark, 3, cupY - 2, 5, 1);
}

function scheduleBlink() {
  clearTimeout(blinkTimer);
  if (motion.matches || document.hidden) return;
  blinkTimer = setTimeout(() => {
    drawCat(true);
    blinkTimer = setTimeout(() => { drawCat(); scheduleBlink(); }, 160);
  }, 3200 + Math.random() * 2400);
}

mascot.addEventListener('click', () => {
  clearTimeout(sipTimer);
  sipping = true;
  mascot.classList.add('sipping');
  drawCat();
  sipTimer = setTimeout(() => {
    sipping = false;
    mascot.classList.remove('sipping');
    drawCat();
  }, 1400);
});
motion.addEventListener('change', scheduleBlink);
document.addEventListener('visibilitychange', scheduleBlink);
drawCat();
scheduleBlink();
