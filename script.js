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
  
  const init = async () => {
    const recipe = await loadData();
    displayRecipe(recipe);
  };
  
  init();
  