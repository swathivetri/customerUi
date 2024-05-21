function addCountryToStateData(data) {
    return data.map(item => ({ ...item, country: "India" }));
}

// Call the function and store the modified array
const updatedStateData = addCountryToStateData(stateData);

// Now `updatedStateData` contains the original data with the country field added to each object
console.log(updatedStateData);



export function addCountryToStateData(data) {
    return data.map(item => ({ ...item, country: "India" }));
}