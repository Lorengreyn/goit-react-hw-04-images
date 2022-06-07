const API_KEY = '26726167-c90a9ed89e40361d1e68cdb71';
const BASE_URL = 'https://pixabay.com/api/';

function fetchImages(query, page) {
  const url = `${BASE_URL}?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`;
  return fetch(url).then(response => response.json());
}

const api = { fetchImages };

export default api;
