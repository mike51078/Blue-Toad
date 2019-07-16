const client_id = '08d4350b8ed71cbceaa67f01b5c01ae2b2fb14cc75fe601c63cfa42256a1d064';
const api_url = `https://api.unsplash.com/search/photos?page=1&per_page=25&client_id=${client_id}`;
const form = document.querySelector('form');
const input = document.querySelector('input');
const photoSection = document.querySelector('.photos');

form.addEventListener('submit', formSubmitted);

function formSubmitted(event) {
	event.preventDefault();
	let searchTerm = input.value;

	searchStart();
	search(searchTerm).then(displayPhotos);
}

function searchStart() {
	photoSection.innerHTML = '';
}

function search(searchTerm) {
	let url = `${api_url}&query=${searchTerm}`;
	return fetch(url).then((response) => response.json()).then((result) => {
		return result.results;
	});
}

function displayPhotos(photos) {
	photos.forEach((photo) => {
		let photoContainer = document.createElement('div');
		photoContainer.className = 'PhotoResult';
		photoContainer.innerHTML = `<img src="${photo.urls.regular}">`;
		photoSection.appendChild(photoContainer);
	});
}
