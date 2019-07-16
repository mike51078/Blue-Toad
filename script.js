const client_id = '08d4350b8ed71cbceaa67f01b5c01ae2b2fb14cc75fe601c63cfa42256a1d064';
const api_url = `https://api.unsplash.com/search/photos?page=1&per_page=25&client_id=${client_id}`;
const form = document.querySelector('form');
const input = document.querySelector('input');
const photoSection = document.querySelector('.photos');

form.addEventListener('submit', formSubmitted);

function formSubmitted(event) {
	event.preventDefault();
	let searchTerm = input.value;

	//calling function to clear search term
	searchStart();
	//calling functions to query the api and display the photos
	search(searchTerm).then(displayPhotos);
}

function searchStart() {
	photoSection.innerHTML = '';
}

function search(searchTerm) {
	//defining new url with the search term
	let url = `${api_url}&query=${searchTerm}`;
	//retrieving data from the Unsplash API
	return fetch(url).then((response) => response.json()).then((result) => {
		return result.results;
	});
}

//function to retrieve data and display in section on HTML
function displayPhotos(photos) {
	photos.forEach((photo) => {
		//creating a new div for each photo
		let photoContainer = document.createElement('div');
		//creating a class name to be added to each photo
		photoContainer.className = 'PhotoResult';
		//the src code for each photo
		photoContainer.innerHTML = `<img src="${photo.urls.regular}">`;
		//appending each photo to the new div
		photoSection.appendChild(photoContainer);
	});
}
