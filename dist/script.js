     const menuButton = document.getElementById('menue');
        const mobileMenu = document.getElementById('mobileMenue');

        menuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });

const apiKey = "0b05a2050337421fbf379bce75b8edc3"
const apiLink = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`
newsContainer = document.getElementById('news-container')

fetch(`${apiLink}`)
.then(response =>{
    if(!response.ok){
        throw new Error('Netowrk was not okay')
    }
    return response.json()
})
.then(data =>{
    newsContainer.textContent = JSON.stringify(data)
})
.catch (error =>{
    console.error('Error', error)
})