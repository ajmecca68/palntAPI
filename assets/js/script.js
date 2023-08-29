const apiKey = 'LRnoSZ98nrCPuGd81qZ0Bez69FQxN4-ur3OgZReMxOk';
const searchButton = document.getElementById('searchButton');
const plantNameInput = document.getElementById('plantName');
const plantInfoDiv = document.getElementById('plantInfo');

searchButton.addEventListener('click', async () => {
    const plantName = plantNameInput.value;
    if (plantName) {
        await getPlantInfo(plantName);
    }
});

async function getPlantInfo(plantName) {
    const apiUrl = `https://trefle.io/api/v1/plants/search?token=${apiKey}&q=${plantName}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.data && data.data.length > 0) {
            const plant = data.data[0];
            const commonName = plant.common_name || 'N/A';
            const family = plant.family_common_name || 'N/A';
            const scientificName = plant.scientific_name || 'N/A';

            plantInfoDiv.innerHTML = `
                <h2>${commonName}</h2>
                <p><strong>Scientific Name:</strong> ${scientificName}</p>
                <p><strong>Family:</strong> ${family}</p>
            `;
        } else {
            plantInfoDiv.innerHTML = '<p>No plant found with that name.</p>';
        }
    } catch (error) {
        console.error('Error fetching plant information:', error);
        plantInfoDiv.innerHTML = '<p>An error occurred while fetching plant information.</p>';
    }
}
