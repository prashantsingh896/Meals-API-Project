
//getting favourite meals
var favourites = JSON.parse(localStorage.getItem(localStorage.key(0)));

const list = document.querySelector(".text-success");
//loading the favourite meals list
if(favourites!=null){
    //iterating over meals in favourite then adding markup to each meal and putting in content object
    let content = favourites
    .map((item) => {
        return `<div class="p-2 m-2 bg-light">
        
        <h3><button type="submit" name="mealName" value="${item}" class="list-group-item list-group-item-action">${item}
        </button></h3>
        
        <span class="fa fa-window-close" style="color:red;"></span>
        
        </div>   
        `;
    })
    .join('');
//setting content as innerHTML of  div
list.innerHTML = content;
}

//if favouites is NULL
else{
    alert('Nothing added to favourites');
}

//handles click of remove button and reloading the page with updated details
const remove = document.querySelectorAll(".fa-window-close");

for(let ele of remove){
   
    ele.addEventListener('click',() => {
        
        const mealName = document.querySelector(".list-group-item").innerText;
        const index = favourites.indexOf(mealName);
        console.log(index);
        favourites.splice(index,1);
        localStorage.setItem('favouriteMeals',JSON.stringify(favourites));
        location.reload();
    })
}

