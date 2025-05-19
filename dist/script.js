// // Mobile Menu Toggle
// const menuButton = document.getElementById('menue');
// const mobileMenu = document.getElementById('mobileMenue');
// menuButton.addEventListener('click', () => {
//     mobileMenu.classList.toggle('hidden');
// });

// const apiKey = "0b05a2050337421fbf379bce75b8edc3";
// const apiLink = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;
// const newsContainer = document.getElementById('news-container');

// // Show loading state
// newsContainer.innerHTML = '<p class="text-gray-600 text-center">Loading articles...</p>';

// fetch(apiLink)
//     .then(response => {
//         console.log('Response status:', response.status);
//         if (!response.ok) {
//             throw new Error(`Network response was not ok: ${response.status}`);
//         }
//         return response.json();
//     })
//     .then(data => {
//         console.log('API Data:', data);
//         newsContainer.innerHTML = ''; 
//         if (data.articles && data.articles.length > 0) {
//             data.articles.forEach(article => {
//                 const articleElement = document.createElement('div');
//                 articleElement.className = 'bg-white p-4 rounded-md shadow-md';
//                 articleElement.innerHTML = `
//                     <img src="${article.urlToImage || 'https://via.placeholder.com/300x200'}" alt="${article.title}" class="w-full h-48 object-cover rounded-md mb-4">
//                     <h2 class="text-xl font-bold text-gray-800">${article.title}</h2>
//                     <p class="text-gray-600 mt-2">${article.description || 'No description available'}</p>
//                     <a href="${article.url}" target="_blank" class="text-blue-600 hover:underline mt-4 inline-block">Read more</a>
//                 `;
//                 newsContainer.appendChild(articleElement);
//             });
//         } else {
//             newsContainer.innerHTML = '<p class="text-gray-600 text-center">No articles found.</p>';
//         }
//     })
//     .catch(error => {
//         console.error('Fetch Error:', error);
//         newsContainer.innerHTML = '<p class="text-red-600 text-center">Failed to load articles. Please try again later.</p>';
//     });
// Mobile Menu Toggle
// Mobile Menu Toggle
const menuButton = document.getElementById('menue');
const mobileMenu = document.getElementById('mobileMenue');
menuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

const apiKey = '0b05a2050337421fbf379bce75b8edc3';
const newsContainer = document.getElementById('news-container');
const categoryTitle = document.getElementById('category-title');

const validCategories = ['health', 'sports', 'business'];
const keywordCategories = ['politics', 'world'];

// Function to get the right NewsAPI URL
function getApiUrl(category) {
    if (validCategories.includes(category)) {
        return `https://newsapi.org/v2/top-headlines?category=${category}&apiKey=${apiKey}`;
    } else if (keywordCategories.includes(category)) {
        return `https://newsapi.org/v2/everything?q=${category}&apiKey=${apiKey}`;
    } else {
        return `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;
    }
}

// Function to fetch and show articles
function fetchArticles(category) {
    newsContainer.innerHTML = '<p class="text-gray-600 text-center">Loading articles...</p>';
    categoryTitle.textContent = category === 'general' ? 'Latest News' : `${category.charAt(0).toUpperCase() + category.slice(1)} News`;

    const apiUrl = getApiUrl(category);
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch articles');
            }
            return response.json();
        })
        .then(data => {
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
            console.error('Error:', error);
            newsContainer.innerHTML = '<p class="text-red-600 text-center">Failed to load articles. Please try again.</p>';
        });
}

// When a navigation link is clicked
document.querySelectorAll('#nav-links a, #mobileMenue a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const category = link.getAttribute('href').slice(1) || 'general';
        fetchArticles(category);
    });
});

// Load articles when the page first opens
const category = window.location.pathname.slice(1) || 'general';
fetchArticles(category);