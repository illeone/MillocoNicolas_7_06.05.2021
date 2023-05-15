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

  const getAppliances = (recipe) => {
    let appliances = [];
  
    for (const element of recipe) {
      appliances.push(element.appliance);
    }
  
    appliances = Array.from(new Set(appliances)).sort();
    return appliances;
  }

  const getUstensils = (recipe) => {
    let ustensils = [];
  
    for (const element of recipe) {
      for (const ustensil of element.ustensils) {
        ustensils.push(ustensil);
      }
    }
  
    ustensils = Array.from(new Set(ustensils)).sort();
    return ustensils;
  } 
  
  const displayIngredients = (recipe) => {
    const ingredientBlue = document.getElementById("blues");  
    const ingredients = getIngredients(recipe);
    
    ingredientBlue.innerHTML = "";
      
    for (let i = 0; i < ingredients.length; i++) {
      ingredientBlue.innerHTML += `<li class="tags_blue tags">${ingredients[i]}</li>`;   
    }
  }

  const displayAppliances = (recipe) => {
    const appliancesGreen = document.getElementById("greens");  
    const appliances = getAppliances(recipe);
    
    appliancesGreen.innerHTML = "";
      
    for (let i = 0; i < appliances.length; i++) {
      appliancesGreen.innerHTML += `<li class="tags_green tags">${appliances[i]}</li>`;   
    }
  }

  const displayUstensils = (recipe) => {
    const ustensilsGreen = document.getElementById("reds");  
    const ustensils = getUstensils(recipe);
    
    ustensilsGreen.innerHTML = "";
      
    for (let i = 0; i < ustensils.length; i++) {
      ustensilsGreen.innerHTML += `<li class="tags_green tags">${ustensils[i]}</li>`;   
    }
  }

const blueTags = document.getElementById("blues");
const greenTags = document.getElementById("greens");
const redTags = document.getElementById("reds");

const blueArrow = document.querySelector(".blue-arrow");
const greenArrow = document.querySelector(".green-arrow");
const redArrow = document.querySelector(".red-arrow");

const searchBlue = document.querySelector(".blue");
const searchGreen = document.querySelector(".green");
const searchRed = document.querySelector(".red");

const placeholderBlue = document.getElementById("search-input-blue");
const placeholderGreen = document.getElementById("search-input-green");
const placeholderRed = document.getElementById("search-input-red");

  document.getElementById("search-input-blue").addEventListener("click", () => {
    blueTags.style.display = "block";  
    blueArrow.style.transform = "rotate(180deg)";
    searchBlue.style.width = "650px";
    searchBlue.style.transition = '0.8s';
  });

  document.getElementById("search-input-green").addEventListener("click", () => {
    greenTags.style.display = "block";
    greenArrow.style.transform = "rotate(180deg)";
    searchGreen.style.width = "650px";
    searchGreen.style.transition = '0.8s';
  });

  document.getElementById("search-input-red").addEventListener("click", () => {
    redTags.style.display = "block";
    redArrow.style.transform = "rotate(180deg)";
    searchRed.style.width = "650px";
    searchRed.style.transition = '0.8s';
  });

  window.addEventListener('mouseup', function(event){
    var blue = document.getElementById('blues');
    var green = document.getElementById('greens');
    var red = document.getElementById('reds');

    if(event.target !=blue,green,red) {
      blue.style.display = 'none';
      green.style.display = 'none';
      red.style.display = 'none';
      blueArrow.style.transform = "rotate(0deg)";
      greenArrow.style.transform = "rotate(0deg)";
      redArrow.style.transform = "rotate(0deg)";
      searchBlue.style.width = "150px";
      searchGreen.style.width = "150px";
      searchRed.style.width = "150px";
    } 
  })

const init = async () => {
  const recipe = await loadData();
  displayRecipe(recipe);
  filterResearch(recipe);
  displayIngredients(recipe);
  displayAppliances(recipe);
  displayUstensils(recipe);
};

init();
