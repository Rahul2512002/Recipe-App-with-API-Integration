document.getElementById('searchButton').addEventListener('click', () => {
    const ingredients = document.getElementById('ingredientInput').value;
    if (ingredients) {
        fetchRecipes(ingredients);
    }
});

async function fetchRecipes(ingredients) {
    const apiKey = '35c9c454630b94ce2b62690dcb87c4d1'; // Replace with your API key
    const apiUrl = `https://api.edamam.com/search?q=${ingredients}&app_id='6c521bc4'&app_key=${apiKey}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.hits.length > 0) {
            displayRecipes(data.hits);
        } else {
            document.getElementById('recipesContainer').innerHTML = '<p>No recipes found</p>';
        }
    } catch (error) {
        console.error('Error fetching recipes:', error);
    }
}

function displayRecipes(recipes) {
    const recipesContainer = document.getElementById('recipesContainer');
    recipesContainer.innerHTML = '';

    recipes.forEach(item => {
        const recipe = item.recipe;
        const recipeElement = document.createElement('div');
        recipeElement.classList.add('recipe');
        
        recipeElement.innerHTML = `
            <h2>${recipe.label}</h2>
            <img src="${recipe.image}" alt="${recipe.label}">
            <p><strong>Ingredients:</strong> ${recipe.ingredientLines.join(', ')}</p>
            <p><strong>Source:</strong> <a href="${recipe.url}" target="_blank">Recipe Link</a></p>
        `;

        recipesContainer.appendChild(recipeElement);
    });
}
