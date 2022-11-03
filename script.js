//  Populating Searchable Array with all meals name using API calls for implementing search suggestion feature
let searchable = [];

const urlCatergory = "https://www.themealdb.com/api/json/v1/1/categories.php";
var xhrHTTPRequest = new XMLHttpRequest();
xhrHTTPRequest.open('GET', urlCatergory, true);
xhrHTTPRequest.getResponseHeader("Content-type", "application/json");
xhrHTTPRequest.onload = function () {
    const obj = JSON.parse(this.responseText).categories;

    for (const meals of obj) {
        let urlMeal = "https://www.themealdb.com/api/json/v1/1/filter.php?c=" + meals.strCategory;
        var xhrHttp = new XMLHttpRequest();
        xhrHttp.open('GET', urlMeal, true);
        xhrHttp.getResponseHeader("Content-type", "application/json");
        xhrHttp.onload = function () {
            const response = JSON.parse(this.responseText).meals;
            for (const meal of response) {
                searchable.push(meal.strMeal);
            }
        }
        xhrHttp.send();

    }
}
xhrHTTPRequest.send();

//Implementing search suggestion feature

const searchInput = document.getElementById('mealName');
const searchWrapper = document.querySelector('.wrapper');
const resultsWrapper = document.querySelector('.results');

//as we type in search input - this code handles the suggestions
searchInput.addEventListener('keyup', () => {
    let results = [];
    let input = searchInput.value;
    if (input.length) {
        results = searchable.filter((item) => {

            return item.toLowerCase().includes(input.toLowerCase());
        })
    }

    renderResults(results);
})

// it shows the suggested results
function renderResults(results) {

    if (!results.length) {
        return searchWrapper.classList.remove('show');
    }

    let content = results
        .map((item) => {   
            return `<li>${item}</li>`;
        })
        .join('');

    searchWrapper.classList.add('show');
    resultsWrapper.innerHTML = `<ul>${content}</ul>`;
}

//this section of code fills the value of suggested meals in search input on clicking
resultsWrapper.addEventListener("mouseover", function () {
    let elements = document.querySelectorAll("ul li");
    for (const element of elements) {
        element.addEventListener('click', () => {
            searchInput.value = String(element.innerHTML);
        });
    }
});



