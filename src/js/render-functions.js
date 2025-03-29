// функції для відображення елементів інтерфейсу

// ===========================

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

let lightbox; // Змінна для збереження екземпляра SimpleLightbox

// Функція для створення HTML-розмітки для кожного елемента
function createCart(item) {
  const {
    webformatURL,
    largeImageURL,
    tags,
    likes,
    views,
    comments,
    downloads,
  } = item;

  return `
    <li class="li-gallery">
      <a class="li-gallery-a" href="${largeImageURL}">
        <img class="img" src="${webformatURL}" alt="${tags}" />
      </a>
      <ul class="baner-info">
        <li class="baner-info-li">
          <p class="baner-info-li-title">Likes</p>
          <p class="baner-info-li-text">${likes}</p>
        </li>
        <li class="baner-info-li">
          <p class="baner-info-li-title">Views</p>
          <p class="baner-info-li-text">${views}</p>
        </li>
        <li class="baner-info-li">
          <p class="baner-info-li-title">Comments</p>
          <p class="baner-info-li-text">${comments}</p>
        </li>
        <li class="baner-info-li">
          <p class="baner-info-li-title">Downloads</p>
          <p class="baner-info-li-text">${downloads}</p>
        </li>
      </ul>
    </li>`;
}

// Функція для створення розмітки для всіх зображень
function createsCart(items) {
  return items.map(createCart).join('');
}

// Функція очищення галереї
export function clearGallery() {
  const gallery = document.querySelector('.gallery');
  if (gallery) {
    gallery.innerHTML = '';  // Очищаємо галерею
  }
}

// Функція рендерингу зображень у галерею
export function renderGallery(data) {
  const refs = {
    list: document.querySelector('.gallery'),
  };

  if (!refs.list) {
    console.error('No images found');
    return;
  }

  if (data.length === 0) {
    iziToast.warning({
      title: 'No images found',
      message: 'Try another search term!',
      position: 'topRight',
    });
    return;
  }

  // Генерація розмітки для нових зображень
  const markup = createsCart(data);
  
  // Додавання нових зображень до вже існуючих
  refs.list.insertAdjacentHTML('beforeend', markup);

  // Якщо lightbox ще не ініціалізований, створюємо його
  if (!lightbox) {
    lightbox = new SimpleLightbox('.gallery a', {
      captions: true,
      captionsData: 'alt',
      captionType: 'attr',
      captionDelay: 250,
      animationSpeed: 350,
      captionPosition: 'bottom',
    });
  }

  // Оновлення SimpleLightbox після додавання нових зображень
  lightbox.refresh();
}

