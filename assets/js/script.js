// Declarations
fetch('https://perenual.com/api/species-list?per_page=6000&key=sk-A5va6434c28d91fdb480')
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error));