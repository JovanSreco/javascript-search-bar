const employeeCardContainer = document.querySelector("[data-employee-card-container]")
const employeeCardTemplate = document.querySelector("[data-employee-card-template]")
const searchInput = document.querySelector("[data-search]")
const popupInfo = document.querySelector("[data-popup-info]")
const popupInfoItems = document.querySelectorAll("[data-popup-info-item]")
const popupBtn = document.querySelector("[data-info-popup-btn]")
const employees = new Map()

// The main search for employees. Searches Name Email and City(where they live)
searchInput.addEventListener("input", e => {
    const value = e.target.value.toLowerCase();

    employees.forEach((obj, element) => {
        let {name, email, city} = obj
        const visible = name.toLowerCase().includes(value) || email.toLowerCase().includes(value) || city.toLowerCase().includes(value)
        element.classList.toggle("employees-card--invisible", !visible)
    })
})

// Fetch random data about some hypothetical employees then store everything in employees Map
fetch("https://jsonplaceholder.typicode.com/users")
    .then(response => response.json())
    .then(data => {
        data.forEach( (employee) => {
            // Using destructuring, and Map() to store our data for each employee
            const {id, name, username, email, address: { street: street, suite: suite, city: 
                city, zipcode: zipcode, geo: {lat: lat, lng: lng}}} = employee
            //Creating a clone of a Node and setting it as a key in Map and value is an object of all information
            const card = employeeCardTemplate.content.cloneNode(true).children[0]
            employees.set(card, {id:id,name:name, username:username, email:email, street:street, 
                          suite:suite, city:city, zipcode:zipcode, lat:lat, lng:lng})
            // Have to append info to cards during each iteration. Each Card VIEW MORE BTN has to have an event listener for getting more information
            appendInformation(name, email, city, card)
        })
    })

function appendInformation(...args){
    //Last element of arguments is card element
    const card = args[args.length - 1]
    const cardInfo = card.querySelectorAll("[data-employee-card-info]")
    const cardBtn = card.querySelector("[data-employee-card-btn]")
    // Basic card info 
    args.forEach((item, index) => {
        if(index !== args.length - 1) cardInfo[index].textContent = cardInfo[index].textContent + item;
    })
    employeeCardContainer.appendChild(card)
    // Add listener
    listenCardBtn(card, cardBtn)
}

function listenCardBtn(card, cardBtn) {
    //Logic for card buttons to display more information in the popup element
    cardBtn.addEventListener("click", () => {
        popupInfo.classList.add("active");
        const obj = employees.get(card)
        const arrayOfItems = [...popupInfoItems]
        arrayOfItems.forEach( (div, index) => {
            let key = Object.keys(obj)[index]
            key = key.slice(0, 1).toUpperCase() + key.slice(1)
            const value = Object.values(obj)[index]
            div.textContent = `${key}: ${value}`
        });
    })
}

popupBtn.addEventListener("click", () => popupInfo.classList.remove("active"))