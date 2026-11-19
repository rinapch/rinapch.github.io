const mascot = document.querySelector('.mascot');
let greetingTimer;

mascot.addEventListener('click', () => {
  clearTimeout(greetingTimer);
  mascot.classList.remove('greeting');
  // Restart the greeting on repeated clicks.
  void mascot.offsetWidth;
  mascot.classList.add('greeting');
  greetingTimer = setTimeout(() => mascot.classList.remove('greeting'), 600);
});
