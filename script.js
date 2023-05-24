let recipe = []
let searchInputValue = ""

const loadData = async () => {
  const response = await fetch("recipes.json");
  const data = await response.json();
  return data;
};

const displayRecipe = (elements) => {
  const recipes = document.getElementById("listRecipes");
  recipes.innerHTML = "";

  for (let i = 0; i < elements.length; i++) {
    let ficheRecipes = new Recipe(elements[i]);
    recipes.innerHTML += ficheRecipes.RecipeCardHTML();
  }
};

const filterResearch = () => {
  const searchInput = document.getElementById('searchTop');
  searchInput.addEventListener('keyup', function () {
    searchInputValue = searchInput.value.toLowerCase();

    if (searchInputValue.length < 3) {
      displayRecipe(recipe);
    } else {
      filterRecipe();
    }
  });
};
  
const filterRecipe = () => {

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

const getIngredients = (searchInputIngredient) => {
  let tagIngredients = [];
  
  for (const element of recipe) {
    for (const ingredient of element.ingredients) {
      tagIngredients.push(ingredient.ingredient);
    }
  }
  // Élimine les doublons et trie les ingrédients par ordre alphabétique
  tagIngredients = Array.from(new Set(tagIngredients)).sort(); 

  let filteredIngredients = [];

  for (const e of tagIngredients) {
    if (searchInputIngredient && e.toLowerCase().includes(searchInputIngredient)) {
      filteredIngredients.push(e);
    } else if (!searchInputIngredient) {
      filteredIngredients.push(e);
    }
  }

    return filteredIngredients;
  }

const getAppliances = (searchInputAppliance) => {
  let appliances = [];
  
  for (const element of recipe) {
    appliances.push(element.appliance);
  }
  
  appliances = Array.from(new Set(appliances)).sort();

  let filteredAppliances = [];

  for (const e of appliances) {
    if (searchInputAppliance && e.toLowerCase().includes(searchInputAppliance)) {
      filteredAppliances.push(e);
    } else if (!searchInputAppliance) {
      filteredAppliances.push(e);
    }
  }
  return filteredAppliances;
}

const getUstensils = (searchInputUstensil) => {
  let ustensils = [];
  
  for (const element of recipe) {
    for (const ustensil of element.ustensils) {
      ustensils.push(ustensil);
    }
  }
  
  ustensils = Array.from(new Set(ustensils)).sort();

  let filteredUstensils = [];

  for (const e of ustensils) {
    if (searchInputUstensil && e.toLowerCase().includes(searchInputUstensil)) {
      filteredUstensils.push(e);
    } else if (!searchInputUstensil) {
      filteredUstensils.push(e);
    }
  }
  return filteredUstensils
} 

const displayIngredients = (searchInputIngredient) => {
  const ingredientBlue = document.getElementById("blues");  
  const tagIngredients = getIngredients(searchInputIngredient)
  
  ingredientBlue.innerHTML = "";
    
  for (let i = 0; i < tagIngredients.length; i++) {
    ingredientBlue.innerHTML += `<li class="tags_blue tags">${tagIngredients[i]}</li>`;   
  }
}

const displayAppliances = (searchInputAppliance) => {
  const appliancesGreen = document.getElementById("greens");
  const tagAppliances = getAppliances(searchInputAppliance)
  
  appliancesGreen.innerHTML = "";
    
  for (let i = 0; i < tagAppliances.length; i++) {
    appliancesGreen.innerHTML += `<li class="tags_green tags">${tagAppliances[i]}</li>`
  }
}
const displayUstensils = (searchInputUstensil) => {
  const ustensilRed = document.getElementById("reds");
  const tagUstensils = getUstensils(searchInputUstensil)
  
  ustensilRed.innerHTML = "";
  
  for (let i = 0; i < tagUstensils.length; i++) {
    ustensilRed.innerHTML += `<li class="tags_red tags">${tagUstensils[i]}</li>`
  }
}

const tagResearch = () => {
  const searchBlueInput = document.getElementById('input-blue');
  const searchGreenInput = document.getElementById('input-green');
  const searchRedInput = document.getElementById('input-red');
  
  searchBlueInput.addEventListener('keyup', function () {
    const searchIngredient = searchBlueInput.value.toLowerCase();
    displayIngredients(searchIngredient);
  });
  
  searchGreenInput.addEventListener('keyup', function () {
    const searchAppliance = searchGreenInput.value.toLowerCase();
    displayAppliances(searchAppliance);
  });
  
  searchRedInput.addEventListener('keyup', function () {
    const searchUstensil = searchRedInput.value.toLowerCase();
    displayUstensils(searchUstensil);
  });
};

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
  const data = await loadData();
  recipe = data.recipes;
  displayRecipe(recipe);
  filterResearch();
  displayIngredients();
  displayAppliances();
  displayUstensils();
  tagResearch();
}; 
init();