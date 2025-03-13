import { gsap } from 'gsap';

export function animateBlocks(selector, interval = 0.2) {
  const elements = document.querySelectorAll(selector);
  elements.forEach((element, index) => {
    gsap.fromTo(element, 
      { opacity: 0, y: 20 }, 
      { opacity: 1, y: 0, delay: index * interval, duration: 0.5 }
    );
  });
}

export function animateMapAppearance(selector) {
  gsap.fromTo(selector, 
    { opacity: 0 }, 
    { opacity: 1, duration: 1 }
  );
}

export function animateFormOverlay(selector) {
  gsap.fromTo(selector, 
    { opacity: 0 }, 
    { opacity: 1, duration: 0.5 }
  );
}

export function hideElement(selector) {
  gsap.to(selector, 
    { opacity: 0, duration: 0.5 }
  );
}

export function animateDropdownOpen(selector) {
  gsap.fromTo(selector, 
    { opacity: 0, y: -10 }, 
    { opacity: 1, y: 0, duration: 0.3 }
  );
}

export function animateDropdownClose(selector) {
  gsap.to(selector, 
    { opacity: 0, y: -10, duration: 0.3, onComplete: () => {
      document.querySelector(selector).style.display = 'none';
    }}
  );
}

export function animateAsideOpen(selector) {
  const element = document.querySelector(selector);
  if (!element) return;

  // Устанавливаем начальные стили
  gsap.set(element, { opacity: 0 });

  // Анимация появления
  gsap.to(element, {
    opacity: 1,
    x: '0%',
    duration: 0.5,
    ease: 'power2.out',
  });
}

export function animateAsideClose(selector) {
  const element = document.querySelector(selector);
  if (!element) return;

  // Анимация скрытия
  gsap.to(element, {
    opacity: 0,
    duration: 0.5,
    ease: 'power2.in',
    onComplete: () => {
      // Скрываем элемент после завершения анимации
      element.style.display = 'none';
    },
  });
}

