// script.js

// Initialize the map
const map = L.map('map').setView([0, 0], 2);

// Add OpenStreetMap tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Add click event listener to the map
map.on('click', function(e) {
    getAddress(e.latlng);
});

// Get address from coordinates
function getAddress(latLng) {
    const url = `https://nominatim.openstreetmap.org/reverse?lat=${latLng.lat}&lon=${latLng.lng}&format=json`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const address = data.display_name;
            document.getElementById("address").value = address;
        })
        .catch(error => {
            console.log("Error fetching address:", error);
        });
}
