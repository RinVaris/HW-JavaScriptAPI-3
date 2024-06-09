const apiKey = 'ECjPwT_D4UFdUKEMvYNrYmksEFSIkZ09yR4ukblj5cg';
const photoElement = document.getElementById('photo');
const photographerElement = document.getElementById('photographer');
const likeCountElement = document.getElementById('like-count');
const previousPhotosElement = document.getElementById('previous-photos');
const localStorageKey = 'like-count';
const previousPhotosKey = 'previous-photos';

let likeCount = localStorage.getItem(localStorageKey) || 0;
likeCountElement.textContent = likeCount;

function fetchRandomPhoto() {
    fetch(`https://api.unsplash.com/photos/random?client_id=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            const photoData = {
                url: data.urls.regular,
                photographer: data.user.name,
                likes: likeCount,
                date: new Date().toISOString().split('T')[0]
            };
            displayPhoto(photoData);
            savePhoto(photoData);
            updatePreviousPhotos();
        })
        .catch(error => console.error('Error fetching photo:', error));
}

function displayPhoto(photoData) {
    photoElement.src = photoData.url;
    photographerElement.textContent = `Photo by ${photoData.photographer}`;
    likeCountElement.textContent = photoData.likes;
}

function likePhoto() {
    likeCount++;
    likeCountElement.textContent = likeCount;
    localStorage.setItem(localStorageKey, likeCount);
}

function savePhoto(photoData) {
    let previousPhotos = JSON.parse(localStorage.getItem(previousPhotosKey)) || [];
    previousPhotos.push(photoData);
    localStorage.setItem(previousPhotosKey, JSON.stringify(previousPhotos));
}

function updatePreviousPhotos() {
    const previousPhotos = JSON.parse(localStorage.getItem(previousPhotosKey)) || [];
    previousPhotosElement.innerHTML = previousPhotos.map(photo => `
        <div class="previous-photo">
            <img src="${photo.url}" alt="Previous Photo">
            <p>${photo.date} by ${photo.photographer}</p>
        </div>
    `).join('');
}

window.onload = () => {
    fetchRandomPhoto();
    updatePreviousPhotos();
};
