// locationService.js

const apiKey = '7aacf2de3eb7457eb8b7f85230ba5007'; // Replace with your OpenCage API key

// Get user's geolocation coordinates
export function getUserLocation() {
    return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    resolve({ latitude, longitude });
                },
                (error) => {
                    reject(`Error retrieving location: ${error.message}`);
                }
            );
        } else {
            reject("Geolocation is not supported by this browser.");
        }
    });
}

// Get city name from latitude and longitude
export async function getCityFromCoordinates(latitude, longitude) {
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.results && data.results.length > 0) {
            const components = data.results[0].components;
            const city = components.city || components.town || components.village || 'Unknown location';
            console.log("City:", city);
            return city;
        } else {
            console.error("No results found for the provided coordinates.");
            throw new Error("No results found for the provided coordinates.");
        }
    } catch (error) {
        console.error("Error fetching city:", error);
        throw new Error(`Error fetching city: ${error.message}`);
    }
}

// Get latitude and longitude from city name
export async function getCoordinatesFromCity(city) {
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${city}&key=${apiKey}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.results && data.results.length > 0) {
            const { lat, lng } = data.results[0].geometry;
            return { latitude: lat, longitude: lng };
        } else {
            throw new Error(`No coordinates found for city: ${city}`);
        }
    } catch (error) {
        throw new Error(`Error fetching coordinates: ${error.message}`);
    }
}
