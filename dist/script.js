// Mobile Menu Toggle
const menuButton = document.getElementById('menue');
const mobileMenu = document.getElementById('mobileMenue');
menuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

const apiKey = "0b05a2050337421fbf379bce75b8edc3";
const apiLink = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;
const newsContainer = document.getElementById('news-container');

// Show loading state
newsContainer.innerHTML = '<p class="text-gray-600 text-center">Loading articles...</p>';

fetch(apiLink)
    .then(response => {
        console.log('Response status:', response.status);
        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log('API Data:', data);
        newsContainer.innerHTML = ''; 
        if (data.articles && data.articles.length > 0) {
            data.articles.forEach(article => {
                const articleElement = document.createElement('div');
                articleElement.className = 'bg-white p-4 rounded-md shadow-md';
                articleElement.innerHTML = `
                    <img src="${article.urlToImage || 'https://via.placeholder.com/300x200'}" alt="${article.title}" class="w-full h-48 object-cover rounded-md mb-4">
                    <h2 class="text-xl font-bold text-gray-800">${article.title}</h2>
                    <p class="text-gray-600 mt-2">${article.description || 'No description available'}</p>
                    <a href="${article.url}" target="_blank" class="text-blue-600 hover:underline mt-4 inline-block">Read more</a>
                `;
                newsContainer.appendChild(articleElement);
            });
        } else {
            newsContainer.innerHTML = '<p class="text-gray-600 text-center">No articles found.</p>';
        }
    })
    .catch(error => {
        console.error('Fetch Error:', error);
        newsContainer.innerHTML = '<p class="text-red-600 text-center">Failed to load articles. Please try again later.</p>';
    });