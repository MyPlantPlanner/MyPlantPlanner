// This js file is linked to the explore.html
// Declarations
const APIKey = 'sk-gZWW6438a93be1f2f505';
const explorePlantsMap = new Map();
const searchButton = document.getElementById('search-button');

// Use Fetch in a function to display plants in cards on explore page: 
// const findMeSomePlants = function() {
//     const queryURL = "https://perenual.com/api/species-list?indoor=1&key=" + APIKey + "&page=1";
//     fetch(queryURL)
//         .then((response) => {
//             if (!response.ok) {
//                 throw new Error("Plant not found");
//             }
//             return response.json();
//         })
//         .then((data) => { 
//             data.forEach((plant) => {
//                 plantsMap.set(plant.id, plant);
//             });
//             // Save plantsMap to local storage
//             localStorage.setItem('plantsMap', JSON.stringify(Array.from(plantsMap.entries())));
//         })
//         .catch((error) => {
//             console.error(error);
//             alert(error.message);
//     });
// };

const findMeSomePlants = function () {
    const queryURL = 'https://perenual.com/api/species-list?page=1&indoor=1&key=' + APIKey;

    // Fetch API data
    fetch(queryURL)
        .then(response => {
            if (!response.ok) {
                throw new Error('Plant not found');
            }
            return response.json();
        })
        .then(data => {
            // Save data to search history map
            localStorage.setItem('page-1', JSON.stringify(data));
            explorePlantsMap.set(plant.commone_name, JSON.stringify(data));
            localStorage.setItem('searchHistoryMap', JSON.stringify([...searchHistoryMap.entries()]));

            // Create button
            searchHistoryButton(citySearchUserInput.value);

            // Delete oldest search history if more than 10
            if (searchHistoryMap.size > 10) {
                const oldestCity = searchHistoryMap.keys().next().value;
                searchHistoryMap.delete(oldestCity);
                localStorage.setItem('searchHistoryMap', JSON.stringify([...searchHistoryMap.entries()]));
                const oldestButton = document.getElementById(oldestCity);
                if (oldestButton) {
                    oldestButton.remove();
                };
            };

            console.log(data);

            // Display weather data
        cityName.textContent = `${data.city.name}, ${new Date(data.list[0].dt * 1000).toLocaleDateString()}`;
        tempNow.textContent = data.list[0].main.temp.toFixed(0) + '\u00B0 F';
        windNow.textContent = data.list[0].wind.speed + ' mph';
        humidityNow.textContent = data.list[0].main.humidity + '%';
        weatherIconNow.src = `https://openweathermap.org/img/w/${data.list[0].weather[0].icon}.png`;
        dateTomorrow.textContent = `${new Date((data.list[0].dt + 86400 ) * 1000).toLocaleDateString()}`;
        tempTomorrow.textContent = data.list[1].main.temp.toFixed(0) + '\u00B0 F';
        windTomorrow.textContent = data.list[1].wind.speed + ' mph';
        humidityTomorrow.textContent = data.list[1].main.humidity + '%';
        weatherIconTomorrow.src = `https://openweathermap.org/img/w/${data.list[1].weather[0].icon}.png`;
        dateIn2Days.textContent = `${new Date((data.list[0].dt + 172800 ) * 1000).toLocaleDateString()}`;
        tempIn2Days.textContent = data.list[2].main.temp.toFixed(0) + '\u00B0 F';
        windIn2Days.textContent = data.list[2].wind.speed + ' mph';
        humidityIn2Days.textContent = data.list[2].main.humidity + '%';
        weatherIconIn2Days.src = `https://openweathermap.org/img/w/${data.list[2].weather[0].icon}.png`;
        dateIn3Days.textContent = `${new Date((data.list[0].dt + 259200 ) * 1000).toLocaleDateString()}`;
        tempIn3Days.textContent = data.list[3].main.temp.toFixed(0) + '\u00B0 F';
        windIn3Days.textContent = data.list[3].wind.speed + ' mph';
        humidityIn3Days.textContent = data.list[3].main.humidity + '%';
        weatherIconIn3Days.src = `https://openweathermap.org/img/w/${data.list[3].weather[0].icon}.png`;
        dateIn4Days.textContent = `${new Date((data.list[0].dt + 345600 ) * 1000).toLocaleDateString()}`;
        tempIn4Days.textContent = data.list[4].main.temp.toFixed(0) + '\u00B0 F';
        windIn4Days.textContent = data.list[4].wind.speed + ' mph';
        humidityIn4Days.textContent = data.list[4].main.humidity + '%';
        weatherIconIn4Days.src = `https://openweathermap.org/img/w/${data.list[4].weather[0].icon}.png`;
        dateIn5Days.textContent = `${new Date((data.list[0].dt + 432000 ) * 1000).toLocaleDateString()}`;
        tempIn5Days.textContent = data.list[5].main.temp.toFixed(0) + '\u00B0 F';
        windIn5Days.textContent = data.list[5].wind.speed + ' mph';
        humidityIn5Days.textContent = data.list[5].main.humidity + '%';
        weatherIconIn5Days.src = `https://openweathermap.org/img/w/${data.list[5].weather[0].icon}.png`;
        })
        .catch(error => {
            console.error(error);
            alert(error.message);
        });
};

// Event Listener
searchButton.addEventListener('click', findMeSomePlants);
// if (plantsMap.size === 0) {
//     findMeSomePlants();
// }