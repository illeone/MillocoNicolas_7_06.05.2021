let recipes = []
let searchInputValue = ""
let recipeFiltered = []
let ingredientTagSelected = []
let applianceTagSelected = [];
let ustensilTagSelected = []

const synonyms = {
  'Crème fraîche': ['crème fraiche', 'crême fraîche'],
  'banane': ['banane', 'bananes']
};

const normalizeIngredient = (ingredient) => {
  for (let key in synonyms) {
    if (synonyms[key].includes(ingredient.toLowerCase())) {
      return key;
    }
  }
  return ingredient;
};

 //supprime les parenthèses et leur contenu des ustensiles
const cleanUstensil = (ustensil) => {
  return ustensil.replace(/ *\([^)]*\) */g, "");
};

const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

const loadData = async () => {
  const response = await fetch("recipes.json");
  let data = await response.json();

  for (let i = 0; i < data.recipes.length; i++) {
    for (let j = 0; j < data.recipes[i].ingredients.length; j++) {
      data.recipes[i].ingredients[j].ingredient = normalizeIngredient(data.recipes[i].ingredients[j].ingredient);
      data.recipes[i].ingredients[j].ingredient = capitalize(data.recipes[i].ingredients[j].ingredient);
    }
    
    for (let k = 0; k < data.recipes[i].ustensils.length; k++) {
      data.recipes[i].ustensils[k] = cleanUstensil(data.recipes[i].ustensils[k]);
      data.recipes[i].ustensils[k] = capitalize(data.recipes[i].ustensils[k]);
    }
  }

  return data;
};

const displayRecipe = (recipeList) => {
  const recipeContainer = document.getElementById("listRecipes");
  recipeContainer.innerHTML = "";

  for (let i = 0; i < recipeList.length; i++) {
    let recipeCard = new Recipe(recipeList[i]);
    recipeContainer.innerHTML += recipeCard.RecipeCardHTML();
  }
};

const filterResearch = () => {
  const searchInput = document.getElementById('searchTop');
  searchInput.addEventListener('keyup', function () {
    searchInputValue = searchInput.value.toLowerCase();
    filterRecipe();
  });
};

const filterRecipe = () => {
  const result = recipes.filter(item => {
    const isSearchInputValueIncluded = searchInputValue.length < 3 || (
      item.description.toLowerCase().includes(searchInputValue.toLowerCase())
      || item.name.toLowerCase().includes(searchInputValue.toLowerCase())
      || item.appliance.toLowerCase().includes(searchInputValue.toLowerCase())
      || item.ustensils.some(element => element.toLowerCase().includes(searchInputValue.toLowerCase()))
      || item.ingredients.some(element => element.ingredient.toLowerCase().includes(searchInputValue.toLowerCase()))
    );

    const ingredientSelectedLowerCase = ingredientTagSelected.map(ingredient => ingredient.toLowerCase());
    const ustensilTagSelectedLowerCase = ustensilTagSelected.map(ustensil => ustensil.toLowerCase());

    const isIngredientTagSelectedIncluded = !ingredientSelectedLowerCase.length || (
      ingredientSelectedLowerCase.filter(ingredient => item.ingredients.some(itemIngredient => itemIngredient.ingredient.toLowerCase() === ingredient)).length === ingredientSelectedLowerCase.length
    );

    const isApplianceTagSelectedIncluded = !applianceTagSelected.length || (
      applianceTagSelected.length === 1
      && applianceTagSelected[0].toLowerCase() === item.appliance.toLowerCase()
    );

    const isUstensilTagSelectedIncluded = !ustensilTagSelectedLowerCase.length || (
      ustensilTagSelectedLowerCase.filter(ustensil => item.ustensils.some(itemUstensil => itemUstensil.toLowerCase() === ustensil)).length === ustensilTagSelectedLowerCase.length
    );

    return isSearchInputValueIncluded && isIngredientTagSelectedIncluded && isApplianceTagSelectedIncluded && isUstensilTagSelectedIncluded;
  });
  
  recipeFiltered = result;
  displayRecipe(result);
  displayIngredients(); 
  displayAppliances();
  displayUstensils();
}

