const express = require('express');
const router = express.Router();
const db = require('./db');

router.get('/recipes', (req, res) => {
    db.query(`
    SELECT
        recipes.id AS recipe_id,
        recipes.name AS recipe_name,
        recipes.category AS recipe_category
    FROM
        recipes
    LEFT JOIN
        ingredients ON recipes.id = ingredients.recipe_id;
`, (err, results) => {
    if (err) {
        console.error('Error executing query:', err);
        res.status(500).send('Error fetching data');
        return;
    }

    const recipesMap = new Map();

    results.forEach(row => {
        const recipeId = row.recipe_id;
        if (!recipesMap.has(recipeId)) {
            recipesMap.set(recipeId, {
                recipe_id: row.recipe_id,
                recipe_name: row.recipe_name,
                recipe_category: row.recipe_category,
                recipe_instruction: row.recipe_instruction,
                ingredients: []
            });
        }
        recipesMap.get(recipeId).ingredients.push({
            ingredient_name: row.ingredient_name,
            ingredient_quantity: row.ingredient_quantity
        });
    });

    const recipesWithIngredients = Array.from(recipesMap.values());

    res.json(recipesWithIngredients);
});
});

router.get('/recipes/:id', (req, res) => {
    const { id } = req.params;
    db.query(`
    SELECT
        recipes.id AS recipe_id,
        recipes.name AS recipe_name,
        recipes.category AS recipe_category,
        recipes.instructions AS recipe_instruction,
        ingredients.name AS ingredient_name,
        ingredients.quantity AS ingredient_quantity
    FROM
        recipes
    LEFT JOIN
        ingredients ON recipes.id = ingredients.recipe_id WHERE recipes.id = ${id};
`, parseInt(id), (err, results) => {
    if (err) {
        console.error('Error executing query:', err);
        res.status(500).send('Error fetching data');
        return;
    }

    const recipesMap = new Map();

    results.forEach(row => {
        const recipeId = row.recipe_id;
        if (!recipesMap.has(recipeId)) {
            recipesMap.set(recipeId, {
                recipe_id: row.recipe_id,
                recipe_name: row.recipe_name,
                recipe_category: row.recipe_category,
                recipe_instruction: row.recipe_instruction,
                ingredients: []
            });
        }
        recipesMap.get(recipeId).ingredients.push({
            ingredient_name: row.ingredient_name,
            ingredient_quantity: row.ingredient_quantity
        });
    });

    const recipesWithIngredients = Array.from(recipesMap.values());

    res.json(recipesWithIngredients);
});
});


module.exports = router;