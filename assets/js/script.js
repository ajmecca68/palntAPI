document.addEventListener("DOMContentLoaded", () => {
    const searchButton = document.getElementById("searchButton");
    const plantNameInput = document.getElementById("plantName");
    const plantInfoDiv = document.getElementById("plantInfo");

    searchButton.addEventListener("click", () => {
        const plantName = plantNameInput.value;

        if (plantName) {
            const apiKey = "sk-iTS464edf444c5e1f2019";
            const apiUrl = `https://perenual.com/api/species-list?key=${apiKey}&q=${encodeURIComponent(plantName)}`;

            fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                const plantData = data.data;

                if (plantData.length > 0) {
                    const plantInfo = plantData.map(plant => 
           
                        `    
                        <div>
                            <h2>${plant.common_name}</h2>
                            <p>Scientific Name: ${plant.scientific_name.join(", ")}</p>
                            <p>Watering: ${plant.watering}</p>
                            <p>Cycle: ${plant.cycle}</p>
                        </div>
                    `).join("");

                    plantInfoDiv.innerHTML = plantInfo;
                } else {
                    plantInfoDiv.innerHTML = "<p>No plants found with that name.</p>";
                }
            })
            .catch(error => {
                console.error("Error fetching plant information:", error);
                plantInfoDiv.innerHTML = "<p>An error occurred while fetching plant information.</p>";
            });
        } else {
            plantInfoDiv.innerHTML = "<p>Please enter a plant name.</p>";
        }
    });
});