const getIngredients = (searchInputIngredient) => {
  let uniqueIngredientList = [];
  
  for (const element of recipes) {
    for (const ingredient of element.ingredients) {
      uniqueIngredientList.push(ingredient.ingredient);
    }
  }
  // Élimine les doublons et trie les ingrédients par ordre alphabétique
  uniqueIngredientList = Array.from(new Set(uniqueIngredientList)).sort((a, b) => a.localeCompare(b, 'fr')); 

  let filteredIngredients = [];

  for (const singleIngredient of uniqueIngredientList) {
    if (searchInputIngredient && singleIngredient.toLowerCase().includes(searchInputIngredient)) {
      filteredIngredients.push(singleIngredient);
    } else if (!searchInputIngredient) {
      filteredIngredients.push(singleIngredient);
    }
  }

  uniqueIngredientList = filteredIngredients;

  let menuIngredient = [];
  for (const element of recipeFiltered) {
    for (const ingredient of element.ingredients) {
      menuIngredient.push(ingredient.ingredient.toLowerCase());
    }
  }
  
  filteredIngredients = [];
  for (const e of uniqueIngredientList) {
    if (menuIngredient.length == 0 || (menuIngredient.includes(e.toLowerCase()) && !ingredientTagSelected.includes(e))) {
      filteredIngredients.push(e);
    }
  }

  return filteredIngredients;
}

const getAppliances = (searchInputAppliance) => {
  let uniqueApplianceList = [];
  
  for (const element of recipes) {
    uniqueApplianceList.push(element.appliance);
  }
  
  // Élimine les doublons et trie les appareils par ordre alphabétique
  uniqueApplianceList = Array.from(new Set(uniqueApplianceList)).sort(); 

  let filteredAppliances = [];

  for (const singleAppliance of uniqueApplianceList) {
    if (searchInputAppliance && singleAppliance.toLowerCase().includes(searchInputAppliance)) {
      filteredAppliances.push(singleAppliance);
    } else if (!searchInputAppliance) {
      filteredAppliances.push(singleAppliance);
    }
  }

  uniqueApplianceList = filteredAppliances;

  let menuAppliance = [];
  for (const element of recipeFiltered) {
    menuAppliance.push(element.appliance.toLowerCase());
  }
  
  filteredAppliances = [];
  for (const e of uniqueApplianceList) {
    if (menuAppliance.length == 0 || (menuAppliance.includes(e.toLowerCase()) && !applianceTagSelected.includes(e))) {
      filteredAppliances.push(e);
    }
  }

  return filteredAppliances;
}

const getUstensils = (searchInputUstensil) => {
  let uniqueUstensilList = [];
  
  for (const element of recipes) {
    for (const ustensil of element.ustensils) {
      uniqueUstensilList.push(ustensil);
    }
  }
  uniqueUstensilList = Array.from(new Set(uniqueUstensilList)).sort((a, b) => a.localeCompare(b, 'fr'));

  let filteredUstensils = [];

  for (const singleUstensil of uniqueUstensilList) {
    if (searchInputUstensil && singleUstensil.toLowerCase().includes(searchInputUstensil)) {
      filteredUstensils.push(singleUstensil);
    } else if (!searchInputUstensil) {
      filteredUstensils.push(singleUstensil);
    }
  }

  uniqueUstensilList = filteredUstensils;

  let menuUstensils = [];
  for (const element of recipeFiltered) {
    for (const ustensil of element.ustensils) {
      menuUstensils.push(ustensil.toLowerCase());
    }
  }
  
  filteredUstensils = [];
  for (const e of uniqueUstensilList) {
    if (menuUstensils.length == 0 || (menuUstensils.includes(e.toLowerCase()) && !ustensilTagSelected.includes(e))) {
      filteredUstensils.push(e);
    }
  }

  return filteredUstensils;
}

const displayIngredients = (searchInputIngredient) => {
  const ingredientBlue = document.getElementById("blues");  
  const tagIngredients = getIngredients(searchInputIngredient)
  
  ingredientBlue.innerHTML = "";
    
  for (let i = 0; i < tagIngredients.length; i++) {
    ingredientBlue.innerHTML += `<li class="tags_blue tags" onclick="onClickIngredient(this)">${tagIngredients[i]}</li>`;   
  }
}

