// Declarations
const explorePlantsMap = new Map();
const pageForwardButton = document.getElementById('page-forward');
const pageBackButton = document.getElementById('page-back');
const APIKey = 'sk-A5va6434c28d91fdb480';

let currentPage = 1;

const loadPlantsData = () => {
    let i = 1;
    const fetchData = () => {
    const queryURL =
        "https://perenual.com/api/species-list?indoor=1&page=" +
        i +
        "&key=" +
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
                    explorePlantsMap.set(plant.common_name, plant);
                });
                i++;
                fetchData();
            } else {
                localStorage.setItem('explorePlantsMap', JSON.stringify(Array.from(explorePlantsMap.entries())));
                populatePlants(currentPage);
                console.log(explorePlantsMap);
            }
        })
        .catch((error) => {
        console.error("There was a problem fetching the data:", error);
        });
    };
    fetchData();
};


function populatePlants(pageNumber) {
    const pageSize = 30;
    const startIndex = (pageNumber - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const plants = Array.from(explorePlantsMap.values()).slice(startIndex, endIndex);

    // Write page number to DOM
    const pageTitle = document.getElementById('page-title');
    pageTitle.textContent = `Page ${pageNumber}`;

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
                        <button class="button is-warning is-outlined">
                            <span class="icon">
                                <i class="fa fa-heart"></i>
                            </span>
                        </button>
                    </p>
                </footer>
            `;
            plantListContainer.appendChild(plantListItem);
        }
    });
}

    pageForwardButton.addEventListener('click', () => {
        currentPage++;
        populatePlants(currentPage);
});

pageBackButton.addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        populatePlants(currentPage);
    }
})

window.addEventListener('DOMContentLoaded', (event) => {
    if (explorePlantsMap.size === 0) {
        const modal = document.getElementById('load-modal');
        modal.style.display = 'block';

        const loadButton = document.getElementById('load-button');
        loadButton.addEventListener('click', () => {
            loadPlantsData();
            modal.style.display = 'none';
        });
    }
});