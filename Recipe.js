class Recipe
{
    constructor(data)
    {
        this.name = data.name;
        this.id = data.id;
        this.ingredients = data.ingredients;
        this.time = data.time;
        this.description = data.description;
    }
    
    //-- Contenu HTML des recettes 
    RecipeCardHTML()
    {
        return `<article class="articleRecipes">
                    <div class="recipe_photo"></div>
                    <div class="recipeTitle">
                        <h2 class="recipeName">${this.name}</h2>
                        <div class="recipeDuration">
                            <i class="far fa-clock"></i><span class="time">${this.time} min</span>
                        </div>
                    </div>
                    <div class="recipeInfo">
                        <div class="recipeInstructions">
                            <div class= "list_ingredients">
                                <ul class="recipe_ingredients">
                                ${this.getIngredients()}
                                </ul>  
                            </div>                        
                            <div class="recipe_description">${this.description}</div>                         
                        </div>
                    </div>
                </article>`
    }

    getIngredients() {
        let ingredientsHTML = "";
    
        for (let i = 0; i < this.ingredients.length; i++) {
            const { ingredient, quantity, unit } = this.ingredients[i];
            let quantityUnit = "";
    
            if (quantity) {
                if (unit) {
                    quantityUnit = `: ${quantity} ${unit}`;
                } else {
                    quantityUnit = `: ${quantity}`;
                }
            }
    
            ingredientsHTML += `<li><span class="ingredient_detail">${ingredient}</span><span>${quantityUnit}</span></li>`;
        }
    
        return ingredientsHTML;
    }
    
}