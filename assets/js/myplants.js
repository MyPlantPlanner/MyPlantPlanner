// This js file is linked to the myplants.html
// Declarations  
const APIKey = 'sk-gZWW6438a93be1f2f505';
const favoritePlantsMap = new Map();
const plantFavorites = JSON.parse(localStorage.getItem('Favorites'));

// Function to pull information from api
const loadPlantsData = () => {
    let favoritePlantsMap = new Map();

    // Loop through each index in saved to localStorage
    for (let i = 0; i < plantFavorites.length; i++) {
        const plantId = plantFavorites[i];

        const fetchData = () => {
        const queryURL =
            "https://perenual.com/api/species/details/" +
            plantId +
            "?key=" +
            APIKey;
        fetch(queryURL)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error("Network response was not ok.");
                })
            .then((data) => {
                
                const common_name = data.common_name;
                favoritePlantsMap.set(common_name, data);
                i++;
                if (i === plantFavorites.length) {
                    console.log(favoritePlantsMap);
                    favoritePlantsMap = Array.from(favoritePlantsMap.entries());
                    localStorage.setItem(
                        "favoritePlantsMap",
                        JSON.stringify(favoritePlantsMap)
                        );
                        populatePlants();
                } else {
                    fetchData();
                }
            })
            .catch((error) => {
                console.error("There was a problem fetching the data:", error);
            });
        };
        fetchData();
    }
};





function populatePlants() {
    let favoritePlantsMap = new Map(JSON.parse(localStorage.getItem('favoritePlantsMap')));
    const plants = Array.from(favoritePlantsMap.values());

    // Clear plant list container
    const plantListContainer = document.getElementById('plant-list-container');
    plantListContainer.className = 'columns is-centered my-6 is-flex is-flex-wrap-wrap';
    plantListContainer.innerHTML = '';

    // Populate plant list
    plants.forEach(plant => {
        // Check if the plant data exists
        if (plant) {
            // Check if any required data is missing
            const imageUrl = plant.default_image.original_url || '';
            const commonName = plant.common_name || '';
            const scientificName = plant.scientific_name || '';
            const description = plant.description || '';
            const watering = plant.watering || '';
            const maintenance = plant.maintenance || '';
            const propagation = plant.propagation || '';
            const hardinessMin = plant.hardiness.min || '';
            const hardinessMax = plant.hardiness.max || '';
            const sunlight = plant.sunlight || '';
            const growthRate = plant.growth_rate || '';

            // Create the plant list item
            const plantListItem = document.createElement('div');
            plantListItem.className = 'column card is-one-fifth m-1 is-flex is-flex-direction-column';
            plantListItem.innerHTML = `
                <div class="card-image">
                    <figure class="image is-4by3">
                        <img id="medium-image" src="${imageUrl}" alt="${commonName}">
                    </figure>
                </div>
                <div class="card-content is-flex-grow-1">
                    <div class="media">
                        <div class="media-content">                            
                                    <p id="common-name" class="title is-3">${commonName}</p>
                                    <p id="scientific-name" class="subtitle is-6">${scientificName}</p>
                                    <p class="subtitle is-5 has-text-black">Description:</p>
                                    <p id="description" class="subtitle is-6">${description}</p>
                                    <p class="subtitle is-5 has-text-black">Watering:</p>
                                    <p id="watering" class="subtitle is-6">${watering}</p>
                                    <p class="subtitle is-5 has-text-black">Maintenance:</p>
                                    <p id="maintenance" class="subtitle is-6">${maintenance}</p>
                                    <p class="subtitle is-5 has-text-black">Propagation:</p>
                                    <p id="propagation" class="subtitle is-6">${propagation}</p>
                                    <p class="subtitle is-5 has-text-black">Hardiness:</p>
                                    <p id="hardiness" class="subtitle is-6">${hardinessMin} - ${hardinessMax}</p>
                                    <p class="subtitle is-5 has-text-black">Sunlight</p>
                                    <p id="sunlight" class="subtitle is-6">${sunlight}</p>
                                    <p class="subtitle is-5 has-text-black">Growth Rate:</p>
                                    <p id="growth-rate" class="subtitle is-6">${growthRate}</p>
                                </div>
                            
                        </div>
                    </div>
                </div>
                <footer class="card-footer is-flex-shrink-0">
                    <p class= "card-footer-item">
                    </p>
                </footer>
            `;
            // Create the heart button
            const trashButton = document.createElement('button');
            trashButton.className = 'button is-warning is-outlined';
            trashButton.innerHTML = `
                <span class="icon">
                    <i class="fa fa-trash"></i>
                </span>
                `;
            // Heart button click handler
            trashButton.addEventListener('click', () => {
                const plantID = plant.id;
            
                // check if the plant is already in the Favorites array
                if (!Favorites.includes(plantID)) {
                    // remove the plantID from the Favorites array and save to localStorage
                    const index = Favorites.indexOf(plantID);
                    Favorites.splice(index, 1);
                    saveFavorites(Favorites);
                }
            });
            
            // Append the heart button to the card footer
            const footer = plantListItem.querySelector('.card-footer');
            footer.querySelector('.card-footer-item').appendChild(trashButton);
                    plantListContainer.appendChild(plantListItem);
                }
            });
}

window.addEventListener('DOMContentLoaded', (event) => {
    let favoritePlantsMap = new Map();

    // Check if data exists in local storage
    const localData = localStorage.getItem('favoritePlantsMap');
    if (localData) {
        favoritePlantsMap = new Map(JSON.parse(localStorage.getItem('favoritePlantsMap')));
    }

    populatePlants();

    // If data exists, set favoritePlantsMap to the parsed data from local storage
    if (localData) {
    favoritePlantsMap = new Map(JSON.parse(localData));
    }
    if (favoritePlantsMap.size === 0) {
        const modal = document.getElementById('load-modal');
        modal.style.display = 'block';

        const loadButton = document.getElementById('load-button');
        loadButton.addEventListener('click', () => {
            loadPlantsData();
            modal.style.display = 'none';
        });
    } else {
        populatePlants();
    }
});

////watering button function

// function WateringBtn(){
//     var waterBtn = document.createElement('div');
//     waterBtn.className = 'special';
// waterBtn.innerHTML = `
//     <button id="saveBtn" class="icon">
//       <i class="fa fa-tint"></i>
//     </button>
//     <span class="field">
//       <label for="userInputDays">Water again in...</label> 
//       <div class="control">
//         <input id="userInputDays" type="number" min="1" max="14" value="1">
//         <label for="userInputDays">day(s)</label> 
//       </div>
//     </span>
//   `;

//     const footer = document.querySelector('.card-footer');
//     footer.appendChild(waterBtn);

//     const userInput = document.getElementById("userInputDays")
//     const saveButton = document.getElementById("saveBtn")
//     

    // saveButton.addEventListener('click', () => {
    //     const userInput = parseInt(saveButton.value);
    //     localStorage.setItem('userInput', userInput);

    //     const wateringDate = new Date();
    //     wateringDate.setDate(wateringDate.getDate() + userInput);

        
    // });
//}