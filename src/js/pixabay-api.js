// написання функції для HTTP-запитів


// ============

import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';

const API_KEY = '49399736-5639b789053676a95c3f2e38d';  

export default async function httpRequest(userRequest, page = 1, perPage = 15) {
  const paramsForHttp = new URLSearchParams({
    q: userRequest,
    key: API_KEY,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    per_page: perPage,
    page: page,
  });

  try {
    const response = await axios.get(`?${paramsForHttp}`);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch images: ${error.message}`);
  }
}

export function resetPage() {
  return 1;
}
