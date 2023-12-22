let recipes_div = document.getElementById("recipe_results");
let id;

function toggle(title_str, instructions_str){
    const recipe_info = document.getElementById("recipe_info");
    const isHidden = recipe_info?.classList?.contains("hidden");
    if(isHidden){
        recipe_info?.classList?.remove("hidden");
        recipe_info.classList.add("open")
        const meal_Title = document.getElementById("meal_Title");
        meal_Title.innerText = "Burek";
        meal_Title.innerText = title_str;

        const instructions = document.getElementById("instructions");
        instructions.innerText = instructions_str
    }
    else{
        recipe_info?.classList?.add("hidden");
        recipe_info.classList.remove("open")
    }
}


//2. get the data from DB
async function searchRecipes(name){
    try {
        let url = "https://www.themealdb.com/api/json/v1/1/search.php?s=" + name;
        let res = await fetch(url);
        let data = await res.json()
        // .json will collect the data
        // console.log(data);
        return data.meals;

    } catch (error) {
        console.log("error:", error);
        
        
    }

}


// 3.Append the data in the page
function appendRecipes(recipes){
    recipes_div.innerHTML = null;

    if (recipes === null){
        // return false;
        // let container= document.getElementById("recipe_results")
        let not_aval = document.createElement("h2");
        not_aval.innerText = "Uh-oh! Seems like this recipe is not available here :(";

        let not_aval_img = document.createElement("img");
        not_aval_img.src = "https://static.vecteezy.com/system/resources/previews/026/776/277/original/cute-sad-pizza-character-funny-unhappy-pie-cartoon-emoticon-in-flat-style-food-emoji-illustration-vector.jpg"
        recipes_div.append(not_aval, not_aval_img)
        
    }

    recipes.forEach(function(el){
        let meal_name = document.createElement("h3")
        meal_name.innerText =  el.strMeal;

        let tag_name = document.createElement("p")
        tag_name.innerText = "Category: " + el.strTags;

        let meal_image = document.createElement("img")
        meal_image.src = el.strMealThumb;

        let link = document.createElement("a")
        link.innerText = "Recipe Video"
        link.href = el.strYoutube;
        link.target = "_blank"

        const button = document.createElement("button")
        button.innerText = "View Recipe";
        button.className = "view_recipe"
        
        button.addEventListener("click", function(){
            toggle(el.strMeal, el.strInstructions);
        })

        let div = document.createElement("div");
        div.append(meal_image, meal_name, tag_name, link, button)

        recipes_div.append(div)

    })
}


// 1. get the value from the input once user type anything
 async function main(){
    let query = document.getElementById("recipe_query").value
    console.log(query);

    let x = searchRecipes(query);
    // searchRecipes is returning promise
    // console.log("x:", x)

    let data = await x;

    appendRecipes(data);
}


// debouncing
function debounceFn(func, delay){
    // if we have id then delete the old timeout
        if(id){
            clearTimeout(id)
        }
 id = setTimeout(function(){
        func()
    }, delay)

}

