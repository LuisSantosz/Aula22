const searchButton = document.getElementById('searchButton');
const searchInput = document.getElementById('searchInput');
const resultsDiv = document.getElementById('results');

searchButton.addEventListener('click', search);

async function search() {
    const searchText = searchInput.value;

    if (searchText === '') {
        return;
    }

    const apiKey =  'apikey=7547b797' ; 
    const apiUrl = `https://www.omdbapi.com/?t=${searchText}&${apiKey}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.Response === 'True') {
            displayResults(data.Search);
        } else {
            resultsDiv.innerHTML = '<p>Nenhum resultado encontrado.</p>';
            
        }
    } catch (error) {
        console.error('Erro ao buscar dados:', error);
        resultsDiv.innerHTML = '<p>Ocorreu um erro ao buscar os dados.</p>';
    }
}

function displayResults(results) {
    resultsDiv.innerHTML = '';

    if (results && results.length > 0) {
        results.forEach(result => {
            const mediaDiv = document.createElement('div');
            mediaDiv.classList.add('media');

            const title = result.Title;
            const year = result.Year;
            const type = result.Type;
            const poster = result.Poster;

            const mediaContent = `
                <h2>${title} (${year})</h2>
                <p>Tipo: ${type}</p>
                <img src="${poster}" alt="${title} Poster">
                <hr>
            `;

            mediaDiv.innerHTML = mediaContent;
            resultsDiv.appendChild(mediaDiv);
        });
    } else {
        resultsDiv.innerHTML = '<p> Nenhum resultado encontrado.</p>';
    }
}