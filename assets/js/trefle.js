// trefle.js

document.addEventListener("DOMContentLoaded", () => {
    const searchButton = document.getElementById("searchButton");
    const plantNameInput = document.getElementById("plantName");
    const trefleInfoDiv = document.getElementById("trefleInfo");

    searchButton.addEventListener("click", () => {
        const plantName = plantNameInput.value;

        if (plantName) {
            // Trefle API call
            const trefleToken = "LRnoSZ98nrCPuGd81qZ0Bez69FQxN4-ur3OgZReMxOk";
            const trefleUrl = `https://trefle.io/api/v1/plants/search?token=${trefleToken}&q=${encodeURIComponent(plantName)}`;
            fetch(trefleUrl)
            .then(response => response.json())
            .then(data => {
                const plantData = data.data; 
                if (plantData.length > 0) {
                    const trefleInfo = plantData.map(plant => 
                        `
                        <div>
                            <h2>${plant.scientific_name}</h2>
                            <p>Trefle.io</p>
                            <p>Family: ${plant.family}</p>
                            <p>Genus: ${plant.genus}</p>
                            <p>Author: ${plant.author}</p>
                        </div>
                    `).join("");

                    trefleInfoDiv.innerHTML = trefleInfo;
                } else {
                    trefleInfoDiv.innerHTML = "<p>No plants found with that name.</p>";
                }
            })
            .catch(error => {
                console.error("Error fetching plant information from Trefle:", error);
                trefleInfoDiv.innerHTML = "<p>An error occurred while fetching plant information from Trefle.</p>";
            });
        } else {
            trefleInfoDiv.innerHTML = "";
        }
    });
});