const displayAppliances = (searchInputAppliance) => {
  const appliancesGreen = document.getElementById("greens");
  const tagAppliances = getAppliances(searchInputAppliance)
  
  appliancesGreen.innerHTML = "";
    
  for (let i = 0; i < tagAppliances.length; i++) {
    appliancesGreen.innerHTML += `<li class="tags_green tags" onclick="onClickAppliance(this)">${tagAppliances[i]}</li>`
  }
}
const displayUstensils = (searchInputUstensil) => {
  const ustensilRed = document.getElementById("reds");
  const tagUstensils = getUstensils(searchInputUstensil)
  
  ustensilRed.innerHTML = "";
  
  for (let i = 0; i < tagUstensils.length; i++) {
    ustensilRed.innerHTML += `<li class="tags_red tags" onclick="onClickUstensil(this)">${tagUstensils[i]}</li>`
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

  document.addEventListener('click', function(event) {
    // Vérifie si l'utilisateur a cliqué sur l'input ou sur l'un des tags
    const isClickInside = searchBlueInput.contains(event.target)
      || searchGreenInput.contains(event.target)
      || searchRedInput.contains(event.target)
      || document.getElementById('blues').contains(event.target)
      || document.getElementById('greens').contains(event.target)
      || document.getElementById('reds').contains(event.target);
  
    // Si l'utilisateur a cliqué en dehors de l'input et des tags, cela efface la valeur de l'input et met à jour les listes
    if (!isClickInside) {
      searchBlueInput.value = '';
      searchGreenInput.value = '';
      searchRedInput.value = '';
  
      displayIngredients();
      displayAppliances();
      displayUstensils();
    }
  });
};

const onClickIngredient = (context) => {
  if (ingredientTagSelected.indexOf(context.innerHTML) === -1){
    ingredientTagSelected.push(context.innerHTML)
    document.getElementById("tags_selected").innerHTML += `<p class="tag_selected_ingredient">${context.innerHTML} <span onclick="deleteTags(this,'${context.innerHTML}','I')"><i class="fa-regular fa-circle-xmark"></i></span> </p>`
    filterRecipe();
  }
  console.log(ingredientTagSelected);
}

const onClickAppliance = (context) => {
  if (applianceTagSelected.indexOf(context.innerHTML) === -1){
    applianceTagSelected.push(context.innerHTML)
    document.getElementById("tags_selected").innerHTML += `<p class="tag_selected_appliance"> ${context.innerHTML} <span onclick="deleteTags(this,'${context.innerHTML}','A')"><i class="fa-regular fa-circle-xmark"></i></span></p>`
    filterRecipe()  
  } 
  console.log(applianceTagSelected);
}

const onClickUstensil = (context) => {
  if (ustensilTagSelected.indexOf(context.innerHTML) === -1){
    ustensilTagSelected.push(context.innerHTML)
    document.getElementById("tags_selected").innerHTML += `<p class="tag_selected_ustensil"> ${context.innerHTML} <span onclick="deleteTags(this,'${context.innerHTML}','U')"><i class="fa-regular fa-circle-xmark"></i></span> </p>`
    filterRecipe()
  }
  console.log(ustensilTagSelected);
}

const deleteTags = (context, tag, type) => {
  if (type === 'I') {
   const index = ingredientTagSelected.indexOf(tag)
   if (index !== -1 ) {    
     ingredientTagSelected.splice(index,1)     
     context.parentNode.remove() 
   }
  } else if (type === 'A') {
    const index = applianceTagSelected.indexOf(tag)
    if (index !== -1 ) {    
      applianceTagSelected.splice(index,1)
      context.parentNode.remove()   
    }
  } else if (type === 'U') {
    const index = ustensilTagSelected.indexOf(tag)
    if (index !== -1 ) {
      ustensilTagSelected.splice(index,1)
      context.parentNode.remove()
    }
  } 

 filterRecipe(recipes); // permet de filtrer les recettes avec les tags restant
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

const borderSearch = document.querySelector(".search");
  document.getElementById("searchTop").addEventListener("click", function(inputClick) 
  {
    borderSearch.style.boxShadow = ' 0 0 8px 2px grey';
    borderSearch.style.transition = '0.8s';
    borderSearch.style.transform = 'scale(1.01)';
    borderSearch.style.backgroundColor = 'white';
  });

  window.addEventListener('mouseup', function(event){

    if(event.target !=borderSearch) {
      borderSearch.style.boxShadow = 'none'
      borderSearch.style.transition = '0.8s';
      borderSearch.style.transform = 'scale(1)';
      borderSearch.style.backgroundColor = '#E7E7E7';
    } 
  })

//flèche pour remonter en haut de la page
let calcScrollValue = () => {
  let scrollProgress = document.getElementById("progress");
  let pos = document.documentElement.scrollTop;
  let calcHeight =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  let scrollValue = Math.round((pos * 100) / calcHeight);
  if (pos > 100) {
    scrollProgress.style.display = "grid";
  } else {
    scrollProgress.style.display = "none";
  }
  scrollProgress.addEventListener("click", () => {
    document.documentElement.scrollTop = 0;
  });
  scrollProgress.style.background = `conic-gradient(#D04F4F ${scrollValue}%, #d7d7d7 ${scrollValue}%)`;
};
window.onscroll = calcScrollValue;


const init = async () => {
  const data = await loadData();
  recipes = data.recipes;
  recipeFiltered = recipes;
  displayRecipe(recipes);
  filterResearch();
  displayIngredients();
  displayAppliances();
  displayUstensils();
  tagResearch();
}; 
init();
