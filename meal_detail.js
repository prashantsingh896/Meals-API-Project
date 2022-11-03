// Getting the meal Name by querying URL Parameters and displaying meal details with AJAX API request
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const mealName = urlParams.get('mealName');
const url = "https://www.themealdb.com/api/json/v1/1/search.php?s=" + mealName;
console.log(url);
const xhrHTTPRequest = new XMLHttpRequest();
xhrHTTPRequest.open('GET', url, true);
xhrHTTPRequest.getResponseHeader("Content-type", "application/json");
xhrHTTPRequest.onload = function () {
    const obj = JSON.parse(this.responseText).meals[0];
    const imgUrl = obj.strMealThumb;
    document.getElementsByTagName('h1')[0].innerText = obj.strMeal;
    document.getElementsByTagName('img')[0].setAttribute('src', "" + imgUrl);
    document.getElementById('meal-description').innerText = obj.strInstructions;
}

xhrHTTPRequest.send();


//Creating a  array to hold favourite meals name
var favourites = [];

//Local storage API will be used to save favourite meals of USER
//If there are already meals in favourite then get them
if (localStorage.length!=0) {
    favourites = JSON.parse(localStorage.getItem(localStorage.key(0)));
}


//handle click event on favourite button
document.getElementById('favourite-button').addEventListener('click', () => {
    //if meal is already added in favourite then alert & just return
    if (favourites.includes(mealName)) {
        alert('already added to favourites');
        return;
    }
    //else push in to favourite array
    favourites.push(mealName);
    //save new favourite list in local Storage
    localStorage.setItem('favouriteMeals', JSON.stringify(favourites));
    alert(mealName + " " + 'added to favourites');
});

