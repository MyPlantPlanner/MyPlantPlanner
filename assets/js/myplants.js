// This js file is linked to the myplants.html
// Declarations  
const APIKey = 'sk-gZWW6438a93be1f2f505';
const favoritePlantsMap = new Map();

//constPlan = document.guerySelector(buger)
//cont navbarmenus document(quryer guerySelector) Trying to fix hamburger menu
//plant addEventListener( <(. addEventListener() 
//constat
const loadPlantsData = () => {
    let i = 1;
    const fetchData = () => {
    const queryURL =
        "https://perenual.com/api/species-detail/" +
        i +
        "?key=" + 
        APIKey; 
    fetch(queryURL)
        .then((response) => {
        if (response.ok) {
            return response.json();
        }
        throw new Error("Network response was not ok.");
        })
        .then(data => {
            if (data && data.data && data.data.length > 0) {
                data.data.forEach(plant => {
                    favoritePlantsMap.set(plant.common_name, plant);
                });
                i++;
                fetchData();
            } else {
                localStorage.setItem('favoritePlantsMap', JSON.stringify(Array.from(favoritePlantsMap.entries())));
                populatePlants(currentPage);
                console.log(favoritePlantsMap);
            }
        })
        .catch((error) => {
        console.error("There was a problem fetching the data:", error);
        });
    };
    fetchData();
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
                        </div>
                    </div>
                </div>
                <footer class="card-footer is-flex-shrink-0">
                    <p class= "card-footer-item">
                    </p>
                </footer>
            `;
            // Create the heart button
            const heartButton = document.createElement('button');
            heartButton.className = 'button is-warning is-outlined';
            heartButton.innerHTML = `
                <span class="icon">
                    <i class="fa fa-heart"></i>
                </span>
                `;
            // Heart button click handler
            heartButton.addEventListener('click', () => {
                const plantID = plant.id;
            
                // check if the plant is already in the Favorites array
                if (!Favorites.includes(plantID)) {
                    // add the common name to the Favorites array and save to localStorage
                    Favorites.push(plantID);
                    saveFavorites(Favorites);
                }
            });
            
            // Append the heart button to the card footer
            const footer = plantListItem.querySelector('.card-footer');
            footer.querySelector('.card-footer-item').appendChild(heartButton);
                    plantListContainer.appendChild(plantListItem);
                }
            });
}

const cardForm = `
        <div class="card-image">
            <figure class="image">
                <img id="medium-image" src="https://perenual.com/storage/species_image/1_abies_alba/og/1536px-Abies_alba_SkalitC3A9.jpg" alt="Placeholder image">
            </figure>
        </div>
        <div class="card-content">
            <div class="media">
                <div class="media-content">
                    <p id="common-name" class="title is-3">European Silver Fir</p>
                    <p id="scientific-name" class="subtitle is-6">Abies alba</p>
                </div>
            </div>
            <p class="title is-5">Watering:<span id="watering" class="subtitle is-6 ml-2">Frequent</span></p>
            <progress class="progress is-link" value="60" max="100"></progress>
            <p class="title is-5">Sunlight:<span id="sunlight" class="subtitle is-6 ml-2">Any</span></p>
            <p class="title is-5">Hardiness:<span id="hardiness" class="subtitle is-6 ml-2">7-7</span></p>
            <footer class="card-footer">
                <p class="card-footer-item">
                    <button class="button is-warning is-outlined">
                        <span class="icon">
                            <i class="fa fa-heart"></i>
                        </span>
                    </button>
                </p>
                <p class="card-footer-item">
                    <button class="button is-warning is-outlined">
                        <span class="icon">
                            <i class="fa fa-trash"></i>
                        </span>
                    </button>
                </p>
            </footer>
        </div>
    </div>
`;

// const cardContainer = document.querySelector("row-1");
// const createCardBtn = document.getElementById("create-card");

// createCardBtn.addEventListener("click", function() {
//   const newCard = document.createElement("div");
//   newCard.classList.add("card", "is-one-fifth", "m-1");
//   newCard.innerHTML = cardForm;
//   cardContainer.appendChild(newCard);
// });

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
