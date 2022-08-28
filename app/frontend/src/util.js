
export function getRandomIntInRange(rangeEnd) {
    return Math.floor(Math.random() * rangeEnd);
}
  
// Convert select-option data into HTML
export function queryOptionsToHTML(data) {
    let options = [];

    // ES6 - valid syntax
    for(const [key, value] of Object.entries(data['message'])) {
        const breed = key;
        const subBreeds = value;
        
        if(subBreeds.length > 0) {
            for(let i = 0; i < subBreeds.length; i++) {
                const subBreed = subBreeds[i];
                const breedStr = `${subBreed} ${breed}`;
                const breedValue = `${breed}/${subBreed}`;
                const optionHTML = <option key={`${breed}option${i}`} value={breedValue}> {breedStr} </option>;
                // console.log(optionHTML);
                options.push(optionHTML);
            }
        }
        else {
        const optionHTML = <option key={`${breed}option`} value={breed}> {breed} </option>;
        options.push(optionHTML);
        }

    }
    return options;

}
