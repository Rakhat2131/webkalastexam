const countryForm = document.getElementById('countryForm');
const countrySelect = document.getElementById('countrySelect');

// Function to fetch countries from backend and populate the select dropdown
async function fetchCountries() {
    try {
        const response = await fetch('/countries'); // Assuming '/countries' is the endpoint to get countries from backend
        const countries = await response.json();
        countries.forEach(country => {
            const option = document.createElement('option');
            option.value = country.countryCode; // Assuming country.countryCode contains the country code
            option.textContent = country.countryName; // Assuming country.countryName contains the country name
            countrySelect.appendChild(option);
        });
    } catch (error) {
        console.error('Error fetching countries:', error);
    }
}

fetchCountries();

countryForm.addEventListener('submit', async function(event) {
    event.preventDefault();
    const countryCode = countrySelect.value;
    const response = await fetch(`/timezone/${countryCode}`); // Assuming '/timezone/:countryCode' is the endpoint to get timezone for a specific country code
    const timeZoneInfo = await response.json();
    // Update the clock with the received timezone information
    // You can use this information to display the time of the selected country on the clock
});
