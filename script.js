const employeeCardContainer = document.querySelector("[data-employee-card-container]")
const employeeCardTemplate = document.querySelector("[data-employee-card-template]")
const searchInput = document.querySelector("[data-search]")
const viewMoreInfoBtns = document.querySelectorAll("[data-employee-card-btn]")
const popupInfo = document.querySelector("[data-popup-info]")
const popupBtn = document.querySelector("[data-info-popup-btn]")
const popupItemsContainer = document.querySelector("data-ul-data-popup-info-item")
const popupItems = document.querySelectorAll("[data-popup-info-item]")
const employees = new Map()

// Fetch random data about some hypothetical employees then store everything in employees Map
fetch("https://jsonplaceholder.typicode.com/users")
    .then(response => response.json())
    .then(data => {
        data.forEach( (employee) => {
            // Using destructuring to practice, and Map() to store our data for each employee
            let {id, name, username, email, address: { street: street, suite: suite, city: 
                city, zipcode: zipcode, geo: {lat: lat, lng: lng}}} = employee
            employees.set(employee.name.toLowerCase(), {id:id,name:name, username:username, email:email, 
                street:street, suite:suite, city:city, zipcode:zipcode, lat:lat, lng:lng})
            // Have to append info to cards during each iteration
            appendCardInfo(name, email, city)
        })
    })

function appendCardInfo(...args){
    const card = employeeCardTemplate.content.cloneNode(true).children[0]
    const cardInfo = card.querySelectorAll("[data-employee-card-info]")
    const cardBtn = card.querySelector("[data-employee-card-btn]")
    cardBtn.addEventListener("click", () => {
        popupInfo.classList.add("active");
        handleMoreInfo(args[0])
    })
    args.forEach((item, index) => {
        cardInfo[index].textContent = cardInfo[index].textContent + item
        employeeCardContainer.appendChild(card)
    })
}



popupBtn.addEventListener("click", () => {
    popupInfo.classList.remove("active")
})
