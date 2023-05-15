const loadData = async () => {
  const response = await fetch("recipes.json");
  const data = await response.json();
  return data.recipes;
};

const displayRecipe = (elements) => {
  const recipes = document.getElementById("listRecipes");
  recipes.innerHTML = "";

  for (let i = 0; i < elements.length; i++) {
    let ficheRecipes = new Recipe(elements[i]);
    recipes.innerHTML += ficheRecipes.RecipeCardHTML();
  }
};

const filterResearch = (recipe) => {
    console.log(recipe);
  
    const searchInput = document.getElementById('searchTop');
    searchInput.addEventListener('keyup', function () {
      const searchInputValue = searchInput.value.toLowerCase();
  
      if (searchInputValue.length < 3) {
        displayRecipe(recipe);
      } else {
        filterRecipe(recipe, searchInputValue);
      }
    });
  };
  

  const filterRecipe = (recipe, searchInputValue) => {

    const result = [];
  
    for (let i = 0; i < recipe.length; i++) {
      const item = recipe[i];
  
      let isSearchInputValueIncluded = true;
  
      if (searchInputValue) {
        isSearchInputValueIncluded = (
          item.description.toLowerCase().includes(searchInputValue)
          || item.name.toLowerCase().includes(searchInputValue)
          || item.appliance.toLowerCase().includes(searchInputValue)
          || item.ustensils.some(element => element.toLowerCase().includes(searchInputValue))
          || item.ingredients.some(element => element.ingredient.toLowerCase().includes(searchInputValue))
        );
      }
  
      if (isSearchInputValueIncluded) {
        result.push(item);
      }
    }
  
    displayRecipe(result);

    return result;
  }

  const getIngredients = (recipe) => {
    let ingredients = [];
    
    for (const element of recipe) {
      for (const ingredient of element.ingredients) {
        ingredients.push(ingredient.ingredient);
      }
    }
    
    // Élimine les doublons et trie les ingrédients par ordre alphabétique
    ingredients = Array.from(new Set(ingredients)).sort();
    return ingredients;
  }
  
  const displayIngredients = (recipe) => {
    const ingredientBlue = document.getElementById("blues");  
    const ingredients = getIngredients(recipe);
    
    ingredientBlue.innerHTML = "";
      
    for (let i = 0; i < ingredients.length; i++) {
      ingredientBlue.innerHTML += `<li class="tags_blue tags">${ingredients[i]}</li>`;   
    }
  }

  const blueTags = document.getElementById("blues");
  const searchBlue = document.querySelector(".blue");
  const placeholderBlue = document.getElementById("search-input-blue");

  document.getElementById("search-input-blue").addEventListener("click", () => {
    blueTags.style.display = "block";  
    searchBlue.style.width = "650px";
  });

  window.addEventListener('mouseup', function(event){
    var blue = document.getElementById('blues');

    if(event.target !=blue) {
      blue.style.display = 'none';
      searchBlue.style.width = "150px";
    } 
  })

const init = async () => {
  const recipe = await loadData();
  displayRecipe(recipe);
  filterResearch(recipe);
  displayIngredients(recipe);
};

init();
