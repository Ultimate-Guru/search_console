const searchInput = document.getElementById('searchInput');
const searchResult = document.getElementById('searchResult');
const searchButton = document.getElementById('searchButton');

searchInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();
        callAPI();
    }
});

const callAPI = async () => {

    const query = searchInput.value.trim();
    if (!query) {
        searchResult.textContent = 'Please enter a search term';
        return;
    }

    // Disable button and show loading
    searchButton.disabled = true;
    searchButton.textContent = 'Searching...';
    searchResult.innerHTML = '<div style="text-align: center; color: #667eea;"><strong>Loading...</strong></div>';

    const url = 'https://open-ai21.p.rapidapi.com/conversationllama';
    const options = {
        method: 'POST',
        headers: {
            'x-rapidapi-key': '68abdbc499mshc83ee09d81d7601p17325ajsn2f368cf7e2be',
            'x-rapidapi-host': 'open-ai21.p.rapidapi.com',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            messages: [
                {
                    role: 'user',
                    content: query
                }
            ],
            web_access: false
        })
    };

    try {
        const response = await fetch(url, options);
        const data = await response.json();
        if (data.status && data.result) {
            searchResult.innerHTML = data.result.replace(/\n/g, '<br>');
        } else {
            searchResult.textContent = 'Error: Invalid response format';
        }
    } catch (error) {
        console.error(error);
        searchResult.textContent = 'Error: ' + error.message;
    } finally {
        // Re-enable button
        searchButton.disabled = false;
        searchButton.textContent = 'Call ChatGPT API';
    }

}