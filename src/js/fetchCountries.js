export default function fetchCountries(baseUrl, query, onDataUpdate) {
    return fetch(`https://restcountries.eu/rest/v2/name/${query}`).then(resolve => resolve.json())
        .then(data => {
            onDataUpdate(data);
        })
        .catch(error => {
            console.error(error);
        });
}