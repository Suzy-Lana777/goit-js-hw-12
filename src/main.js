// Основна логіка роботи додатка

// import iziToast from 'izitoast';
// import 'izitoast/dist/css/iziToast.min.css';
// import httpRequest, { resetPage } from './js/pixabay-api';
// import { renderGallery, clearGallery } from './js/render-functions';

// const refs = {
//   form: document.querySelector('.form'),
//   input: document.querySelector('.input'),
//   gallery: document.querySelector('.gallery'),
//   loader: document.querySelector('.loader'),
//   loadMoreBtn: document.querySelector('.load-more'),
// };

// let userQuery = '';
// let currentPage = 1;
// const perPage = 15;

// refs.form.addEventListener('submit', onSearch);
// refs.loadMoreBtn.addEventListener('click', loadMoreImages);

// async function onSearch(event) {
//   event.preventDefault();
//   userQuery = event.currentTarget.elements.user_request.value.trim();

//   if (!userQuery) {
//     iziToast.warning({
//       title: 'WARNING',
//       message: 'Please enter a search term.',
//       position: 'topRight',
//     });
//     return;
//   }

//   resetPage();
//   currentPage = 1;
//   clearGallery();
//   refs.loadMoreBtn.classList.add('visually-hidden');
//   showLoader();

//   try {
//     const { hits, totalHits } = await httpRequest(userQuery, currentPage, perPage);
//     hideLoader();

//     if (hits.length === 0) {
//       iziToast.error({
//         title: 'ERROR',
//         message: 'No images found. Try another search term!',
//         position: 'topRight',
//       });
//       return;
//     }

//     renderGallery(hits);
//     if (totalHits > perPage) {
//       refs.loadMoreBtn.classList.remove('visually-hidden');
//     }
//   } catch (error) {
//     hideLoader();
//     iziToast.error({
//       title: 'ERROR',
//       message: `Error fetching images: ${error.message}`,
//       position: 'topRight',
//     });
//   }

//   event.target.reset();
// }

// async function loadMoreImages() {
//   currentPage += 1;
//   refs.loadMoreBtn.classList.add('visually-hidden'); // Ховаємо кнопку перед запитом
//   showLoader();

//   try {
//     const { hits, totalHits } = await httpRequest(userQuery, currentPage, perPage);
//     hideLoader();
//     refs.loadMoreBtn.classList.remove('visually-hidden'); // Повертаємо кнопку після запиту
//     renderGallery(hits);

//     const totalPages = Math.ceil(totalHits / perPage);
//     if (currentPage >= totalPages) {
//       refs.loadMoreBtn.classList.add('visually-hidden');
//       iziToast.info({
//         title: 'INFO',
//         message: "We're sorry, but you've reached the end of search results.",
//         position: 'topRight',
//       });
//     }

//     smoothScroll();
//   } catch (error) {
//     hideLoader();
//     refs.loadMoreBtn.classList.remove('visually-hidden'); // Повертаємо кнопку у разі помилки
//     iziToast.error({
//       title: 'ERROR',
//       message: `Error fetching images: ${error.message}`,
//       position: 'topRight',
//     });
//   }
// }

// function showLoader() {
//   refs.loader.classList.remove('visually-hidden');
// }

// function hideLoader() {
//   refs.loader.classList.add('visually-hidden');
// }

// function smoothScroll() {
//   const galleryItem = refs.gallery.firstElementChild;
//   if (galleryItem) {
//     const itemHeight = galleryItem.getBoundingClientRect().height;
//     window.scrollBy({ top: itemHeight * 2, behavior: 'smooth' });
//   }
// }

// ==============

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import httpRequest, { resetPage } from './js/pixabay-api';
import { renderGallery, clearGallery } from './js/render-functions';

const refs = {
  form: document.querySelector('.form'),
  input: document.querySelector('.input'),
  gallery: document.querySelector('.gallery'),
  loader: document.querySelector('.loader'),
  loadMoreBtn: document.querySelector('.load-more'),
};

// Перевіряємо, чи всі елементи знайдені
if (!refs.form || !refs.gallery || !refs.loader || !refs.loadMoreBtn) {
  console.error('Помилка: один або кілька DOM-елементів не знайдено.');
}

let userQuery = '';
let currentPage = 1;
const perPage = 15;

refs.form.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', loadMoreImages);

async function onSearch(event) {
  event.preventDefault();
  userQuery = event.currentTarget.elements.user_request.value.trim();

  if (!userQuery) {
    iziToast.warning({
      title: 'WARNING',
      message: 'Please enter a search term.',
      position: 'topRight',
    });
    return;
  }

  resetPage();
  currentPage = 1;
  clearGallery();
  refs.loadMoreBtn.classList.add('visually-hidden');
  showLoader();

  try {
    const { hits, totalHits } = await httpRequest(userQuery, currentPage, perPage);
    hideLoader();

    if (hits.length === 0) {
      iziToast.error({
        title: 'ERROR',
        message: 'No images found. Try another search term!',
        position: 'topRight',
      });
      return;
    }

    renderGallery(hits);
    if (totalHits > perPage) {
      refs.loadMoreBtn.classList.remove('visually-hidden');
    }
  } catch (error) {
    hideLoader();
    iziToast.error({
      title: 'ERROR',
      message: `Error fetching images: ${error.message}`,
      position: 'topRight',
    });
  }

  event.target.reset();
}

async function loadMoreImages() {
  currentPage += 1;
  refs.loadMoreBtn.classList.add('visually-hidden'); // Ховаємо кнопку перед запитом
  showLoader();

  try {
    const { hits, totalHits } = await httpRequest(userQuery, currentPage, perPage);
    hideLoader();
    refs.loadMoreBtn.classList.remove('visually-hidden'); // Повертаємо кнопку після запиту
    renderGallery(hits);

    const totalPages = Math.ceil(totalHits / perPage);
    if (currentPage >= totalPages) {
      refs.loadMoreBtn.classList.add('visually-hidden');
      iziToast.info({
        title: 'INFO',
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
    }

    smoothScroll();
  } catch (error) {
    hideLoader();
    refs.loadMoreBtn.classList.remove('visually-hidden'); // Повертаємо кнопку у разі помилки
    iziToast.error({
      title: 'ERROR',
      message: `Error fetching images: ${error.message}`,
      position: 'topRight',
    });
  }
}

function showLoader() {
  refs.loader.classList.remove('visually-hidden');
}

function hideLoader() {
  refs.loader.classList.add('visually-hidden');
}

function smoothScroll() {
  const galleryItem = refs.gallery.firstElementChild;
  if (galleryItem) {
    const itemHeight = galleryItem.getBoundingClientRect().height;
    window.scrollBy({ top: itemHeight * 2, behavior: 'smooth' });
  }
}