document.addEventListener("DOMContentLoaded", () => {
    const searchButton = document.getElementById("searchButton");
    const plantNameInput = document.getElementById("plantName");
    const perunialInfoDiv = document.getElementById("perunialInfo");

    searchButton.addEventListener("click", () => {
        const plantName = plantNameInput.value;

        if (plantName) {
            const perunialKey = "sk-iTS464edf444c5e1f2019";
            const perunialUrl = `https://perenual.com/api/species-list?key=${perunialKey}&q=${encodeURIComponent(plantName)}`;
            fetch(perunialUrl)
            .then(response => response.json())
            .then(data => {
                const plantData = data.data; 
                if (plantData.length > 0) {
                    const firstPlant = plantData[0]; // Get the first plant

                    const perunialInfo = `
                        <div>
                            <h2>${firstPlant.common_name}</h2>
                            <p>Scientific Name: ${firstPlant.scientific_name.join(", ")}</p>
                            <p>Watering: ${firstPlant.watering}</p>
                            <p>Cycle: ${firstPlant.cycle}</p>
                            <img src="${firstPlant.default_image.small_url}" alt="${firstPlant.common_name} Image">
                        </div>
                    `;

                    perunialInfoDiv.innerHTML = perunialInfo;
                } else {
                    perunialInfoDiv.innerHTML = "<p>No plants found with that name.</p>";
                }
            })
            .catch(error => {
                console.error("Error fetching plant information:", error);
                perunialInfoDiv.innerHTML = "<p>An error occurred while fetching plant information.</p>";
            });
        } else {
            perunialInfoDiv.innerHTML = "<p>Please enter a plant name.</p>";
        }
    });
});
