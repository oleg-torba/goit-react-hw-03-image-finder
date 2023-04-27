import axios from 'axios';

export async function fetchImages(query, page) {
  const request = await axios.get(
    `https://pixabay.com/api/?key=34025093-cc2dd49ea388fe86622ccaf7b&page=${page}&q=${query}&per_page=12`
  );

  return request.data;
}
